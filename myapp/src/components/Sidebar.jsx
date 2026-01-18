import React from 'react'
import { MdMenuOpen } from "react-icons/md";
import { MdDashboard, MdCategory,MdLibraryBooks } from "react-icons/md";
import {CiLogout} from "react-icons/ci"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { CgProfile } from "react-icons/cg";
import { IoIosContact } from "react-icons/io";

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
  {
    icons:<IoIosContact size={20}/>,
    label:'Contact',
    path:'/admin/contact'
  }

]

const Sidebar = ({open,setOpen}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const nav = useNavigate();

    const handleChange = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(logout());
        nav("/login");
      }
    } catch (error) {
      alert("Logout failed");
      console.error(error.message);
    }
  };
  return (
    <div className={`h-screen duration-500 shadow-md
        ${open ? "w-60 bg-amber-600 text-white" : "w-16 bg-gray-200 text-gray-800"}`}>
          <div className="flex items-center justify-center">
            <h1 className={`text-2xl font-bold ${open ? "w-25" : "w-0" } overflow-hidden mr-5`}><CgProfile size={100} className="block"/></h1>
            <div><MdMenuOpen size={30} className="cursor-pointer " onClick={()=>setOpen(!open)}/></div>
            </div>
        <div className="px-3 py-2 h-10 flex justify-between items-center ml-10">
            <h1 className={`text-2xl font-bold ${open ? "w-25" : "w-0" } overflow-hidden`}>Admin</h1>
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
        </ul>


    </div>
  )
}

export default Sidebar