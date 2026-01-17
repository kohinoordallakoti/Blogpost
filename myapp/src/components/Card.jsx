import React, { useState } from "react";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Card = ({ image, title, description, category }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  const handleComment = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (showCommentBox) {
      setShowCommentBox(false);
      return;
    }
    setShowCommentBox(true);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => [...prev, commentText]);
    setCommentText("");
  };

  return (
    <div className="max-w-4xl m-6 bg-amber-50 rounded-xl shadow-lg lg:h-50 md:h-50 overflow-hidden flex flex-col md:flex-row ">
      <div className="md:w-1/3 w-full h-56 md:h-auto">
        <img
          src={`http://localhost:5000/upload/${image}`}
          alt={title}
          className="w-full object-cover my-3 "
        />
      </div>
      <div className="md:w-2/3 px-6 flex flex-col justify-between my-3">
        <div>
            <span className="inline px-2 rounded-xl bg-amber-100 text-gray-500">{category}</span>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            <FaHeart className={liked ? "fill-red-500" : ""} />
            <span>{likes}</span>
          </button>

          <button
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition cursor-pointer"
            onClick={handleComment}
          >
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
        </div>
        {showCommentBox && (
            <div className="mt-6 flex items-center">
              <input
                type="text"
                placeholder="Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <button type="button" onClick={submitComment} className="ml-2 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition cursor-pointer">
                <IoMdSend /> Send
              </button>
            
            </div>
          )}
          {showCommentBox && (
            <div className="mt-4 flex flex-col">
              <textarea
                placeholder="Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button type="button" onClick={submitComment} className="ml-2 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition cursor-pointer">
                <IoMdSend /> Send
              </button>
            </div>
          )}
          <div className="mt-4 flex flex-col ">
              {comments.map((comment, index) => (
                <div key={index} className="border border-gray-300 rounded-lg px-4 py-2">
                <ul >
                    <li>{user.name}: {comment}</li>
                </ul>
                </div>
              ))}
              </div>
      </div>
    </div>
  );
};

export default Card;
