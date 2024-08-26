import express from "express";
import { upload } from "../../middlewares/uploadMiddleware.js"
import carController from "../../controllers/carController.js"
//import authenticateDeal from "../../middlewares/dealerMiddleware.js"
//import authenticateAdmin from "../../middlewares/adminMiddleware.js";

const carRouter=express.Router()

carRouter.post("/add-cars", upload.single("image"),carController.createCarDetails)

carRouter.get("/car-data",carController.getCarsData)
carRouter.get("/cars/:id",carController.findCarById)

carRouter.put("/:id",carController.updateCarData)

carRouter.delete("/:id",carController.deleteCarData)


export default carRouter