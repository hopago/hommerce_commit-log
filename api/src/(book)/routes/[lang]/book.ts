import express from "express";

import { getTodayPicks } from "../../controllers/[lang]/book";

const router = express.Router();

router.route("/").get(getTodayPicks);

export default router;
