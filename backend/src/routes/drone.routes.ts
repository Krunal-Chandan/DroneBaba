import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { addDrone } from "../controllers/drone.controller";

const router = express.Router();

router.post("/addDrone", verifyUser, addDrone);

export default router;
