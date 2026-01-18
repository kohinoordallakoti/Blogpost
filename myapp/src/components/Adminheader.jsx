import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Adminheader = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // 🔥 AUTO SEARCH WITH DELAY
  useEffect(() => {
    if (!search.trim()) return;

    const delay = setTimeout(() => {
      nav(`/admin/blogs?search=${encodeURIComponent(search)}`);
    }, 500); // ⏱ delay time

    // ❗ Cancel previous delay if user types again
    return () => clearTimeout(delay);

  }, [search, nav]);

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <header className="bg-amber-600 text-white px-6 py-4 flex justify-between items-center rounded-xl shadow-xl">

      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-80">
        <FiSearch className="text-gray-600 mr-2" />
        <input
          type="text"
          placeholder="Search blogs by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-black bg-transparent"
        />
      </div>

      {/* User */}
      <div className="relative">
        <FiUser
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-xl shadow w-40">
            <button
              onClick={() => {
                nav("/admin/profile");
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
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
