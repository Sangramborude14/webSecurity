import type { Request, Response, NextFunction } from "express";


export const registerPost = async (req: Request,res:Response,next: NextFunction) => {
   const {email,password} = req.body;


   return res.status(201).json({
    success: true,
    message: " User registerd successfully",
    data: {email}
   })
}
