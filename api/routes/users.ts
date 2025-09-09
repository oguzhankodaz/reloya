/** @format */

import { Router } from "express";
import { getUser } from "../controller/user.controller";

const router = Router();

//http://localhost:5000/companies/8dfe068c-05a3-4116-af53-c171be790e3d/categories
router.get("/:id", getUser);

export default router;
