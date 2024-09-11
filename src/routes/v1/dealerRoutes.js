import express from "express"
import upload from "../../middlewares/uploadMiddleware.js"
import dealerController from "../../controllers/dealerController.js"
import authenticateDeal from "../../middlewares/dealerMiddleware.js"
import Dealer from "../../models/dealerModel.js"
import carController from "../../controllers/carController.js";
import authenticateAdmin from "../../middlewares/adminMiddleware.js"
import notificationController from "../../controllers/notificationsController.js"


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
dealerRouter.get("/check-admin",authenticateAdmin,dealerController.checkAdmins)
dealerRouter.get("/get-dealerscars/:dealerId",dealerController.getDealersCars)
dealerRouter.get("/notifications",authenticateAdmin,notificationController.notification)
dealerRouter.post("/approve-dealer/:id",authenticateAdmin,notificationController.approve)





export default dealerRouter 