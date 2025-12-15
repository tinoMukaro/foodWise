import {Router} from "express"
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRoutes = Router()

authRoutes.post('/sign-up',signUp);
authRoutes.post('/sign-in',signIn);
authRoutes.post('/sign-out',signOut);

export default authRoutes;