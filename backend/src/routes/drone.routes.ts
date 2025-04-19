import express from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  addDrone,
  deleteSchedule,
  getDroneDetails,
  getSchedulesOfDroneOwner,
} from "../controllers/drone.controller";

const router = express.Router();

router.post("/addDrone", verifyUser, addDrone);
router.get("/getDroneDetails/:droneId", verifyUser, getDroneDetails);
router.get(
  "/getAllSchedulesOfDroneOwner",
  verifyUser,
  getSchedulesOfDroneOwner
);
router.delete("/deleteSchedule/:droneId", verifyUser, deleteSchedule);

export default router;
