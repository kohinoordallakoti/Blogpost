import React from 'react'
import { MdMenuOpen } from "react-icons/md";
import { MdDashboard, MdCategory,MdLibraryBooks } from "react-icons/md";
import {CiLogout} from "react-icons/ci"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const menuItems =[
  {
    icons:<MdDashboard size={20}/>,
    label:'Dashboard',
    path:'/admin/dashboard'
  },
  {
    icons:<MdLibraryBooks size={20}/>,
    label:'Blogs',
    path:'/admin/blogs'
  },
  {
    icons:<MdCategory size={20}/>,
    label:'Category',
    path:'/admin/categories'
  },

]

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const nav = useNavigate();

    const handleChange = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("Logout successful");
        nav("/login");
      }
    } catch (error) {
      alert("Logout failed");
      console.error(error.message);
    }
  };
  return (
    <div className={`border shadow-md h-screen duration-500 ${open ? "w-60 bg-amber-600 text-white" : "w-16 flex flex-col bg-gray-200" }`}>

        <div className="px-3 py-2 h-20 flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${open ? "w-20" : "w-0" } overflow-hidden`}>Admin</h1>
            <div><MdMenuOpen size={30} className="cursor-pointer" onClick={()=>setOpen(!open)}/></div>
        </div>

        <ul className="flex-1 items-center gap-2  py-2 rounded-lg">
          {
            menuItems.map((item, index) => (
              <li key={index} className="px-2 py-2 hover:bg-amber-700 cursor-pointer rounded-md flex items-center" onClick={()=>nav(item.path)}>
                <p className="p-4">{item.icons}</p>
                <p className={`${!open && "w-0  translate-x-24"} duration-500 overflow-hidden`}>{item.label}</p>
              </li>
            ))
          }
          <li className="flex items-center gap-2 hover:bg-amber-700 px-5 py-6" onClick={handleChange}>
            <h1><CiLogout size={20} className="mr-3"/></h1>
            <button
        className={`${!open && "w-0  translate-x-24"} duration-500 overflow-hidden`}
      >
        Logout
      </button>
          </li>
        </ul>


    </div>
  )
}

export default Sidebar