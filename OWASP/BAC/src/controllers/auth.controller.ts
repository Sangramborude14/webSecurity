import type { Request, Response, NextFunction } from "express";
import { registerUserService } from "../services/auth.services";


export const registerPost = async (req: Request,res:Response,next: NextFunction) => {
  try {
    const {email,password} = req.body;

   const user  = await registerUserService(email,password);

   return res.status(201).json({
    success: true,
    message: " User registerd successfully",
    data: user,
   })
}catch(err:any){
   return res.status(400).json({
      success: false,
      message: err.message || "registration failed"
   })
}
  }

export const loginPost = async(req: Request,res:Response,next: NextFunction) => {

}

