import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
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