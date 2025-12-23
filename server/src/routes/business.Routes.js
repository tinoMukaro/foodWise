import { Router } from 'express';
import { signup, signIn, signOut } from '../controllers/businessAuth.controller.js';

const businessRouter = Router();

businessRouter.post('/sign-up', signup);
businessRouter.post('/sign-in', signIn);
businessRouter.post('/sign-out', signOut);

export default businessRouter;