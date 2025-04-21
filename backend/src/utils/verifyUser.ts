import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({
      message: "Token not sent",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!decoded) {
      res.status(401).json({
        message: "Token not correct",
      });
      return;
    }
    //@ts-ignore
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error from verifyUser",
    });
    return;
  }
};
