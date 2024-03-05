import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/routes";
import cors from "cors";

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

export default app;
