import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import API from "../axios/axios.js";

const Contact = () => {
  // State for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Loading and feedback states
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await API.post("/contact/create", form);
      setFeedback({ type: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.log(error);
      setFeedback({ type: "error", message: "Failed to send message. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-700 mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-amber-600 mb-8 text-center">
          Have a question, feedback, or collaboration idea? We’d love to hear from you.
          Fill out the form below and we’ll get back to you soon.
        </p>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {feedback && (
          <p
            className={`mt-4 text-center font-semibold ${
              feedback.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback.message}
          </p>
        )}

      </div>
    </div>
  );
};

export default Contact;