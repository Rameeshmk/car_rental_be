import express from "express"
import serverConfig from "./config/serverConfig.js"
import dbConnect from "./config/dbConfig.js"
import apiRouter from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(
    cors(
        {
    origin:["https://car-rental-web-fe-fnl.vercel.app/","http://localhost:5173"], 
    credentials : true,
}
)
); 
app.use(express.json())
app.use(cookieParser())

app.use("/api",apiRouter)
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(serverConfig.Port,()=>{
    console.log(`server is running at ${serverConfig.Port}` );
    dbConnect();
    console.log("Db connected");
})