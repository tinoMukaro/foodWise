import { Router } from "express";

const adminRoutes = Router()


//customer
adminRoutes.get("/users",(req,res)=>{
    res.send({message:"its working fine"})
})
adminRoutes.get("/business",()=>{"you reached endpoint"}) // get all businesses
adminRoutes.get("/deals",()=>{"you reached endpoint"}) //get all deals
adminRoutes.put("/users/:id/block",()=>{"you reached endpoint"}) //block user

//business
adminRoutes.put("/:id/collected",()=>{"you reached endpoint"}) //mark order as collected

export default adminRoutes;