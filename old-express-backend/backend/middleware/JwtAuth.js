// ! So as the middleware states, this is useful for protecting routes that require authentication.

const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header 
    !token ? res.status(401).json({ message: "No token provided" }) : null; // If no token is provided, return a 401 Unauthorized response
    // ?. checks if the left side is null or undefined before accessing to the right side.
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Call the next middleware or route handler
    }catch (err) {
        console.error(err);
        res.status(401).json({error: "Invalid token"});
    }
}
