import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import BlogPage from "./pages/BlogPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./auth/Contact";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./admin/AdminLayout";

import Admin from "./admin/screens/Admin";
import Comments from "./admin/screens/Comments";
import ManagePosts from "./admin/screens/ManagePosts";
import EditPost from "./admin/screens/EditPost";
import Users from "./admin/screens/Users";
import Categories from "./admin/screens/Categories";
import EditCategories from "./admin/screens/EditCategories";

function App() {

  return (
    <div className="App">
     <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticleDetailPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="comments" element={<Comments />} />
              <Route path="users" element={<Users />} />
              <Route path="posts/manage" element={<ManagePosts />} />
              <Route path="posts/edit/manage/:slug" element={<EditPost />} />
              <Route path="categories/manage" element={<Categories />} />
              <Route path="categories/edit/manage/:slug" element={<EditCategories />} />
            </Route>
   
     </Routes>
     <Toaster />
  </div>
  )
}
export default App
