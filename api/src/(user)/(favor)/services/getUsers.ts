import { NextFunction } from "express";
import User from "../../model/user";
import { HttpException } from "../../../middleware/error/utils";

const perPage = 8;

export const handleGetUsers = async ({ pageNum = 1 }, next: NextFunction) => {
  const skip = (pageNum - 1) * perPage;

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    const totalUsers = await User.countDocuments();
    if (!totalUsers && totalUsers !== 0)
      throw new HttpException(404, "User not found.");

    const totalPages = Math.ceil(totalUsers / perPage);
    const hasNextPage = skip + perPage < totalUsers;

    return {
      users,
      pagination: {
        currentPage: pageNum,
        totalUsers,
        totalPages,
        hasNextPage,
      },
    };
  } catch (err) {
    next(err);
  }
};
