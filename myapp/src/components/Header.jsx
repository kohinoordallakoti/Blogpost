import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <div className = "flex justify-between bg-amber-600 text-white text-lg p-5 ">
            <div className = "font-bold text-2xl">
                <h1>Blogging App</h1>
            </div>
            <div className = "flex items-center">
                <ul className = "flex gap-5">
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to = "/about">About</Link></li>
                    <li><Link to = "/contact">Contact</Link></li>
                </ul>
                <button className="mx-7 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Register Now</button>
            </div>
        </div>
    </div>
  )
}

export default Header