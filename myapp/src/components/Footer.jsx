import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <div className="w-full h-auto overflow-clip">
      <div className="flex flex-col md:flex-row items-start justify-between px-8 md:px-20 py-16 gap-14 bg-amber-600 text-white">
        <div>
          <h1 className="text-3xl font-bold">Blogging App</h1>
          <p className="text-xl font-semibold">Welcome! Explore Our App with new features</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Quick Link</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Contact</h1>
          <ul>
            <li>
              <MdEmail /> bloggingapp.com.np
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-amber-600 text-white py-4 text-center">Copyright © {currYear} LetsLearn Pvt.Ltd.</div>
    </div>
  );
};

export default Footer;
