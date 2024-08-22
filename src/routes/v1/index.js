import express from "express"
import userRouter from "./userRoutes.js";
import dealerRouter from "./dealerRoutes.js";
import carRouter from "./carRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import orderRoutes from "./orderRoutes.js";
import userReviewRoutes from "./userReviewRoutes.js"
import signOutRouter from "./signOutRoutes.js";

const v1Router = express.Router()

v1Router.get("/",(req,res)=>{
    res.send("hello worldsss")
});

v1Router.use("/user",userRouter)
v1Router.use("/dealer",dealerRouter)
v1Router.use("/car", carRouter)
v1Router.use("/payment",paymentRoutes)
v1Router.use("/order",orderRoutes)
v1Router.use("/user",userReviewRoutes)
v1Router.use("/",signOutRouter)

export default v1Router