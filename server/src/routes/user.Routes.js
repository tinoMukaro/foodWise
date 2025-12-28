import { Router } from "express";
import { signup, signIn, signOut } from '../controllers/userAuth.controller.js';
import { UserAuth } from "../middleware/user.middleware.js";
import { getMe } from "../controllers/userAuth.controller.js"

const userRoutes = Router();

userRoutes.post('/sign-up', signup );
userRoutes.post('/sign-in', signIn );
userRoutes.post('/sign-out', signOut );
userRoutes.get("/me", UserAuth, getMe);


export default userRoutes;