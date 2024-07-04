import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthCheckRouter from "./routes/healthcheck.routes.js"

dotenv.config({ path: "./.env" });

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));

app.use("/api/v1/healthcheck", healthCheckRouter);