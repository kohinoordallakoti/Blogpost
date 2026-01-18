import React from "react";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";

const Home = () => {
  const [category, setCategory] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/get")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-amber-100 ">
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6">
          Welcome to Our Blog
        </h2>
        <p className="text-amber-800 max-w-2xl mx-auto mb-10">
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
          <h3 className="text-2xl font-bold text-amber-700 text-center mb-8">
            Browse by Category
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {category.map((item) => (
              <div
                key={item.id}
                className="border-amber-700 border flex flex-col items-center justify-center gap-4 shadow-md p-6 rounded-lg hover:bg-amber-100 transition cursor-pointer"
              >
                <h4 className="text-lg font-semibold text-amber-700">
                  {item.name}
                </h4>
                <h4 className="text-lg font-light text-amber-800">
                  {item.description}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
