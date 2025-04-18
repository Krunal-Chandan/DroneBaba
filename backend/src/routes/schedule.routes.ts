import express from "express";
import { createSchedule } from "../controllers/schedule.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/createSchedule/:droneId", verifyUser, createSchedule);

export default router;
