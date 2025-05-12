import { Request, Response } from "express";
import { DroneInfoModel, jobModel, pilotModel } from "../models/models";

export const createSchedule = async (req: Request, res: Response) => {
  const droneId = req.params.droneId;
  const jobId = req.params.jobId;
  //@ts-ignore
  const userId = req.user;

  try {
    // 1. Find the job by ID
    const job = await jobModel.findById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    // 2. Ensure job hasn’t already been accepted
    if (job.acceptedBy) {
      res
        .status(409)
        .json({ message: "Job already accepted by another pilot" });
      return;
    }

    const populatedJob = await job.populate([
      {
        path: "createdBy",
        select: "-password -role",
      },
      {
        path: "droneId",
        select: "name type capacity durability pricePerAcre",
      },
    ]);

    // 3. Find drone and pilot schedule
    const drone = await DroneInfoModel.findById(droneId).select("schedule");
    const pilot = await pilotModel.findOne({ userId }).select("schedule");

    if (!drone) {
      res.status(404).json({ message: "Drone not found" });
      return;
    }

    if (!pilot) {
      res.status(404).json({ message: "Logged in user is not a pilot" });
      return;
    }

    // 4. Check if drone is already booked at the time slot
    if (
      drone.schedule.some(
        (slot) => slot.date === job.date && slot.timeSlot === job.time
      )
    ) {
      res.status(403).json({
        message: "Drone is already scheduled at this time",
      });
      return;
    }

    // 5. Check if pilot is already booked
    if (
      pilot.schedule.some(
        (slot) => slot.date === job.date && slot.timeSlot === job.time
      )
    ) {
      res.status(400).json({
        message: "You are already scheduled at this time",
      });
      return;
    }

    const jobDetails = populatedJob.toObject();

    // 6. Add schedule to both drone and pilot
    drone.schedule.push({
      date: job.date,
      timeSlot: job.time,
      job: jobDetails,
    });
    pilot.schedule.push({
      date: job.date,
      timeSlot: job.time,
      job: jobDetails,
    });

    // 7. Mark job as accepted and delete it
    await drone.save();
    await pilot.save();
    await jobModel.findByIdAndDelete(jobId);

    res.status(201).json({
      message: "Schedule booked and job accepted successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
    return;
  }
};
