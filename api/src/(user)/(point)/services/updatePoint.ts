import { NextFunction, Request } from "express";
import Point from "../models/point";
import { HttpException } from "../../../middleware/error/utils";
import PointLog from "../(log)/models/point-log";
import { postPointLog } from "../(log)/services/postPointLog";
import { handlePostPoint } from "./postPoint";

export const handleUpdatePoint = async (req: Request, next: NextFunction) => {
  try {
    const { point } = req.body;
    if (!point) throw new HttpException(400, "Point object required.");

    const { desc, amount } = point;
    if (!desc || !amount)
      throw new HttpException(400, "Desc and amount required.");

    const updateQuery = { userId: req.params.userId };
    const updateAction = { $inc: { point: amount } };
    const foundPoint =
      (await Point.findOneAndUpdate(updateQuery, updateAction, {
        new: true,
      })) || (await handlePostPoint({ ...updateQuery, point: amount }, next));

    if (!foundPoint)
      throw new HttpException(500, "Something went wrong in post docs.");

    await postPointLog(
      {
        userId: req.params.userId,
        desc,
        amount,
        pointId: foundPoint._id,
      },
      next
    );

    return foundPoint.point;
  } catch (err) {
    next(err);
  }
};
