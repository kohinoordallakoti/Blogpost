import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineEdit } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import * as Yup from "yup";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });

  const [selectedId, setSelectedId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category/get");
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/category/delete/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  const editCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/category/get/${id}`);

      setInitialValues({
        name: res.data.category.name,
        description: res.data.category.description,
      });

      setSelectedId(id);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="bg-amber-50 h-full">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-x-hidden w-full">
      <div className="bg-white rounded-xl shadow p-6 m-4">
        <h2 className="text-xl font-semibold mb-4">All Categories</h2>

        <table className="w-full">
          <thead className="bg-linear-to-r from-amber-400 to-orange-500 text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b">
                <td className="p-2">{cat.name}</td>
                <td className="p-2">{cat.description}</td>
                <td className="p-2 text-center space-x-6">
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <button
                    onClick={() => editCategory(cat._id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <MdOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow p-6 m-4">
        <h2 className="text-xl font-semibold mb-4">{selectedId ? "Edit Category" : "Add Category"}</h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize 
          validationSchema={Yup.object({
            name: Yup.string().required("Category name is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (selectedId) {
                await axios.put(
                  `http://localhost:5000/category/update/${selectedId}`,
                  values
                );
              } else {
                await axios.post(
                  "http://localhost:5000/category/create",
                  values
                );
              }

              resetForm();
              setSelectedId(null);
              setInitialValues({ name: "", description: "" });
              fetchCategories();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                rows="4"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {selectedId ? <MdOutlineEdit /> : <MdAddCircleOutline />}
              {selectedId ? "Update Category" : "Add Category"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
</div>
  );
};

export default Categories;
