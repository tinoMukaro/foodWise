import {Router} from "express"

const authRoutes = Router()

authRoutes.post('/sign-up',()=>{"you reached endpoint"});
authRoutes.post('/sign-in',()=>{"you reached endpoint"});
authRoutes.post('/sign-out',()=>{"you reached endpoint"});

export default authRoutes;