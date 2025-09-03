/** @format */

import { Router } from "express";
import {
  existingUser,
  loginCompany,
  loginUser,
  logout,
  registerCompany,
  registerUser,
} from "../controller/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = Router();

router.post("/register-user", registerUser);
router.post("/register-company", registerCompany);
router.post("/login-user", loginUser);
router.post("/login-company", loginCompany);
router.get("/me", authMiddleware, existingUser);
router.post("/logout", logout);
export default router;
