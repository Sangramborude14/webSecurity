import bcrypt from 'bcrypt';
import {prisma} from "../lib/db"


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