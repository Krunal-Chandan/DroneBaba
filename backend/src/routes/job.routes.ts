import express, { Router } from "express";
import { createJob, getJobs, getUpdates } from "../controllers/job.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/createJob/:droneId", verifyUser, createJob);
router.get("/getJobs", getJobs);
router.get("/getJobs/updates", getUpdates);

export default router;
