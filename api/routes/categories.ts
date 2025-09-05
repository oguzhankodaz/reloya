/** @format */

import { Router } from "express";

import { addProduct } from "../controller/company.controller";

const router = Router();

router.post("/products", addProduct);




export default router;
