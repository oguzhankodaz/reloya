/** @format */

import { Router } from "express";

import {
  addCategory,
  addProduct,
  deleteCategory,
  getCategories,
} from "../controller/company.controller";

const router = Router();

//http://localhost:5000/companies/8dfe068c-05a3-4116-af53-c171be790e3d/categories
router.post("/categories", addCategory);
router.get("/categories", getCategories);
router.delete("/categories/:id", deleteCategory);

//http://localhost:5000/categories/7a56d60d-9001-4a91-89fc-4a71160b81a3/products
router.post("/products", addProduct);

export default router;
