import express from "express"
import userRouter from "./userRoutes.js";
import dealerRouter from "./dealerRoutes.js";
import carRouter from "./carRoutes.js";

const v1Router = express.Router()

v1Router.get("/",(req,res)=>{
    res.send("hello worldsss")
});

v1Router.use("/user",userRouter)
v1Router.use("/dealer",dealerRouter)
v1Router.use("/car", carRouter)

export default v1Router