import express from "express";
import { postErrorLog } from "../controller/error";

const router = express.Router();

router.route("/error").post(postErrorLog);

export default router;
