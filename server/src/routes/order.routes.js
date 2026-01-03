import { Router } from 'express'
import { UserAuth } from '../middleware/user.middleware.js';
import { authenticateBusiness } from '../middleware/business.middleware.js'
import { create_order, getOrder_Business } from '../controllers/orders.controller.js';

const orderRoutes = Router();

orderRoutes.post("/", UserAuth, create_order)
orderRoutes.get("/", authenticateBusiness, getOrder_Business)


export default orderRoutes;

