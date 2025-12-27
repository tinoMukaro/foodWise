import { Router } from 'express';
import { signup, signIn, signOut, getMe } from '../controllers/businessAuth.controller.js';
import { businessAuth } from '../middleware/business.middleware.js';        

const businessRouter = Router();

businessRouter.post('/sign-up', signup);
businessRouter.post('/sign-in', signIn);
businessRouter.post('/sign-out', signOut);
businessRouter.get("/me", businessAuth, getMe);



export default businessRouter