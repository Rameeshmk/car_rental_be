import v1Router from "./v1/index.js"
import express from "express";

const app = express();

const apiRouter = express.Router()

apiRouter.use("/v1",v1Router)

export default apiRouter