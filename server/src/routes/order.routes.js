import { Router } from 'express'
import { UserAuth } from '../middleware/user.middleware.js';
import { create_order } from '../controllers/orders.controller.js';

const orderRoutes = Router();

orderRoutes.post("/", UserAuth, create_order)


export default orderRoutes;

