import { prisma } from "../lib/db"

export const createNote = async (title: string, content: string, user: any) => {
    const note = await prisma.note.create({
        data: {
            title,
            content,
            userId: user.userId,
        },
    });
    return note;
};




