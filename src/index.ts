import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authentication/authentication.routes";

config();

const app = express();

app.use(express.json());

app.use("/", authRoutes);

export default app;
