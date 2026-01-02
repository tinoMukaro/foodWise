import { Router } from 'express'
import { UserAuth } from '../middleware/user.middleware';
import { create_order } from '../controllers/orders.controller';

const orderRoutes = Router();

orderRoutes.post("/", UserAuth, create_order)

