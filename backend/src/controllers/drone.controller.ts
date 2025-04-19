import { Request, Response } from "express";
import { DroneInfoModel, droneOwnerModel, userModel } from "../models/models";

export const addDrone = async (req: Request, res: Response) => {
  const { name, type, capacity, durability, purchasedDate, isNGO, ngoName } =
    req.body; //puchasedDate to be passed in format of 'YYYY-MM-DD'
  // @ts-ignore
  const userId = req.user;
  const user = await userModel.findById(userId).select("role");
  const userRole = user?.role;

  if (userRole !== "Drone Owner") {
    res.status(401).json({
      message: "Only drone owners are allowed to add drones",
    });
    return;
  }

  try {
    const droneAlreadyExists = await DroneInfoModel.findOne({ name });
    let droneId;
    if (droneAlreadyExists) {
      droneId = droneAlreadyExists._id;
    } else {
      const drone = await DroneInfoModel.create({
        name,
        type,
        capacity,
        durability,
        purchasedDate,
        isNGO,
        ngoName,
        schedule: [],
      });
      droneId = drone._id;
    }
    const droneOwnerData = await droneOwnerModel.findOne({ userId });

    let droneExistsInDroneOwner = false;
    droneOwnerData?.drones.forEach((drone) => {
      if (drone.toString() === droneId.toString()) {
        droneExistsInDroneOwner = true;
      }
    });
    if (droneExistsInDroneOwner) {
      res.status(403).json({
        message: "Drone already exists",
      });
      return;
    } else {
      droneOwnerData?.drones.push(droneId);
      await droneOwnerData?.save();
      res.status(201).json({
        droneId: droneId,
        message: "Drone information added successfully",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
  }
};

export const getDroneDetails = async (req: Request, res: Response) => {};
