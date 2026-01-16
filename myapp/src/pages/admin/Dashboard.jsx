import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-amber-600">Welcome Back! 👋</h1>
        <p className="text-gray-600 mb-6">Here's your blog overview for today</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-amber-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">4</div>
            <div>Total Blogs</div>
            <div className="text-sm">3 Published, 1 Drafts</div>
          </div>
          <div className="bg-pink-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">0</div>
            <div>Liked Blogs</div>
            <div className="text-sm">Across all your blogs</div>
          </div>
          <div className="bg-green-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">3</div>
            <div>Published</div>
            <div className="text-sm">Live on your website</div>
          </div>
          <div className="bg-orange-400 text-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold">1</div>
            <div>Drafts</div>
            <div className="text-sm">Waiting to be published</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-3">⚡ Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-amber-100 hover:bg-amber-200 p-6 rounded-xl shadow flex flex-col items-center gap-2">
            <span className="text-3xl">➕</span>
            Create Blog
          </button>
          <button className="bg-pink-100 hover:bg-pink-200 p-6 rounded-xl shadow flex flex-col items-center gap-2">
            <span className="text-3xl">📁</span>
            Manage Categories
          </button>
          <button className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow flex flex-col items-center gap-2">
            <span className="text-3xl">📄</span>
            All Blogs
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
