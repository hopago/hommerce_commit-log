import { NextFunction, Request, Response } from "express";
import { handleGetUsers } from "../(favor)/services/getUsers";
import { HttpException } from "../../middleware/error/utils";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageNum = parseInt(req.query.pageNum as string);
  if (isNaN(pageNum)) throw new HttpException(400, "Page number required.");

  try {
    const usersData = await handleGetUsers({ pageNum }, next);

    if (usersData) return res.status(200).json(usersData);
  } catch (err) {
    next(err);
  }
};
