import express from "express";
import {
  createUserData,
  deleteUserData,
  updateUserBookData,
} from "../controller/user-data";

const router = express.Router();

router.route("/book/:userId").patch(updateUserBookData);

router.route("/:userId").post(createUserData).delete(deleteUserData);

export default router;
