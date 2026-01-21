import React, { useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import API from "../axios/axios";

const Card = ({ blogData }) => {
  const {
    _id,
    image,
    title,
    description,
    category,
    likeCount: initialLikeCount,
    isLikedByUser,
  } = blogData;
  const [liked, setLiked] = useState(isLikedByUser || false);
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Handle like/unlike
  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.post(`/blog/like/${_id}`, {});

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
      console.log(_id);
      const res = await API.get(`/blog/getcomment/${_id}`);
      console.log(res.data.comments);
      setComments(res.data.comments || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
      dispatch(logout());
    }
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await API.post(`/blog/comment/${_id}`, {
        comment: commentText,
      });
      setComments((prev = []) => [...prev, res.data.comment]);
      setCommentText("");
      console.log(res.data);
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
    setLiked(isLikedByUser);
    setLikeCount(initialLikeCount);
  }, [isLikedByUser, initialLikeCount]);

  return (
    <div className="w-4/5 md:w-3/4 m-6 bg-amber-50 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row text-amber-600">
      <div className="md:w-1/3 w-full h-56 md:h-auto">
        <img
          src={`http://localhost:5000/upload/${image}`}
          alt={title}
          className="w-full h-56 object-cover my-3"
        />
      </div>

      <div className="md:w-2/3 px-6 flex flex-col justify-between my-3">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-3  leading-relaxed line-clamp-4">{description}</p>
          <span className="inline px-2 rounded-xl bg-amber-100">
            {category}
          </span>
        </div>

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
          <button
            onClick={() => navigate(`/blogdetails/${_id}`)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition duration-300 ease-in-out  cursor-pointer"
          >
            Read More
          </button>
        </div>

        {showCommentBox && (
          <div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {submitComment();}
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
    </div>
  );
};

export default Card;
