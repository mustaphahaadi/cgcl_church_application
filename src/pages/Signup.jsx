import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {base_url} from "../utils/api.js"
// import { resetClipboardStubOnView } from "@testing-library/user-event/dist/cjs/utils/index.js";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  
  const { setUser, setIsLoggedIn, setUserData } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    telephone: "",
    country_code: "+233",
    email: "",
    gender: "",
  });
  const [error, setErrors] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    telephone: "",
    country_code: "+233",
    email: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}auth/register/`,formData);
      console.log(response)
      if (response.status === 201) {
        const userData = await response.data;
        // Store all user data in context
        setUser(userData);
        
        // setIsLoggedIn(true);

        // Store in localStorage for persistence
        // localStorage.setItem("user", JSON.stringify(userData));
        

        toast.success("Signup successful!");
        navigate("/login");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setErrors(error.response?.data);
      toast.error("Failed to sign up");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight">
            CITY OF LIGHT GLOBAL CHURCH
          </h1>
          <h2 className="text-2xl text-gray-700 mt-4 font-semibold">
            FIRST {"TIMER'S"} FORM
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Please fill the appropriate information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white rounded-xl shadow-lg p-8"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  autoComplete="given-name"
                />
                <p className="text-sm font-medium text-red-700 mt-1">
                  {error.first_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  autoComplete="additional-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  autoComplete="family-name"
                />
                <p className="text-sm font-medium text-red-700 mt-1">
                  {error.last_name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  autoComplete="username"
                />
                <p className="block text-sm font-medium text-red-700">
                  {error.username}
              </p>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  autoComplete="email"
                />
                <p className="block text-sm font-medium text-red-700">
                  {error.email}
              </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  autoComplete="new-password"
                />
                <p className="block text-sm font-medium text-red-700">
                  {error.password}
              </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <select
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                    className="mt-1 block w-24 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="+233">+233</option>
                  </select>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-r-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    autoComplete="tel"
                  />
                  <p className="block text-sm font-medium text-red-700">
                  {error.telephone}
              </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-105"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

