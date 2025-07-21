const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router() // Creates an instance of a class that handles logic and features for connections.

router.post('/register', async (req, res) => {
    try{
        console.log("Register request body:", req.body);
        const {firstName, surname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuario ya registrado" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // This line that indicates 10 means that these are the salt rounds, i.e. the process by which combinations create a hash.
        //at a higher number, the more secure but it takes longer to hash and therefore more computer power is needed.
        const user = new User({firstName, surname, email, password: hashedPassword})
        console.log("User object before save:", user); // Log user object before saving
        await user.save()
        console.log("User saved successfully"); // Log after successful save
        res.json({ message: "User registered"})
    } catch (error) {
        console.error("Registration error:", error); // Log full error object
        res.status(500).json({ message: error.message, error }); // Return full error object for debugging
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

// updating the user's password
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

module.exports = router;