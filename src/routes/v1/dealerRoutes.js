import express from "express"
import dealerController from "../../controllers/dealerController.js"
import authenticateDeal from "../../middlewares/dealerMiddleware.js"

const dealerRouter=express.Router()

dealerRouter.post("/signup",dealerController.singup)
dealerRouter.post("/signin",dealerController.singin)
dealerRouter.delete("/:id",dealerController.removeDealer)
dealerRouter.get("/get-dealers",dealerController.getAllDealers)
dealerRouter.get("/check-dealers", authenticateDeal, dealerController.checkAdmin ) 



export default dealerRouter 