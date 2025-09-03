/** @format */

import { Request, Response } from "express";
import pool from "../db";
import { comparePassword, hashPassword } from "../utils/password";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      surname,
      email,
      password,
    }: { name: string; surname: string; email: string; password: string } =
      req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "This email already exists" });
    }

    const password_hash = await hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO users (name,surname,email,password_hash) VALUES ($1 ,$2, $3, $4) RETURNING *",
      [name, surname, email, password_hash]
    );

    const { password_hash: _, ...safeUser } = newUser.rows[0];

    res.status(201).json({
      success: true,
      message: "User Created",
      user: safeUser,
    });
  } catch (err) {
    console.error("registerUser:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM companies WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "This email already exists" });
    }

    const password_hash = await hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO companies  (name,email,password_hash) VALUES ($1 ,$2, $3) RETURNING *",
      [name, email, password_hash]
    );

    const { password_hash: _, ...safeUser } = newUser.rows[0];

    res.status(201).json({
      success: true,
      message: "Company Created",
      user: safeUser,
    });
  } catch (err) {
    console.error("registercompanies :", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    }

    const isMatch = await comparePassword(password, user.rows[0].password_hash);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const { password_hash, ...safeUser } = user.rows[0];
    const token = jwt.sign(
      { userId: safeUser.id, email: safeUser.email, name: safeUser.name,role:safeUser.role }, // payload
      process.env.JWT_SECRET || "mysecretkey", // secret key
      { expiresIn: "7d" } // token süresi
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // prod'da sadece HTTPS
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: safeUser,
      token: token,
    });
  } catch (err) {
    console.error("loginUser:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginCompany = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await pool.query("SELECT * FROM companies WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    }

    const isMatch = await comparePassword(password, user.rows[0].password_hash);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const { password_hash, ...safeUser } = user.rows[0];
    const token = jwt.sign(
      { userId: safeUser.id, email: safeUser.email , name:safeUser.name ,role:safeUser.role},
      process.env.JWT_SECRET || "mysecretkey", // secret key
      { expiresIn: "7d" } // token süresi
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // prod'da sadece HTTPS
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: safeUser,
      token: token,
    });
  } catch (err) {
    console.error("loginUser:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const existingUser = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: (req as any).user, // { userId, email, iat, exp }
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ success: true, message: "Logged out" });
};