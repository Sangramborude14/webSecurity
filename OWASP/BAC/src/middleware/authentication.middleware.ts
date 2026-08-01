import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email:string;
    };
}

export const jwtAuth = async (req:AuthRequest,res:Response,next: NextFunction) => {
    try {
        //1. Extract token from cookies
        let token = req.cookies?.token;

        if(!token && req.headers.authorization?.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            })
        }

        //2. Verify token
        const secret = process.env.JWT_SECRET || "fallbacksecret";
        const decoded = jwt.verify(token,secret) as {userId: string; email: string;};

        //3. attach user payload
        req.user = decoded;

        //4. Process to next handler
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })
    }
}