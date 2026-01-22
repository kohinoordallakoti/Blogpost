import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ✅ CORS FIRST */
app.use(cors({
  origin: "https://blogging-8r9u.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.options("*", cors({
  origin: "https://blogging-8r9u.onrender.com",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/category", categoryRoutes);
app.use("/contact", contactRoutes);
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
