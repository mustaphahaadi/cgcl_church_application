import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const MemberFellowship = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedFellowship: "",
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-600">
          Please log in to access this page.
        </h2>
      </div>
    );
  }

  const fellowships = [
    {
      id: 1,
      name: "Young Adults Fellowship",
      description: "A group for young adults to connect and grow in faith.",
      meetingTime: "Sundays at 5 PM",
      location: "Community Center Room A",
    },
    {
      id: 2,
      name: "Women's Fellowship",
      description:
        "A supportive group for women to share experiences and grow together.",
      meetingTime: "Tuesdays at 6 PM",
      location: "Church Library",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully joined the fellowship!", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "", selectedFellowship: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight"
        >
          Member Fellowship
        </motion.h1>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {fellowships.map((fellowship) => (
          <motion.div
            key={fellowship.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {fellowship.name}
            </h2>
            <p className="text-gray-600">{fellowship.description}</p>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">When:</span> {fellowship.meetingTime}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Where:</span> {fellowship.location}
            </p>
          </motion.div>
        ))}
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-16 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Join a Fellowship
        </h3>
        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="selectedFellowship"
            >
              Select Fellowship
            </label>
            <select
              id="selectedFellowship"
              name="selectedFellowship"
              value={formData.selectedFellowship}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
            >
              <option value="">Select a fellowship</option>
              {fellowships.map((fellowship) => (
                <option key={fellowship.id} value={fellowship.name}>
                  {fellowship.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Join Fellowship
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MemberFellowship;
