import { Router } from "express";
import * as controller from "../controllers/ad";
import "express-async-errors";


const adRouter = Router();
adRouter.post("/ad", controller.create);
adRouter.get("/ad", controller.listAll);

export default adRouter;
