
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      console.error('Error signing JWT token:', error);
      throw new Error('Error signing JWT token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      throw new Error('Error verifying JWT token');
    }
  },
};
