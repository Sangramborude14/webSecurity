//external
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from "cookie-parser";

//local
import authRouter from "./routes/auth.routes";
import { notesRouter } from './routes/notes.routes';
//app
export const app = express();

//cookie
app.use(cookieParser());

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

//helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

//json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth route
app.use("/auth", authRouter);

// notes route
app.use("/notes", notesRouter);

