import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import API from '../axios/axios.js'

const LikedBlogs = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [likedBlogs, setLikedBlogs] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const fetchlikedBlogs = async () => {
    try {
      const res = await API.get("/blog/liked");
      setLikedBlogs(res.data.likedBlogs);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch(logout());
      nav("/login");
    }
  };

  useEffect(() => {
    fetchlikedBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Blog not found");
      return;
    }
    try {
      await API.delete(`/blog/unlike/${id}`);
      fetchlikedBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-5 bg-amber-50 shadow-lg rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-amber-600">Your Liked Blogs</h1>
        <p className="text-amber-500 mb-6">
          Here's your liked blog overview for today
        </p>
      </div>

      <div className="w-full">
        <button
          onClick={() => nav("/blog")}
          className="m-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          See Blogs
        </button>
      </div>
      {likedBlogs?.map((item) => (
        <div
          key={item._id}
          className="max-w-8xl m-auto my-2 bg-white rounded-xl shadow-lg lg:h-50 md:h-50 overflow-hidden flex flex-col md:flex-row"
        >
          <div className="md:w-1/3 w-full h-56 md:h-auto m-auto">
            <img
              src={`http://localhost:5000/upload/${item.image}`}
              alt={item.title}
              className="w-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-6 flex flex-col justify-between ">
            <div>
              <h2 className="text-2xl font-semibold text-amber-700">
                {item.title}
              </h2>

              <p className="mt-3 text-amber-600 leading-relaxed">
                {item.description}
              </p>

              <p className="mt-3 text-amber-700 rounded-2xl px-3 py-1 bg-amber-100 inline-block">
                {item.category}
              </p>
              <p className="mt-3 ml-2 text-amber-700 rounded-2xl px-3 py-1 bg-amber-100 inline-block">
                {item.published ? "Published" : "Draft"}
              </p>
              <div className="flex justify-end items-center gap-3">

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => handleDelete(item._id)}
              >
                Unlike
              </button>
            </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default LikedBlogs