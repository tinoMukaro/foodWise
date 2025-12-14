import { Router } from "express";

const orderRoutes = Router()


//customer
orderRoutes.get("/",()=>{"you reached endpoint"}) // get orders
orderRoutes.post("/",()=>{"you reached endpoint"}) // create order
orderRoutes.put("/:id",()=>{"you reached endpoint"}) //cancel order

//business
orderRoutes.put("/:id/collected",()=>{"you reached endpoint"}) //mark order as collected

export default orderRoutes;