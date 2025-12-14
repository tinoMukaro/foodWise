import { Router } from "express";

const businessRoutes = Router()

businessRoutes.get("/",()=>{"you reached endpoint"}) //get Business
businessRoutes.post("/",()=>{"you reached endpoint"})//create business
businessRoutes.put("/",()=>{"you reached endpoint"})//update business

businessRoutes.get("/deals",()=>{"you reached endpoint"})//get deals
businessRoutes.put("/deals",()=>{"you reached endpoint"})//create deals

businessRoutes.get("/orders",()=>{"you reached endpoint"})//get incoming orders

export default businessRoutes;