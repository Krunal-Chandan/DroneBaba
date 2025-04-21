import express from "express";
import {
  createCrop,
  getAllCrops,
  getCrop,
} from "../controllers/crop.controller";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/createCrop", verifyUser, createCrop);
router.get("/getCrop/:cropId", verifyUser, getCrop); //cropId required
router.get("/getAllCrops", verifyUser, getAllCrops);

export default router;
