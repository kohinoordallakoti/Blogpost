import express from "express";
import { createBlog, deleteBlog, getSingleBlog, getAllBlogs, updateBlog, likeBlogs, getlikeBlogs, dislikeBlog } from "../authcontroller/blogAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.single("image"), createBlog);

router.get("/get", getAllBlogs);

router.get("/get/:id", getSingleBlog);

router.put("/update/:id", upload.single("image"), updateBlog);

router.delete("/delete/:id", deleteBlog);

router.post("/like/:id", likeBlogs);

router.get("/liked", getlikeBlogs);

router.delete("/unlike/:id", dislikeBlog);

export default router;