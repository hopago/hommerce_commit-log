import express from "express";

import { getRecommendBooks } from "../controller/recommend";

const router = express.Router();

router.route("/category").get(getRecommendBooks);

export default router;
