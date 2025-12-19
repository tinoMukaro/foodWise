import express from "express"
import 'dotenv/config' 
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import orderRoutes from "./routes/orders.routes.js"
import businessRoutes from "./routes/business.routes.js"
import dealsRouter from "./routes/deals.routes.js"

const app = express()
app.use(express.json())

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/order", orderRoutes)
app.use("/business", businessRoutes)
app.use("/deals", dealsRouter)

app.get("/", (req, res)=>{
    res.send("hello thank you for saving food!!")
})


export default app;