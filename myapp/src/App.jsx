import React from 'react'
import {Routes , Route} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoutes'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element = { <MainLayout/>}>
        <Route index element = {<Home/>}/>
        <Route path ="/blog" element = {<Blogs/>}/>
        <Route path ="/about" element ={<About/>}/>
        <Route path ="/contact" element = {<Contact/>}/>
        <Route path ="/register" element = { <Register/>}/>
        <Route path ="/login" element = {<Login/>}/>
        <Route element = {<PrivateRoute/>}>
        <Route path ="/dashboard" element = {<Dashboard/>}/>
        <Route path ="/admin/dashboard" element = {<Dashboard/>}/>
        <Route path ="/profile" element = { <Profile/>}/>
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App