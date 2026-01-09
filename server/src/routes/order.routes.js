import { Router } from 'express';
import { UserAuth } from '../middleware/user.middleware.js';
import { authenticateBusiness } from '../middleware/business.middleware.js';
import {
  create_order,
  getOrder_Business,
  getOrder_User,
} from '../controllers/orders.controller.js';
import {
  confirmOrderController,
  markReadyController,
  cancelOrderController,
  collectOrderController,
} from '../controllers/orders.controller.js';

const orderRoutes = Router();

orderRoutes.post('/', UserAuth, create_order);
orderRoutes.get('/', authenticateBusiness, getOrder_Business);
orderRoutes.get('/user', UserAuth, getOrder_User);

//order cycles
orderRoutes.post(
  '/:orderId/confirm',
  authenticateBusiness,
  confirmOrderController
);
orderRoutes.post('/:orderId/ready', authenticateBusiness, markReadyController);
orderRoutes.post(
  '/:orderId/collect',
  authenticateBusiness,
  collectOrderController
);
orderRoutes.post('/:orderId/cancel', UserAuth, cancelOrderController);

export default orderRoutes;
