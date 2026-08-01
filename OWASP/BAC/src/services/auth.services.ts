import bcrypt from 'bcrypt';
import {prisma} from "../lib/db"
import jwt from 'jsonwebtoken';


export const registerUserService = async (email: string,password :string) => {

    // 1. check if user exists
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){
        throw new Error("User already exists");
    }

    //2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //3. Save to Database using Prisma
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return {id: user.id, email: user.email};
}

export const verifyLogin = async (email: string, password: string) => {
    //1. check if user exists
    const user  = await prisma.user.findUnique({where: {email}});
    if(!user){
        throw new Error("user does not exist. create a new one.");
    }
    //2. Verify user
    const isPasswordVaild = await bcrypt.compare(password,user.password);
    if(!isPasswordVaild){
        throw new Error("Invalid Credentials");
    }
    //3. generate JWT
    const secret = process.env.JWT_SECRET || 'fallbacksecret';
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        secret,
        {expiresIn: "1h"}
    );
    return {
        user: {
            id: user.id,
            email:user.email
        },
        token
    }
}