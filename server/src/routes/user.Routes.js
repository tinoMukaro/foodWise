import { Router } from "express";
import { signup, signOut } from '../controllers/userAuth.controller.js';

const userRoutes = Router();

userRoutes.post('/sign-up', signup );
userRoutes.post('/sign-in', (req, res)=>{
    res.status(501).json({ error: 'Not implemented' });
} );
userRoutes.post('/sign-out', signOut );

export default userRoutes;