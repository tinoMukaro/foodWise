import { Router } from "express";
import { fetchBusinessById, registerBusiness} from '../controllers/business.controller.js'
import { businessOnly } from "../middleware/auth.js";
import { makeDeal } from "../controllers/deals.controller.js";

const businessRoutes = Router()

businessRoutes.get("/",businessOnly,fetchBusinessById ) //get Business
businessRoutes.post("/" ,businessOnly,registerBusiness )//create business
businessRoutes.put("/",businessOnly)//update business

businessRoutes.get("/deals",businessOnly)//get deals
businessRoutes.put("/deals",businessOnly, makeDeal)//create deals

businessRoutes.get("/orders",businessOnly)//get incoming orders

export default businessRoutes;