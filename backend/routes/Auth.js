const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router() // Creates an instance of a class that handles logic and features for connections.

router.post('/register', async (req, res) => {
    try {
        // Log the entire request body
        console.log("Full registration request:", req.body);
        const { firstName, surname, email, password, address, phone } = req.body;

        // Log what we're receiving
        console.log("Registration data:", { firstName, surname, email, address, phone });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user with address
        const newUser = new User({
            firstName,
            surname,
            email,
            password: hashedPassword,
            phone,
            address,
        });
        
        await newUser.save();
        console.log("User saved:", newUser);
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Set cookie and send response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000 // 1 hour
        }).json({
            message: "Login successful",
            user: {
                email: user.email,
                firstName: user.firstName
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}); 

router.post('/logout', (req, res) => {
    res.clearCookie("token"); // Clear the cookie
    res.json({ message: "Logout successful" });
});

//Get User Profile
router.get("/profile", async (req, res) => {
    const userToken = req.cookies.token; // Get the token from cookies.
    if (!userToken) {
        return res.status(401).json({message: "Unathorized"})
    }
    try {
        const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password"); // This method is provided by Mongo and tells to exclude by a - sign he property requested.
        return res.json(user);
    }catch (error) {
        console.error("Profile retrieval error:", error);
        return res.status(500).json({ message: "Internal server error" });
    };
});

// Updating the user's password
router.put("/password", async (req , res) => { 
    const {username, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //Hash is a function inside brypt that stores the data in ecnyptation.
    const user = await User.findOneAndUpdate(
        {username},
        {password: hashedPassword},
        {new : true }
    );
    if(!user) return res.status(404).json({message: "User not found"});
    res.json({message: "Password updated"});
});

//Delete /api/auth/:email
router.delete("/:email", async (req, res) => {
    const user = await User.findOneAndDelete({email: req.params.email});
    if(!user) return res.status(404).json({ message: "User not found"});
    res.json({message: "User deleted "})
})

// Update address
router.put("/profile/address", async (req, res) => {
   const token = req.cookies.token;
   console.log("Address update request received");
   console.log("Request body:", req.body);
   console.log("Token exists:", !!token);
   
   if (!token) {
       return res.status(401).json({ message: "No autenticado" });
   }
   
   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log("Decoded token user ID:", decoded.id);
       
       const { address } = req.body;
       console.log("Extracted address:", address);
       
       if (!address) {
           return res.status(400).json({ message: "La dirección es requerida" });
       }
       
       // Find user first to check if it exists
       const userExists = await User.findById(decoded.id);

       if (!userExists) {
           return res.status(404).json({ message: "Usuario no encontrado" });
       }
       
       // Update address in MongoDB
       const updatedUser = await User.findByIdAndUpdate(
           decoded.id,
           { address },
           { new: true }  // Return updated document
       ).select("-password");
       
       console.log("Updated user:", updatedUser);
       
       return res.json(updatedUser);
   } catch (error) {
       console.error("Error updating address:", error);
       return res.status(500).json({ message: "Error interno del servidor", error: error.message });
   }
});

router.put("/profile/password", async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const { currentPassword, newPassword } = req.body;
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Current password is incorrect"});
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({message: "Password updated successfully"});
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.put("/profile/email", async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const { email } = req.body;
        user.email = email;
        await user.save();
        res.json({message: "Email updated successfully",
            user: {
                email: user.email,
                firstName: user.firstName,
                address: user.address,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.put("/profile/phone", async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const { phone } = req.body;
        user.phone = phone;
        await user.save();
        res.json({message: "Phone updated successfully",
            user: {
                email: user.email,
                firstName: user.firstName,
                address: user.address,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error("Error updating phone:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.delete("/profile", async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByIdAndDelete(decodedToken.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.clearCookie("token");
        res.json({message: "User deleted successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;