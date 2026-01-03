
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.Routes.js';
import businessRouter from './routes/business.Routes.js';
import dealsRoutes from './routes/deal.routes.js';
import orderRoutes from './routes/order.routes.js'


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());






app.get('/', (req, res) => {
  res.send("Server is up and running!");
});

app.use('/api/user', userRoutes);
app.use('/api/business', businessRouter);
app.use('/api/deals', dealsRoutes);
app.use('/api/order', orderRoutes);

export default app;