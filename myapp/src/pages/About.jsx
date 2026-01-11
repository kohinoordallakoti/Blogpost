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
    <div className="bg-amber-50 min-h-screen" >
      <h1 className="text-3xl font-bold my-5">About Our Blogging App</h1>
      <p>
        Welcome to our blogging app! Here, writers from around the world share their thoughts,
        experiences, and stories. Whether you are looking to read inspiring content or start your
        own blog, our platform is designed to make writing and sharing easy and enjoyable.
      </p>

      <h2 className="text-xl font-bold my-5">Photos from Our Community</h2>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Community ${index + 1}`}
            className ="w-100 h-100 rounded-lg object-cover"
          />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-5">What Our Users Say</h2>
      <div className="flex flex-col items-center m-6">
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="flex flex-col m-5">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <strong>{review.name}</strong>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;