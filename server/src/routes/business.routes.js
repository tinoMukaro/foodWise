import { Router } from "express";
import { fetchBusinessById, registerBusiness} from '../controllers/business.controller.js'
import { businessOnly } from "../middleware/auth.js";

const businessRoutes = Router()

businessRoutes.get("/",businessOnly,fetchBusinessById ) //get Business
businessRoutes.post("/" ,businessOnly,registerBusiness )//create business
businessRoutes.put("/",()=>{"you reached endpoint"})//update business

businessRoutes.get("/deals",()=>{"you reached endpoint"})//get deals
businessRoutes.put("/deals",()=>{"you reached endpoint"})//create deals

businessRoutes.get("/orders",()=>{"you reached endpoint"})//get incoming orders

export default businessRoutes;