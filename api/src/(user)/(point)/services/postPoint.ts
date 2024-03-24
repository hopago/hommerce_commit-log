import { NextFunction } from "express";
import Point from "../models/point";

export const handlePostPoint = async (
  { userId, point }: { userId: string; point: number },
  next: NextFunction
) => {
  const newPoint = new Point({
    userId,
    point,
  });

  try {
    const savedPoint = await newPoint.save();

    return savedPoint;
  } catch (err) {
    next(err);
  }
};
