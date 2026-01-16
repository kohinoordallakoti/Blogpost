import express from "express";
import { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } from "../authcontroller/categoryAuth.js";

const router = express.Router();

router.post("/create", createCategory);

router.get("/get", getAllCategories);   

router.get("/get/:id", getSingleCategory);

router.put("/update/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

export default router;