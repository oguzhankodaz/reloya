/** @format */
import { Request, Response } from "express";
import pool from "../db";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.userId; // token içinden bilgiyi alma
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    const newCategory = await pool.query(
      "INSERT INTO categories (company_id, name) VALUES ($1, $2) RETURNING *",
      [companyId, name]
    );

    res.status(201).json({
      success: true,
      category: newCategory.rows[0],
    });
  } catch (err) {
    console.error("addCategory error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating category",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user.userId;
    const result = await pool.query(
      "SELECT * FROM categories WHERE company_id = $1 ORDER BY created_at DESC",
      [companyId]
    );
    res.status(200).json({ success: true, categories: result.rows });
  } catch (err) {
    console.error("getCategories error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price,categoryId, points_to_buy, points_on_sell } = req.body;

    // kategori var mı kontrol et (opsiyonel ama güvenli)
    const category = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );
    if (category.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const companyId = category.rows[0].company_id;

    const newProduct = await pool.query(
      `INSERT INTO products (category_id, company_id, name, price ,points_to_buy, points_on_sell)
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [categoryId, companyId, name, price, points_to_buy, points_on_sell]
    );

    res.status(201).json({
      success: true,
      product: newProduct.rows[0],
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
