import express from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  addDrone,
  deleteSchedule,
  getAllDroneOfDroneOwner,
  getAllDrones,
  getDroneDetails,
  getScheduleOfDrone,
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
router.get("/getAllDroneOfDroneOwner", verifyUser, getAllDroneOfDroneOwner);
router.get("/getAllDrones", verifyUser, getAllDrones);
router.get("/getScheduleOfDrone", verifyUser, getScheduleOfDrone);

export default router;
