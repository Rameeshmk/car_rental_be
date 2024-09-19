import express from "express" 
import userController from "../../controllers/userController.js" 
import authenticateUser from "../../middlewares/userMiddleware.js"

const userRouter=express.Router()

userRouter.get("/",userController.ping)  

userRouter.post("/signup",userController.signup) 

userRouter.post("/signin",userController.signin) 

userRouter.get("/get-user/:userId",userController.getUser)  

userRouter.get("/check-user",authenticateUser, userController.checkUser)






export default userRouter