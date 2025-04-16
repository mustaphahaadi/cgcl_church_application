import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api,base_url } from "../utils/api";

const ShareTestimony = () => {
  const { isLoggedIn, userData } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "healing",
    content: "",
    image: null,
    video: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "healing", label: "Healing" },
    { id: "salvation", label: "Salvation" },
    { id: "provision", label: "Divine Provision" },
    { id: "deliverance", label: "Deliverance" },
    { id: "breakthrough", label: "Breakthrough" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Update name when userData data is available
  useEffect(() => {
    if (userData) {
      const displayName = userData.firstName && userData.lastName
        ? `${userData.firstName} ${userData.lastName}`
        : userData.username || "";
      
      setFormData(prev => ({
        ...prev,
        name: displayName
      }));
    }
  }, [userData]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // // Simulate API call to submit testimony
      console.log(formData)
      const response = await api.get(`${base_url}members/testimonies/`,formData)

      if(response.status === 201){  
        setPreviewImage(null);
        // alert("Testimony submitted successfully!");
        toast.success("Testimony submitted successfully!");
        navigate("/testimonies"); // Redirect to testimonies page
      }
      // Reset form

    } catch (error) {
      // console.error("Error submitting testimony:", error);
      // alert("Failed to submit testimony. Please try again.");
      console.error("Error:", error);
      toast.error("Failed to submit testimony");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      {!isLoggedIn ? (
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Please log in to share your testimony
          </h2>
          <p className="text-gray-600">Your testimony matters to our community.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Share Your Testimony
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Let others be blessed by your story
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Testimony Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter a title"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Testimony Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Your Testimony
              </label>
              <textarea
                name="content"
                rows={6}
                required
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Share your testimony here..."
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Upload Image (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-200"
                  />
                </div>
                {previewImage && (
                  <div className="relative group">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg ring-2 ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Video URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Video URL (Optional)
              </label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="https://example.com/your-video"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gradient-to-r from-blue-400 to-sky-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Share Testimony"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ShareTestimony;
