import React, { use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Blogform = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const isEditmode = Boolean(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);

  const fetchData = async () => {
    if (!isEditmode) {
      return;
    } else {
      try {
        const res = await axios.get(`http://localhost:5000/blog/get/${id}`);
        setTitle(res.data.blog.title);
        setDescription(res.data.blog.description);
        setSelectedCategory(res.data.blog.category);
        setImage(res.data.blog.image);
        setPublished(res.data.blog.published);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEditmode]);

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/get");
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("published", published);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (!isEditmode) {
        await axios.post("http://localhost:5000/blog/create", formData);
        alert("Blog created successfully");
      } else {
        await axios.put(`http://localhost:5000/blog/update/${id}`, formData,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }
      nav("/admin/blogs");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  console.log(categories);

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-amber-50">
      
      <div className="p-10 min-h-screen text-amber-600">
        <button onClick = {() => nav("/admin/blogs")}><IoIosArrowBack className="inline" /> Go Back</button>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl px-10 py-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-amber-600 text-center">
          {isEditmode ? "Edit Blog" : "Create Blog"}
        </h1>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter your title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            rows="4"
            placeholder="Enter your description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <label className="m-2 font-medium text-gray-700">Published</label>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            {isEditmode ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Blogform;
