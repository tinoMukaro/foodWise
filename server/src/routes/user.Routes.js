import { Router } from "express";
import { signup, signIn, signOut } from '../controllers/userAuth.controller.js';

const userRoutes = Router();

userRoutes.post('/sign-up', signup );
userRoutes.post('/sign-in', signIn );
userRoutes.post('/sign-out', signOut );

export default userRoutes;