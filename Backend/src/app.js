import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import { router as transactionRoutes } from './routes/transactions.routes.js';
import { router as userRoutes } from './routes/user.routes.js';
import { router as avatarRoutes } from './routes/avatar.routes.js';

app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);
app.use('/api/avatar', avatarRoutes);

export { app };
