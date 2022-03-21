import { Router } from "express";
import * as controller from "../controllers/review";
import "express-async-errors";

const reviewRouter = Router();
reviewRouter.get("/review/:id", controller.listOne);
reviewRouter.post("/review", controller.create);
reviewRouter.get("/review", controller.listAllForUser);

export default reviewRouter;
