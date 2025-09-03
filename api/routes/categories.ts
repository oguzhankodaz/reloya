/** @format */

import { Router } from "express";

import { addProduct } from "../controller/company.controller";

const router = Router();

router.post("/:categoryId/products", addProduct);




export default router;
