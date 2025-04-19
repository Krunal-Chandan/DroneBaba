import { Request, Response } from "express";
import { DroneInfoModel, droneOwnerModel, userModel } from "../models/models";

export const addDrone = async (req: Request, res: Response) => {
  const {
    name,
    type,
    capacity,
    pricePerAcre,
    durability,
    purchasedDate,
    isNGO,
    ngoName,
  } = req.body; //puchasedDate to be passed in format of 'YYYY-MM-DD'
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
    const drone = await DroneInfoModel.create({
      userId,
      name,
      type,
      capacity,
      durability,
      purchasedDate,
      pricePerAcre,
      isNGO,
      ngoName,
      schedule: [],
    });
    const droneId = drone._id;
    const droneOwnerData = await droneOwnerModel.findOne({ userId });
    droneOwnerData?.drones.push(droneId);
    await droneOwnerData?.save();
    res.status(201).json({
      droneId: droneId,
      message: "Drone information added successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
    return;
  }
};

export const getDroneDetails = async (req: Request, res: Response) => {
  const droneId = req.params.droneId;
  //@ts-ignore
  const userId = req.user;

  try {
    const userRole = await userModel.findById(userId).select("role");
    if (userRole?.role !== "Drone Owner") {
      res.status(403).json({
        message: "Only drone owners are allowed to fetch the details",
      });
      return;
    }
    const droneDets = await DroneInfoModel.findById(droneId);
    res.status(201).json({
      droneDetail: droneDets,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
    return;
  }
};

export const getSchedulesOfDroneOwner = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;

  try {
    const droneDets = await DroneInfoModel.find({ userId });
    let Schedules = droneDets.map((drone) => ({
      DroneName: drone.name,
      DroneSchedule: drone.schedule,
    }));

    res.status(201).json({
      Schedules,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  const { date, timeSlot } = req.body;
  const droneId = req.params.droneId;
  //@ts-ignore
  const userId = req.user;

  const user = await userModel.findById(userId).select("role");
  const userRole = user?.role;

  if (userRole === "Farmer") {
    res.status(401).json({
      message: "Only drone owners or pilots are allowed to delete schedule.",
    });
    return;
  }

  try {
    const droneInfo = await DroneInfoModel.findById(droneId).select("schedule");
    const schedule = droneInfo?.schedule;

    const newSchedule = schedule?.filter((s) => {
      return s.date !== date && s.timeSlot !== timeSlot;
    });

    if (schedule) {
      if (schedule.length === newSchedule?.length) {
        res.status(401).json({
          message: "Invalid date and time slot",
        });
        return;
      }
    }

    if (newSchedule && droneInfo) {
      droneInfo.schedule = newSchedule;
    }
    await droneInfo?.save();
    res.status(201).json({
      message: "Schedule successfully deleted",
      droneInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" + error,
    });
    return;
  }
};
