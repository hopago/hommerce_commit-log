import express from "express";

import {
  deleteUser,
  getCurrUser,
  getSession,
  register,
  updatePassword,
  updateUser,
} from "../controller/user";
import { getUsers } from "../controller/users";

const router = express.Router();

router.route("/").get(getCurrUser).patch(updateUser).delete(deleteUser);

router.route("/users").get(getUsers);

router.route("/session").get(getSession).post(register).patch(updatePassword);

export default router;
