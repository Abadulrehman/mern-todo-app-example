import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

dotenv.config();

const app = express();
const port = process.env.PORT || 3010;
const dbUrl = process.env.DB_URL || "";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || `http://localhost:3000`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", todoRoutes);
