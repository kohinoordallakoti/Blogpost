import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <div className="flex min-h-screen">
        <Sidebar/>
        
        <main className="flex-1 p-4 overflow-auto">
        <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default AdminLayout