import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card"

const Blogsadmin = () => {
  const nav = useNavigate();
  const [blog, setBlogs] = useState();
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

  const handleDelete = async (id) => {
    if (!id) {
      alert("Blog not found");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/blog/delete/${id}`);
      alert("Blog deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 m-5 shadow-lg rounded-2xl">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-amber-600">All Blogs</h1>
            <p className="text-gray-600 mb-6">Here's your blog overview for today</p>
        </div>
        <div className="w-full">
            <button onClick={() => nav("/admin/blogform")} className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Blogs</button>
        </div>
      {blog?.map((item) => (
        <div className="max-w-4xl m-6 bg-white rounded-xl shadow-lg shadow-amber-100 lg:h-40 md:h-50 overflow-hidden flex flex-col md:flex-row " key={item._id}>
              <div className="md:w-1/3 w-full h-56 md:h-auto">
                <img
                  src={`http://localhost:5000/upload/${item.image}`}
                  alt={item.title}
                  className="w-full object-cover"
                />
              </div>
        
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                  <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
                  <p className="mt-3 text-gray-600 leading-relaxed rounded-2xl px-2 bg-gray-200 inline">{item.category}</p>
                </div>
        
                <div className="flex justify-end items-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" onClick={() => nav(`/blog/${item._id}`)}>Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
      ))}
      {blog?.length === 0 && (
        <h1 className="text-2xl font-bold">No Blogs Found</h1>
      )}
    </div>
  );
};

export default Blogsadmin;
