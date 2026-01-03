import jwt from 'jsonwebtoken';
import 'dotenv/config.js';



export const UserAuth = (req, res, next) => {
  

  const token = req.cookies.token;
  

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "user account required" });
    }

    req.user = decoded;
    
    
    
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
