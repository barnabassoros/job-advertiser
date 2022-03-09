import { Router } from "express";
import * as controller from "../controllers/registration";
import "express-async-errors";

const registrationRouter = Router();
registrationRouter.post("/registration", controller.create);
registrationRouter.get("/registration", controller.listAll);

export default registrationRouter;
