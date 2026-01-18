import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Contactadmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/contact/get");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await axios.delete(`http://localhost:5000/contact/delete/${id}`);
      setContacts(contacts.filter((c) => c._id !== id)); 
    } catch (error) {
      console.log(error);
      alert("Failed to delete contact.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-3xl font-bold text-amber-700 mb-6 text-center">
        All Contacts
      </h1>

      {loading ? (
        <p className="text-amber-600 text-center">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-red-600 text-center font-semibold">No contacts found</p>
      ) : (
        <div className="flex flex-col gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-xl transition"
            >

              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                <div>
                  <h2 className="font-semibold text-amber-700 text-lg">{contact.name}</h2>
                  <p className="text-amber-600">{contact.email}</p>
                </div>
                <p className="mt-3 md:mt-0 text-amber-700">{contact.message}</p>
              </div>

              <button
                onClick={() => handleDelete(contact._id)}
                className="mt-4 md:mt-0 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contactadmin;
