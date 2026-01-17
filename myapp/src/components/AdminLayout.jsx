import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const AdminLayout = () => {
    const [open, setOpen] = useState(true);
  return (
        <div className="flex min-h-screen">
            <div className="fixed top-0 left-0 z-10">
            <Sidebar open={open} setOpen={setOpen}/>
            </div>
        <main className={`flex-1 overflow-hidden bg-slate-50 p-4 transition-all duration-500
          ${open ? "ml-60" : "ml-16"}`}>
        <Outlet/>
      </main>
      </div>
  )
}

export default AdminLayout