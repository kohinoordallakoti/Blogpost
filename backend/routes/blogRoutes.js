import express from "express";
import { createBlog, deleteBlog, getSingleBlog, getAllBlogs, updateBlog, likeBlogs, getlikeBlogs, dislikeBlog } from "../authcontroller/blogAuth.js";
import upload from "../middleware/upload.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), createBlog);

router.get("/get", getAllBlogs);

router.get("/get/:id", getSingleBlog);

router.put("/update/:id", authMiddleware, upload.single("image"), updateBlog);

router.delete("/delete/:id", authMiddleware, deleteBlog);

router.post("/like/:id", authMiddleware, likeBlogs);

router.get("/liked", authMiddleware, getlikeBlogs);

router.delete("/unlike/:id", authMiddleware, dislikeBlog);

export default router;