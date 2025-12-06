import express from "expres"

const app = express()

app.get("/", (req, res)=>{
    res.send("hello thank you for saving food!!")
})

export default app;