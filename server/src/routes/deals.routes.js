import { Router } from "express";

const dealsRouter = Router();

dealsRouter.get("/",()=>{"you reached endpoint"}) //get all deals
dealsRouter.get("/id",()=>{"you reached endpoint"}) //get deal by id


export default dealsRouter;