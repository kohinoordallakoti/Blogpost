import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Header/>
        <main className = "min-h-screen">
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout