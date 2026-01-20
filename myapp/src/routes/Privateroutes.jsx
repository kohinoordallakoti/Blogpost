import PrivateRoute from "../components/PrivateRoutes";
import Profile from "../pages/Profile";
import LikedBlogs from "../pages/LikedBlogs";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Blogsadmin from "../pages/admin/Blogsadmin";
import Blogform from "../pages/admin/Blogform";
import Contactadmin from "../pages/admin/Contactadmin";
import MainLayout from "../layout/MainLayout";

const privateRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      // User private routes
      {
        element: <MainLayout />,
        children: [
            { path: "likedblogs", element: <LikedBlogs /> },
            { path: "profile", element: <Profile /> },
            ],
        },

      // Admin private routes
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "categories", element: <Categories /> },
          { path: "blogs", element: <Blogsadmin /> },
          { path: "blogform", element: <Blogform /> },
          { path: "profile", element: <Profile /> },
          { path: "contact", element: <Contactadmin /> },
        ],
      },
    ],
  },
];

export default privateRoutes;
