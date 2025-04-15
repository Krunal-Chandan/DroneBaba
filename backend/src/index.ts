import express from "express";
import userRouter from "./routes/user.routes";
import { connectDB } from "./utils/connectDB";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

try {
  connectDB();
} catch (error) {
  console.log("failed to connect to DB");
}

app.use("/api/v1/user", userRouter);

app.listen(3000);
