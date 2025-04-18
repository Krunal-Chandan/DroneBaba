import { Request, Response } from "express";
import { userModel } from "../models/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password, city, role } = req.body;

  if (!name || !email || !password || !city || !role) {
    return res.status(401).json({
      message: "Please fill the required fields",
    });
  }

  if (password.length < 8 || password.length >= 20) {
    return res.status(401).json({
      message: "Password should be between 8 and 20 characters",
    });
  }

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(401).json({
      message: "Email already registered",
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      city,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        city: newUser.city,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email not registered yet. Please register yourself.",
    });
  }

  try {
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`);

    res.cookie("access_token", token);
    // localStorage.setItem("access_token",token)

    return res.status(201).json({
      message: "User logged in successfully",
      token,
      role: user.role,
    });
  } catch (error) {
    console.log("Error is " + error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //@ts-ignore
  const userId = req.user;

  const user = await userModel.findById({ _id: userId }).select("-password");

  if (!user) {
    return res.status(401).json({
      message: "User id not matched",
    });
  }

  try {
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("access_token");
  // localStorage.removeItem("access_token");
  return res.status(201).json({
    message: "You are logged out",
  });
};
