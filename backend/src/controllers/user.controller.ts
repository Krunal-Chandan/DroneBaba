import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  //   const { name, email, password, city, role } = req.body;
  res.status(201).json("Hello there");
};
