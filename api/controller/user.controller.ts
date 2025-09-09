/** @format */

import { Request, Response } from "express";
import pool from "../db";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(" SELECT * FROM users WHERE id=$1", [id]);

    if(result.rowCount===0){
        res.status(404).json({success:false,message:'User Not Found'})
    }
    res.json(result.rows[0]); 
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
