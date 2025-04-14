import express from "express";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/register", registerUser);

export default router;
