import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Blogs from "../pages/Blogs";
import MainLayout from "../layout/MainLayout";

const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <Blogs /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
];

export default publicRoutes;