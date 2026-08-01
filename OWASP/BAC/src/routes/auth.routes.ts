import express from "express"
const authRouter = express.Router();

//local
import * as authController from "../controllers/auth.controller";

//register POST
authRouter.post("/register", authController.registerPost);

//login POST
authRouter.post("/login",)

export default authRouter;