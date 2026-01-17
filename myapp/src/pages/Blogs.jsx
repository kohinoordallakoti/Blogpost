import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useSelector } from "react-redux";

const Blogs = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const user = useSelector((state) => state.auth.user);
  // Fetch all blogs
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog/get");
      setBlogs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Fetch liked blogs for logged-in user
  const fetchLikedBlogs = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(logout());
      nav("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/blog/liked", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setLikedBlogs(res.data.likedBlogs);
    } catch (err) {
      console.log(err.response?.data || err.message);
      dispatch(logout());
      nav("/login");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchData();
      await fetchLikedBlogs();
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  // Filter published blogs and merge with liked info
  const mergedBlogs = blogs
    .filter((blog) => blog.published) // only published blogs
    .map((blog) => {
      const likedBlog = likedBlogs.find((b) => b._id === blog._id);

      return {
        ...blog,
        likeCount: likedBlog?.likeCount ?? blog.likeCount ?? 0,
        isLikedByUser: likedBlog?.isLikedByUser ?? false,
      };
    });

  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-stale-100">
      <h1 className="text-3xl font-bold mt-5">All Blogs</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : mergedBlogs.length > 0 ? (
        mergedBlogs.map((item) => <Card key={item._id} blogData={item} />)
      ) : (
        <h1 className="text-2xl font-bold">No Blogs Found</h1>
      )}
    </div>
  );
};

export default Blogs;
