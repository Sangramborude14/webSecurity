import type { Request, Response, NextFunction } from "express";
import path from "path";


export const registerPost = async (req: Request,res:Response,next: NextFunction) => {
    const data = req.body;
    console.log(`email is ${data.email}`);
    return res.status(200).json({
        message: "form recieved"
    })
}
export const registerGet  = (req:Request,res:Response,next:NextFunction) => {
    const filePath = path.join(process.cwd(), "src","public","register.html");
    return res.status(200).sendFile(filePath);
}