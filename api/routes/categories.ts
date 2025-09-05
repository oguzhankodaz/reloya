/** @format */

import { Router } from "express";

import { addProduct, getProducts } from "../controller/company.controller";

const router = Router();

router.post("/products", addProduct);
router.get("/products", getProducts);





export default router;
