import React from 'react'
import {Routes , Route} from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import PrivateRoute from './components/PrivateRoutes'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'
import LikedBlogs from './pages/LikedBlogs'
import Categories from './pages/admin/Categories'
import Blogsadmin from './pages/admin/Blogsadmin'
import AdminLayout from './components/AdminLayout'
import Blogform from './pages/admin/Blogform'

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
        <Route path ="likedblogs" element = {<LikedBlogs/>}/>
        <Route path ="/profile" element = { <Profile/>}/>
        </Route>
        </Route>
        <Route path = "/admin" element = {<AdminLayout/>}>
        <Route path ="blogform" element = {<Blogform/>}/>
        <Route path = "dashboard" element = {<Dashboard/>}/>
        <Route path = "categories" element = { <Categories/>}/>
        <Route path ="blogs" element = {<Blogsadmin/>}/>
        </Route>
        
        
      </Routes>
    </div>
  )
}

export default App