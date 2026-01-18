import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Adminheader = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSearch = () => {
    if (search.trim()) {
      nav(`/admin/blogs?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <header className="bg-amber-600 text-white px-6 py-4 flex justify-between items-center rounded-xl shadow-xl">

      <div className="flex items-center  bg-white rounded-full px-3 py-1 w-150 mx-20">
        <FiSearch
          className="text-gray-600 cursor-pointer mr-2"
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search blogs by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full outline-none text-black bg-transparent"
        />
      </div>

      <div className="relative">
        <FiUser
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-xl shadow w-40">
            <button
              onClick={() =>{ nav("/admin/profile"); setOpen(false);}}
              className="border rounded-xl border-gray-200 w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() =>{ handleLogout(); setOpen(false);}}
              className="border rounded-xl border-gray-200 w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
          
        )}
      </div>
    </header>
  );
};

export default Adminheader;
