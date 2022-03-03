import { Router } from "express";
import * as controller from "../controllers/ad";
import "express-async-errors";

const adRouter = Router();
adRouter.post("/ad", controller.create);
adRouter.get("/ad", controller.listAll);
adRouter.put("/ad/:id", controller.update);
adRouter.delete("/ad/:id", controller.deleteOne);

export default adRouter;
