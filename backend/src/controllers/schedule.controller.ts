import { Request, Response } from "express";
import { DroneInfoModel, pilotModel } from "../models/models";

export const createSchedule = async (req: Request, res: Response) => {
  const { date, timeSlot } = req.body;
  const droneId = req.params.droneId;
  //@ts-ignore
  const userId = req.user;

  const drone = await DroneInfoModel.findById(droneId).select("schedule");
  if (!drone) {
    res.status(404).json({
      message: "Drone Not found please check again",
    });
    return;
  }
  const droneSchedule = drone?.schedule;

  if (droneSchedule) {
    for (let i = 0; i < droneSchedule?.length; i++) {
      if (
        droneSchedule[i].date === date &&
        droneSchedule[i].timeSlot === timeSlot
      ) {
        res.status(403).json({
          message: "Schedule booked already, please try different time slot.",
        });
        return;
      }
    }
  }

  const pilot = await pilotModel.findOne({ userId }).select("schedule");

  if (pilot?.schedule) {
    for (let i = 0; i < pilot.schedule.length; i++) {
      if (
        pilot.schedule[i].timeSlot === timeSlot &&
        pilot.schedule[i].date === date
      ) {
        res.status(400).json({
          message: "You are already scheduled at some other place on this time",
        });
        return;
      }
    }
  }

  try {
    droneSchedule?.push({ date, timeSlot });
    pilot?.schedule.push({ date, timeSlot });
    await drone?.save();
    await pilot?.save();
    res.status(201).json({
      message: "Schedule Booked Successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
    return;
  }
};
