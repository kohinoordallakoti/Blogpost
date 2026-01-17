import React, { useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/authSlice";

const Card = ({ blogData }) => {
  const { _id, image, title, description, category, likeCount: initialLikeCount, isLikedByUser } = blogData;
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
      const res = await axios.post(
        `http://localhost:5000/blog/like/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Update state based on response
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.log(err.response?.data || err.message);
      dispatch(logout());
      navigate("/login");
    }
  };
  console.log(likeCount);

  // Toggle comment box
  const handleComment = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowCommentBox(!showCommentBox);
  };

  // Submit comment locally
  const submitComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, { user: user.name, text: commentText }]);
    setCommentText("");
  };

    useEffect(() => {
    setLiked(isLikedByUser);
    setLikeCount(initialLikeCount);
  }, [isLikedByUser, initialLikeCount]);


  return (
    <div className="max-w-4xl m-6 bg-amber-50 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 w-full h-56 md:h-auto">
        <img
          src={`http://localhost:5000/upload/${image}`}
          alt={title}
          className="w-full object-cover my-3"
        />
      </div>

      <div className="md:w-2/3 px-6 flex flex-col justify-between my-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
          <span className="inline px-2 rounded-xl bg-amber-100 text-gray-500">{category}</span>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            {liked ? <FaHeart/> : <CiHeart/> }
            <span>{likeCount}</span>
          </button>

          <button
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out  cursor-pointer"
            onClick={handleComment}
          >
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
        </div>

        {showCommentBox && (
          <div className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="button"
              onClick={submitComment}
              className="self-end flex items-center gap-2 text-blue-500 hover:text-blue-600 transition cursor-pointer"
            >
              <IoMdSend /> Send
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {comments.map((comment, index) => (
            <div key={index} className="border border-gray-300 rounded-lg px-4 py-2">
              <strong>{comment.user}:</strong> {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;