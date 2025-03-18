import { useState } from "react";
import { motion } from "framer-motion";

// Assuming you have a user object with firstName and lastName
const user = {
  firstName: "John",
  lastName: "Doe",
};

const ShareTestimony = () => {
  const [formData, setFormData] = useState({
    name: `${user.firstName} ${user.lastName}`, // Set default name
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
      // Here you would typically send the data to your backend
      console.log("Submitting testimony:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form after successful submission
      setFormData({
        name: `${user.firstName} ${user.lastName}`,
        title: "",
        category: "healing",
        content: "",
        image: null,
        videoUrl: "",
      });
      setPreviewImage(null);

      // Show success message
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
          className="bg-white rounded-xl shadow-md overflow-hidden p-8"
        >

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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/your-video"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-colors duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Testimony"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShareTestimony;
