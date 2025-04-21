import { Request, Response } from "express";
import { OtherDetailModel } from "../models/models";

export const fillLocationDetails = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;

  const {
    address,
    taluka,
    pinCode,
    state,
    whatsapp_number,
    pan_number,
    aadhar_number,
    contact_number,
  } = req.body;

  if (
    !address ||
    !taluka ||
    !pinCode ||
    !state ||
    !whatsapp_number ||
    !pan_number ||
    !aadhar_number ||
    !contact_number
  ) {
    res.status(401).json({
      message: "Please fill all the required fields",
    });
    return;
  }

  try {
    await OtherDetailModel.create({
      userId,
      address,
      taluka,
      pinCode,
      state,
      whatsapp_number,
      pan_number,
      aadhar_number,
      contact_number,
    });

    res.status(201).json({
      message: "Location details saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const getUserLocationDetails = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;
  const user = await OtherDetailModel.findOne({ userId: userId }).populate(
    "userId",
    "-password"
  );

  if (!user) {
    res.status(401).json({
      message: "No details for the following user found",
    });
    return;
  }

  try {
    res.status(201).json({
      message: "Details found",
      user,
      //@ts-ignore
      userDet: user.userId.populate(),
      // userDet: user.toJSON(),
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error " + error,
    });
    return;
  }
};
