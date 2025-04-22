import { Request, Response } from "express";
import { DroneInfoModel } from "../models/models";

export const createSchedule = async (req: Request, res: Response) => {
  const { date, timeSlot } = req.body;
  const droneId = req.params.droneId;
  //@ts-ignore
  const userId = req.user;

  const drone = await DroneInfoModel.findById(droneId).select("schedule");
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

  try {
    droneSchedule?.push({ date, timeSlot });
    await drone?.save();
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
