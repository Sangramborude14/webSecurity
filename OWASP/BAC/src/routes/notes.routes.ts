import express from 'express';
export const notesRouter = express.Router();

//local
import * as notesController from '../controllers/notes.controller';
import { jwtAuth } from '../middleware/authentication.middleware';
// notes POST
notesRouter.post("/create",jwtAuth,notesController.createNote);
