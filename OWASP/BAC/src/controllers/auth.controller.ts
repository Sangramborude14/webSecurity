import type { Request, Response, NextFunction } from "express";
import { registerUserService, verifyLogin } from "../services/auth.services";
import { prisma } from "../lib/db";


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
try {
   const {email,password} = req.body;
   const result = await verifyLogin(email,password);
   

   return res
   .status(200)
   .cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
         })

   .json({
      success: true,
      message: "Login Successfully accepted by server",
      token: result.token,
      user: result.user,
   });
}catch(err: any){
   return res
         .status(400)
         .json({
         success: false,
         message: err.message || "Login failed at sever"
      })
}
}

import type { AuthRequest } from "../middleware/authentication.middleware";

export const personalNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User payload missing",
      });
    }

    const notes = await prisma.note.findMany({
      where: { userId: user.userId },
    });

    return res.status(200).json({
      success: true,
      message: "Notes retrieved from DB",
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `An error occurred: ${error}`,
    });
  }
};

