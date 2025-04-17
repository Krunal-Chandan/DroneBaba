import express from "express";
import {
  fillLocationDetails,
  getUserLocationDetails,
} from "../controllers/locationDet.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/fillDetails", verifyUser, fillLocationDetails);
router.get("/getDetails", verifyUser, getUserLocationDetails);

export default router;
