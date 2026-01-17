 import mongoose from "mongoose";


const LikedBlogs = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }
}, { timestamps: true });

LikedBlogs.index({ user: 1, blog: 1 }, { unique: true });

const LikeBlog = mongoose.model("LikeBlog", LikedBlogs);

export default LikeBlog;