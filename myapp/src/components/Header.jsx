import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

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

  

  return (
    <header className="bg-amber-600 text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-20">
        <h1
          className="text-4xl font-bold cursor-pointer"
          onClick={() => nav("/")}
        >
          Logo
        </h1>

        <nav className="hidden md:flex gap-6 text-lg font-medium">
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
          {/* <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="hidden md:block px-3 py-1 rounded-full text-black"
          /> */}

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
      )}
    </header>
  );
};

export default Header;
