import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="m-5 bg-amber-50 flex items-center justify-center px-4">
      <div className="max-w-3xl md:w-1/2 lg:w-1/3 bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">
          Login
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
            nav("/dashboard");
          }}
        >
          {({ touched }) => (
          <Form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 text-lg"
              >
                Login
              </button>
            </div>
            {Object.keys(touched).length === 0 && (
            <div className="flex justify-center">
              <h1>Don't have an account?  
                <button type="button" className="mx-1 text-amber-500 hover:text-blue-400 " onClick={() => nav('/register')}> Signup</button>
              </h1>
                            
            </div>
            )}
          </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;