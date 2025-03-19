import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Assuming this component receives logged-in user data as a prop
const ShareTestimony = ({ loggedInUser }) => {
  // Default user data if no logged-in user is provided (for testing)
  const defaultUser = {
    firstName: "Kwame",
    lastName: "Adjei",
    username: "k.adjei",
  };

  // Use loggedInUser if provided, otherwise fall back to defaultUser
  const user = loggedInUser || defaultUser;

  // Initialize formData with the logged-in user's name
  const [formData, setFormData] = useState({
    name:
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username || "", // Fallback to username if firstName/lastName unavailable
    title: "",
    category: "healing",
    content: "",
    image: null,
    videoUrl: "",
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

  // Update formData.name if loggedInUser changes (e.g., after login)
  useEffect(() => {
    const userName =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username || "";
    setFormData((prev) => ({ ...prev, name: userName }));
  }, [loggedInUser, user.firstName, user.lastName, user.username]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to submit testimony
      console.log("Submitting testimony:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form after successful submission
      setFormData({
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username || "",
        title: "",
        category: "healing",
        content: "",
        image: null,
        videoUrl: "",
      });
      setPreviewImage(null);

      alert("Testimony submitted successfully!");
    } catch (error) {
      console.error("Error submitting testimony:", error);
      alert("Failed to submit testimony. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden p-8"
        >
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
            Share Your Testimony
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Testimony Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Enter a title"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Testimony Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Your Testimony
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                required
                value={formData.content}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Share your testimony here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image (Optional)
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Video URL Input */}
            <div>
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Video URL (Optional)
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                placeholder="https://example.com/your-video"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? (
                  <>
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
                    Submitting...
                  </>
                ) : (
                  "Submit Testimony"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Add PropTypes validation
ShareTestimony.propTypes = {
  loggedInUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired, // Validate that loggedInUser is an object with required fields
};

export default ShareTestimony;
