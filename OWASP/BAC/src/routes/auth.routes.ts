import express from "express"
const authRouter = express.Router();

//local
import * as authController from "../controllers/auth.controller";

//register GET
authRouter.get("/register",authController.registerGet);

//register POST
authRouter.post("/register",authController.registerPost);

export default authRouter;