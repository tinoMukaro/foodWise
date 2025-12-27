import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { business } from '../models/business.model.js';
import { eq } from 'drizzle-orm';
import 'dotenv/config.js';

export const authenticateBusiness = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'business') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Business account required.',
      });
    }


    const [businessData] = await db
      .select({
        id: business.id,
        email: business.email,
        name: business.name,  
        type: business.type,
        location: business.location,
      })
      .from(business)
      .where(eq(business.id, decoded.id));

    if (!businessData) {
      return res.status(404).json({
        success: false,
        message: 'Business account not found.',
      });
    }

    
    req.business = {
      business_id: businessData.id,
      id: businessData.id,
      email: businessData.email,
      name: businessData.name,  
      type: businessData.type,
      location: businessData.location,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Authentication failed.',
    });
  }
};

export const businessAuth = (req, res, next) => {
  

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    if (decoded.role !== "business") {
      return res.status(403).json({ message: "Not business" });
    }

    req.business = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
