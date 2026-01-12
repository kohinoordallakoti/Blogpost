import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-amber-100">
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to Our Blog
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Discover amazing stories, insights, and ideas from talented writers
          around the world.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => nav("/blog")}
            className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition"
          >
            Explore All Blogs
          </button>
          <button
            onClick={() => nav("/register")}
            className="px-6 py-3 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-100 transition"
          >
            Join Us Today
          </button>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Browse by Category
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Technology", "Lifestyle", "Education", "Travel"].map(
              (cat, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-xl text-center cursor-pointer hover:shadow-md hover:border-amber-600 transition"
                >
                  <h4 className="font-semibold text-gray-700">{cat}</h4>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
