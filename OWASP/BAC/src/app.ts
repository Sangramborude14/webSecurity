//external
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

//local
import authRouter from "./routes/auth.routes";

export const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
