const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header (Bearer <token>)
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and extract the user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object (req.user)
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;