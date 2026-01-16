import React, { use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Blogform = () => {
  const {id} = useParams();
  const nav = useNavigate();
  const isEditmode = Boolean(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);

  const fetchData = async () => {
    if (!isEditmode) {return;}
    else{
    try {
      const res = await axios.get(`http://localhost:5000/blog/get/${id}`);
      setTitle(res.data.blog.title);
      setDescription(res.data.blog.description);
      setCategory(res.data.blog.category);
      setImage(res.data.blog.image);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }}
  };

  useEffect(() => {
      fetchData();
  }, [isEditmode]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
    if (!isEditmode){
      const res = await axios.post(
        "http://localhost:5000/blog/createblog",
        formData
      );
      alert("Blog created successfully");
      }
      else{
        const res = await axios.put(`http://localhost:5000/blog/updateblog/${id}`,formData)
        alert("Blog updated successfully");
      }
      nav("/contact"); 
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };


  return (
    <div className="flex justify-center items-center my-20">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col mx-10 px-10 gap-10 w-100 rounded-xl shadow-2xl"
      >
        <div>
          <h1 className="text-3xl font-bold text-blue-500 flex justify-center">
            {isEditmode ? "Edit Blog" : "Create Blog"}
          </h1>
        </div>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter your title"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <br />
          <input
            type="text"
            name="description"
            value={description}
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Enter your description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"
          >
            {isEditmode ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Blogform;
