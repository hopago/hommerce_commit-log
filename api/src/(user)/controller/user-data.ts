import { NextFunction, Request, Response } from "express";
import { handleCreateUserData } from "../services/createUserData";
import { handleUpdateUserBookData } from "../services/updateUserBookData";
import { handleDeleteUserData } from "../services/deleteUserData";
import { HttpException } from "../../middleware/error/utils";

export const createUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new HttpException(400, "User clerk id required.");

    const isPosted = await handleCreateUserData({ userId }, next);
    if (isPosted) {
      return res.status(204);
    }
  } catch (err) {
    next(err);
  }
};

export const updateUserBookData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isUpdated = await handleUpdateUserBookData(req, next);
    if (isUpdated) {
      return res.status(204);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new HttpException(400, "User clerk id required.");

    const isDeleted = await handleDeleteUserData({ userId }, next);
    if (isDeleted) {
      return res.status(204);
    }
  } catch (err) {
    next(err);
  }
};
