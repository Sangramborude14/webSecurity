import express from "express"
const authRouter = express.Router();
import { jwtAuth } from "../middleware/authentication.middleware";

//local
import * as authController from "../controllers/auth.controller";

//register POST
authRouter.post("/register", authController.registerPost);

//login POST
authRouter.post("/login",authController.loginPost)


// personal Notes GET
authRouter.get("/user", jwtAuth, authController.personalNotes);

export default authRouter;
