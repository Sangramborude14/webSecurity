import express from "express"
const authRouter = express.Router();

//local
import * as authController from "../controllers/auth.controller";

//register POST
authRouter.post("/register",authController.registerPost);

export default authRouter;