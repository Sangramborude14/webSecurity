import type { Request, Response, NextFunction } from "express";
import { createNote as createNoteService } from "../services/notes.services";
import type { AuthRequest } from "../middleware/authentication.middleware";
import { prisma } from "../lib/db";

export const createNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User payload missing",
      });
    }

    const note = await createNoteService(title, content, user);

    return res.status(200).json({
      success: true,
      message: "Note Created successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const viewNoteGet = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const allNotes = await prisma.note.findMany();
    return res.status(200).json({
      success: true,
      message: "successfully fetched all notes",
      data: allNotes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "unsuccessful query",
    });
  }
};

export const getNoteById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const note = await prisma.note.findUnique({
      where: { id },
    });


    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch note by id",
    });
  }
};
