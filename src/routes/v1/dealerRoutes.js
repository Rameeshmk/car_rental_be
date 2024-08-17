import express from "express"
import upload from "../../middlewares/uploadMiddleware.js"
import dealerController from "../../controllers/dealerController.js"
import authenticateDeal from "../../middlewares/dealerMiddleware.js"
import Dealer from "../../models/dealerModel.js"
import carController from "../../controllers/carController.js";
import authenticateAdmin from "../../middlewares/adminMiddleware.js"


const dealerRouter=express.Router()

dealerRouter.post("/signup",dealerController.singup)
dealerRouter.post("/signin",dealerController.singin)
dealerRouter.delete("/delete-dealer/:id",dealerController.removeDealer)
dealerRouter.get("/get-dealers",dealerController.getAllDealers)
dealerRouter.get("/get-cars",carController.getCarData)
dealerRouter.post("/add-cars", upload.single("image"),carController.createCarDetails);
dealerRouter.put("/update-car/:id",carController.updateCarData)
dealerRouter.delete("/delete-cars/:id",carController.deleteCarData)
dealerRouter.get("/check-dealer", authenticateDeal, dealerController.checkAdmin ) 




export default dealerRouter 