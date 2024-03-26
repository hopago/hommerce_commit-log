import { NextFunction, Request, Response } from "express";
import { handleCreateUserData } from "../services/createUserData";
import { handleUpdateUserBookData } from "../services/updateUserBookData";
import { handleDeleteUserData } from "../services/deleteUserData";
import { HttpException } from "../../middleware/error/utils";
import { handleGetUserBookData } from "../services/getUserBookData";

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

export const getUserBookData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new HttpException(400, "User clerk id required.");

    const userBookData = await handleGetUserBookData({ userId }, next);

    if (userBookData) {
      return res.status(200).json({ category: userBookData.category });
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
    const { userId } = req.params;
    if (!userId) throw new HttpException(400, "User clerk id required.");

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
