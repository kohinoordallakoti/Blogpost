import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"

const Blogs = () => {
  const nav = useNavigate();
  const [blog, setBlogs] = useState();
  const [likedBlogs, setLikedBlogs] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog/get");
      setBlogs(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const publishedBlogs = blog?.filter(b => b.published);


  const handleDelete = async (id) => {
    if (!id) {
      alert("Blog not found");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/blog/deleteblog/${id}`);
      alert("Blog deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-stale-100">
      <div>
        <h1 className="text-3xl font-bold mt-5">All Blogs</h1>
      </div>
      {publishedBlogs?.map((item) => (
        <Card key={item._id} title={item.title} description={item.description} category={item.category} image={item.image} id={item._id} />
      ))}
      {blog?.length === 0 && (
        <h1 className="text-2xl font-bold">No Blogs Found</h1>
      )}
    </div>
  );
};

export default Blogs;
