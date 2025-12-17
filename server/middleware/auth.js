import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    // Remove "Bearer " prefix if present
    const cleanToken = token.replace("Bearer ", "");
    
    // Verify token
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    // Add user to request object
    req.user = { _id: decoded.id }; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;