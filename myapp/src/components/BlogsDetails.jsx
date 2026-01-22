import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axios/axios";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const fetchBlogDetails = async () => {
    try {
      const res = await API.get(`/blog/get/${id}`);
      console.log(res.data);
      setBlog(res.data.blog);
      setLikeCount(res.data.likeCount);
      setLiked(res.data.isLikedByUser);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(`/blog/like/${id}`, {});
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.log(err.response?.data || err.message);
      dispatch(logout());
    }
  };

  // Toggle comment box
  const handleComment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setShowCommentBox((prev) => !prev);

    try {
      const res = await API.get(`/blog/getcomment/${id}`);
      console.log(res.data);
      setComments(res.data.comments || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
      dispatch(logout());
    }
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await API.post(`/blog/comment/${id}`, {
        comment: commentText,
      });
      setComments((prev = []) => [...prev, res.data.comment]);
      setCommentText("");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/blog/deletecomment/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    fetchBlogDetails();
  }, []);

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-amber-50 py-16">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="ml-10 mb-6 text-amber-700 hover:text-amber-900 font-semibold"
        >
          {" "}
          &larr; Back to Blogs
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 p-6 text-center">
          {blog.title}
        </h1>
        <div className="flex justify-center items-center">
          <img
            src={`https://blogpost-i7o1.onrender.com/upload/${blog.image}`}
            alt={blog.title}
            className="w-100 h-150 object-contain"
          />
        </div>
        <div className="p-6 space-y-4">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1 rounded-full">
            {blog.category}
          </span>

          <p className="text-gray-700 text-lg leading-relaxed font-serif">
            {blog.description}
          </p>

          <div className="flex items-center gap-6 pt-4 border-t">
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
              >
                {liked ? <FaHeart /> : <CiHeart />}
                <span>{likeCount}</span>
              </button>

              <button
                className="flex items-center gap-2 text-green-400 hover:text-green-500 transition duration-300 ease-in-out  cursor-pointer"
                onClick={handleComment}
              >
                <FaRegCommentDots />
                <span>Comment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCommentBox && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitComment();
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="button"
              onClick={submitComment}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold hover:text-green-700"
            >
              <IoMdSend className="inline" /> Send
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {comments?.map((comment) => (
              <div
                key={comment._id}
                className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-start"
              >
                <div>
                  <strong>{comment.user?.name}:</strong> {comment.comment}
                </div>
                {comment.user?._id === user?.id && (
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
