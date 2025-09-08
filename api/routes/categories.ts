/** @format */

import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../controller/company.controller";

const router = Router();

router.post("/products", addProduct);
router.get("/products", getProducts);
router.delete("/products/:id", deleteProduct);

export default router;
