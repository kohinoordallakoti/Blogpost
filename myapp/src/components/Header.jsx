import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  //   const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      nav(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      nav(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-amber-600 text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-20">
        <h1
          className="text-4xl font-bold cursor-pointer mx-2"
          onClick={() => nav("/")}
        >
          Blog Post
        </h1>

        <nav className="hidden md:flex gap-6 text-lg font-medium mx-2">
          <Link className="hover:text-amber-200" to="/">
            Home
          </Link>
          <Link className="hover:text-amber-200" to="/blog">
            Blog
          </Link>
          <Link className="hover:text-amber-200" to="/about">
            About
          </Link>
          <Link className="hover:text-amber-200" to="/contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3 relative">
          <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1">
            <FiSearch
              className="text-amber-600 cursor-pointer mr-2"
              onClick={handleSearchIconClick}
            />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="outline-none text-black bg-transparent"
            />
          </div>

          {user ? (
            <div className="relative flex gap-10 ">
              <div>
                <Link className="hover:text-amber-200 p-0" to="/likedblogs">
                  Liked Blogs
                </Link>
              </div>
              <button
                onClick={toggleDropdown}
                className="px-4 py-1 border border-white rounded-full hover:bg-white hover:text-amber-600 transition"
              >
                {user.name || "User"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-amber-600 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      nav("/profile");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-amber-100 transition"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setDropdownOpen(false);
                      nav("/login");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-amber-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => nav("/login")}
                className="px-4 py-1 border border-white rounded-full hover:bg-white hover:text-amber-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => nav("/register")}
                className="px-4 py-1 bg-white text-amber-600 rounded-full hover:bg-amber-100 transition"
              >
                Sign Up
              </button>
            </>
          )}

          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-500 text-white px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center bg-white rounded px-3 py-2 mb-3">
  <FiSearch
    className="text-amber-600 cursor-pointer mr-2"
    onClick={() => {
      handleSearchIconClick();
      toggleMobileMenu();
    }}
  />
  <input
    type="text"
    placeholder="Search blogs..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      handleSearchKeyDown(e);
      toggleMobileMenu();
    }}
    className="w-full outline-none text-black"
  />
</div>
        <nav className=" md:hidden bg-amber-500 text-white px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/blog" onClick={toggleMobileMenu}>
            Blog
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/contact" onClick={toggleMobileMenu}>
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/profile" onClick={toggleMobileMenu}>
                Profile
              </Link>
              <button
                onClick={() => {
                  dispatch(logout());
                  toggleMobileMenu();
                  nav("/login");
                }}
                className="cursor-pointer w-full text-left "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu}>
                Login
              </Link>
              <Link to="/register" onClick={toggleMobileMenu}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
