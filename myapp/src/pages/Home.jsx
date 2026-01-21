import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../axios/axios.js";
import { FaPenNib, FaBookOpen, FaShareAlt } from "react-icons/fa";
const Home = () => {
  const [category, setCategory] = useState([]);
  const [blog, setBlog] = useState([]);
  const nav = useNavigate();
  const filteredRef = useRef(null);
  const fetchCategories = async () => {
    try {
      const res = await API.get("/category/get");
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/get");
      setBlog(res.data.blogsWithLikes);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const scrollToFiltered = () =>
    filteredRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleeachblog = async (categoryName) => {
    if (!categoryName) {
      fetchBlogs();
      return;
    }
    try {
      const res = await API.get(`/blog/get`);
      const filteredBlogs = res.data.blogsWithLikes.filter(
        (blog) => blog.category === categoryName,
      );
      setBlog(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-amber-100 ">
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6">
          Welcome to Our Blog
        </h2>
        <p className="text-amber-800 max-w-2xl mx-auto mb-10">
          Discover amazing stories, insights, and ideas from talented writers
          around the world.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => nav("/blog")}
            className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition"
          >
            Explore All Blogs
          </button>
          <button
            onClick={() => nav("/register")}
            className="px-6 py-3 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-100 transition"
          >
            Join Us Today
          </button>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-amber-700 text-center mb-8">
            Browse by Category
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                scrollToFiltered();
                handleeachblog();
              }}
              className="text-lg font-semibold text-amber-700 cursor-pointer hover:bg-amber-50 px-4 py-2 rounded-full border border-amber-200 hover:scale-105 transition"
            >
              all categories
            </button>
            {category.map((item, index) => (
              <div key={index} className="flex">
                <button
                  onClick={() => {
                    scrollToFiltered();
                    handleeachblog(item.name);
                  }}
                  className="text-lg font-semibold text-amber-700 cursor-pointer hover:bg-amber-50 px-4 py-2 rounded-full border border-amber-200 hover:scale-105 transition"
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section ref={filteredRef} className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold text-amber-700 text-center mb-8">
          Filtered Blogs
        </h3>
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={() => nav("/blog")}
            className="text-amber-500 hover:text-amber-700 hover:underline font-semibold"
          >
            See More →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-5xl hover:scale-105 transition"
              onClick={() => nav(`/blogdetails/${item._id}`)}
            >
              <img
                src={`http://localhost:5000/upload/${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 line-clamp-3">{item.description}</p>

                <span className="inline-block bg-amber-200 rounded-full px-3 py-1 text-sm text-amber-700 mt-3">
                  {item.category}
                </span>
              </div>
            </div>
          ))}

          {blog.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No blogs available in this category.
            </p>
          )}
        </div>
      </section>

<section className="bg-white py-12">
  <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto px-6 gap-8 text-center">

    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-amber-200 text-amber-700 hover:scale-105 transition">
      <FaPenNib size={36} />
      <h3 className="text-xl font-bold">Create Blogs</h3>
      <p className="text-sm opacity-90">Write and publish ideas</p>
    </div>

    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-amber-200 text-amber-700 hover:scale-105 transition">
      <FaBookOpen size={36} />
      <h3 className="text-xl font-bold">Read Blogs</h3>
      <p className="text-sm opacity-90">Discover quality content</p>
    </div>

    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-amber-200 text-amber-700 hover:scale-105 transition">
      <FaShareAlt size={36} />
      <h3 className="text-xl font-bold">Share Ideas</h3>
      <p className="text-sm opacity-90">Inspire your community</p>
    </div>

  </div>
</section>

    </div>
  );
};

export default Home;
