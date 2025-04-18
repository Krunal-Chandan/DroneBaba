import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", verifyUser, getUser); //headers required
router.post("/logout", verifyUser, logoutUser); //headers required

export default router;
