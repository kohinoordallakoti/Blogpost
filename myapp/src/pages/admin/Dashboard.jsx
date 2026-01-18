import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { MdAddCircleOutline, MdWavingHand } from "react-icons/md";
import { LuFolders } from "react-icons/lu";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsFillLightningChargeFill } from "react-icons/bs";

const Dashboard = () => {
  const nav = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [countblogs, setCountBlogs] = useState(0);
  const [countpublished, setCountPublished] = useState(0);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog/get");
      const blog = res.data;
      setBlogs(blog);

      setCountBlogs(blog.length);
        const publishedCount = blog.filter(b => b.published).length;
      setCountPublished(publishedCount);
    } catch (err) {
      console.log(err);
    }
  }
  
  const totalLikes = React.useMemo(() => {
  if (!blogs) return 0;
  return blogs.reduce((sum, b) => sum + (b.likeCount || 0), 0);
}, [blogs]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex bg-amber-50">

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-amber-600">Welcome Back! <MdWavingHand className="inline text-amber-200"/></h1>
        <p className="text-gray-600 mb-6">Here's your blog overview for today</p>
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-amber-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">{countblogs}</div>
            <div>Total Blogs</div>
            <div className="text-sm">{countpublished} Published, {countblogs - countpublished} Drafts</div>
          </div>
          <div className="bg-pink-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">{totalLikes}</div>
            <div>Liked Blogs</div>
            <div className="text-sm">Across all your blogs</div>
          </div>
          <div className="bg-green-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">{countpublished}</div>
            <div>Published</div>
            <div className="text-sm">Live on your website</div>
          </div>
          <div className="bg-orange-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">{countblogs - countpublished}</div>
            <div>Drafts</div>
            <div className="text-sm">Waiting to be published</div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3 text-amber-700"><BsFillLightningChargeFill className="inline text-yellow-500"/> Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-amber-100 hover:bg-amber-200 p-6 rounded-xl shadow flex flex-col items-center gap-2"
          onClick={()=>nav('/admin/blogform')}>
            <span className="text-3xl"><MdAddCircleOutline className="text-red-500"/></span>
            Create Blog
          </button>
          <button className="bg-pink-100 hover:bg-pink-200 p-6 rounded-xl shadow flex flex-col items-center gap-2"
          onClick={()=>nav('/admin/categories')}>
            <span className="text-3xl"><LuFolders className="text-yellow-500"/></span>
            Manage Categories
          </button>
          <button className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow flex flex-col items-center gap-2"
          onClick={()=>nav('/admin/blogs')}>
            <span className="text-3xl"><LuFileSpreadsheet className="text-blue-500"/></span>
            All Blogs
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
