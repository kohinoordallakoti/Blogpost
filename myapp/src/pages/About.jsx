import React from "react";

const About = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      text: "This blogging app is amazing! Easy to use and beautifully designed.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob Smith",
      text: "I love sharing my thoughts here. The community is very supportive!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Cathy Lee",
      text: "Great platform for writers and readers alike. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const photos = [
    "./writing.jpg",
    "./blog.png",
    "./community.avif",
  ];

  return (
    <div className="bg-amber-50 min-h-screen p-6">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-amber-700 text-center my-8 drop-shadow-md">
        About Our Blogging App
      </h1>

      <p className="max-w-3xl mx-auto text-amber-800 text-lg text-center mb-12">
        Welcome to our blogging app! Here, writers from around the world share their thoughts,
        experiences, and stories. Whether you are looking to read inspiring content or start your
        own blog, our platform is designed to make writing and sharing easy and enjoyable.
      </p>

      {/* Photo Gallery */}
      <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">Photos from Our Community</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            <img
              src={photo}
              alt={`Community ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>

      {/* User Reviews */}
      <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-6 md:space-y-0">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 max-w-sm hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-amber-500"
            />
            <strong className="text-amber-700 text-lg mb-2">{review.name}</strong>
            <p className="text-amber-800">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16">
        <p className="text-amber-700 text-lg mb-4">
          Ready to share your story? Join our community today!
        </p>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-amber-700 hover:scale-105 transition transform">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;