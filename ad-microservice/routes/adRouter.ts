import { Router } from "express";
import * as controller from "@controller/ad";
import "express-async-errors";

const adRouter = Router();
adRouter.post("/ad", controller.create);
adRouter.get("/ad", controller.listAll);
adRouter.put("/ad/:id", controller.update);
adRouter.delete("/ad/:id", controller.deleteOne);
adRouter.get("/ad/one", controller.listOne);

export default adRouter;
