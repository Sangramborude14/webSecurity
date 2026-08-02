import type { Response, NextFunction } from "express";
import { createNote as createNoteService } from "../services/notes.services";
import type { AuthRequest } from "../middleware/authentication.middleware";

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


