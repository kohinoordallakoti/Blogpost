import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import API from "../axios/axios.js";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.auth.user);
 
  const fetchData = async () => {
    try {
      const res = await API.get(`/blog/get`,{
        params:{
          page,
          limits:3,
          search
        }
      });
      setBlogs(res.data.blogsWithLikes);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikedBlogs = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }

    try {
      const res = await API.get("/blog/liked");
      setLikedBlogs(res.data.likedBlogs);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

useEffect(() => {
  const fetchAll = async () => {
    setLoading(true);
    await fetchData();
    await fetchLikedBlogs();
    setLoading(false);
  };
  fetchAll();
}, [search,page]);

  // Filter published blogs and merge with liked info
  const mergedBlogs = blogs
    .filter((blog) => blog.published)
    .map((blog) => {
      const likedBlog = likedBlogs.find((b) => b && b._id === blog._id);

      return {
        ...blog,
        likeCount: blog.likeCount ?? 0,
        isLikedByUser: Boolean(likedBlog),
      };
    });

  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-stale-100 text-amber-700">
      <h1 className="text-3xl font-bold mt-5">All Blogs</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : mergedBlogs.length > 0 ? (
        mergedBlogs.map((item) => <Card key={item._id} blogData={item} />)
      ) : (
        <h1 className="text-2xl font-bold">No Blogs Found</h1>
      )}
      <div className="flex items-center gap-5 mb-10">
        <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1} 
        className="m-5 bg-green-500 hover:bg-green-600 text-white p-2 rounded">Previous</button>
        <h1>Page {page} of {totalpages}</h1>
        <button onClick={() => setPage(page + 1)} 
        disabled={page === totalpages} 
        className="m-5 bg-green-500 hover:bg-green-600 text-white p-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default Blogs;
