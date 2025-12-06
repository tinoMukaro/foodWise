import app from "./app.js"

const PORT = process.env.PORT 

app.listen(PORT, (req,res)=>{
    console.log(`server runnong on http://localhost${PORT}`)
})