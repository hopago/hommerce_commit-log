import { NextFunction, Request, Response } from "express";
import { ServerError } from "../../config/error/error";
import { handlePostErrorLog } from "../services/postErrorLog";
import { HttpException } from "../../middleware/error/utils";

export const postErrorLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = req.body;

  if (!error) throw new HttpException(400, "Error required.");

  if (error instanceof ServerError || error instanceof Error) {
    try {
      const isSuccess = await handlePostErrorLog(req, next);

      if (isSuccess) {
        return res.status(204);
      }
    } catch (err) {
      next(err);
    }
  }
};
