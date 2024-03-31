import { NextFunction, Request } from "express";
import fs from "fs";
import { promisify } from "util";

const appendFilePromisified = promisify(fs.appendFile);

export const handlePostErrorLog = async (req: Request, next: NextFunction) => {
  const { error } = req.body;

  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.url
  }\n${error}`;

  try {
    await appendFilePromisified("logs/error.log", logMessage);

    return true;
  } catch (err) {
    console.error("로그 파일에 기록하는데 실패했습니다.", err);
    next(err);
  }
};
