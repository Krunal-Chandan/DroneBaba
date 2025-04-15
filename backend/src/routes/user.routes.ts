import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

//@ts-ignore
router.post("/register", registerUser);
//@ts-ignore
router.post("/login", loginUser);
//@ts-ignore
router.get("/getUser", verifyUser, getUser);
//@ts-ignore
router.post("/logout", verifyUser, logoutUser);

export default router;
