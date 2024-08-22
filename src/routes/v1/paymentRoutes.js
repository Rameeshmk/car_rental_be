import express from "express"
import paymentControllers from "../../controllers/paymentControllers.js"

const paymentRoutes = express.Router()

paymentRoutes.post("/order",paymentControllers.order)
paymentRoutes.post("/verify",paymentControllers.verify)

export default paymentRoutes