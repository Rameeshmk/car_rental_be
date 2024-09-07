import express from "express"
import orderController from "../../controllers/orderController.js"



const orderRoutes = express.Router()

orderRoutes.post("/orders",orderController.saveOrderSummary)
orderRoutes.get('/orders/:userId',orderController.getUserOrders);
orderRoutes.get('/allorders',orderController.getAllorders);
orderRoutes.get("/check-availability/:car_id",orderController.checkAvailability)
orderRoutes.get('/orderss/:carId',orderController.getDealersOrders);


export default orderRoutes