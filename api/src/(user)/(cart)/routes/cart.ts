import express from "express";
import {
  deleteCartItem,
  getCartList,
  postCartItem,
  updateCartList,
} from "../controllers/cart";
import { getCartItemLength } from "../services/getCartItemLength";

const router = express.Router();

router.route("/docs").get(getCartItemLength);

router
  .route("/:userId")
  .get(getCartList)
  .post(postCartItem)
  .patch(updateCartList)
  .delete(deleteCartItem);

export default router;
