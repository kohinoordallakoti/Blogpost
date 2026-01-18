import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const handleBack = () => {
        if(user.role === "admin"){
            navigate("/admin/dashboard");
        }
        else {
            navigate("/blog");
        }
    }

  return (
    <div className="bg-amber-50 flex flex-col justify-center items-center text-amber-600">
        <div className="w-full">
            <button onClick={() => handleBack()} className="m-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Back</button>
        </div>
    <div className="w-2/3 md:1/2 grid grid-cols-1 gap-4 m-5 p-5 bg-white shadow-xl rounded-xl">
        
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold m-5">Profile</h1>
            <FaUser className="w-25 h-25 fill-amber-500"/>
        </div>
        <div className="w-100">
            <h1 className="text-2xl font-bold m-5">Name: {user.name}</h1>
            <h1 className="text-xl font-bold mx-5">Email: {user.email}</h1>
            <h1 className="text-xl font-bold mx-5">Role: {user.role}</h1>
        </div>
    </div>
    </div>
  )
}

export default Profile