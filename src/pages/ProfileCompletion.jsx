import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import api, { base_url } from "../utils/api";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user?.gender === "female"
      ? "/default-female-avatar.svg"
      : "/default-male-avatar.svg"
  );

  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split("T")[0],
    dateOfBirth: "",
    houseAddress: "",
    digitalAddress: "",
    occupation: "",
    fellowship: "",
    churchInformation: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }
      
      const response = await createProfile()
      console.log(response)
      if (response.ok) {
        const updateduser = await response.json();
        setUser(updateduser);
        toast.success("Profile completed successfully!");
        navigate("/dashboard");
      } else {
        throw new Error("Failed to complete profile");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while completing profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-600">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">Please provide the following information to complete your profile</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-8 bg-white rounded-xl shadow-lg p-8"
        >
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">Upload profile picture (optional)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visit Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Visit Date</label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                readOnly
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* House Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                House Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="houseAddress"
                value={formData.houseAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Digital Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Digital Address</label>
              <input
                type="text"
                name="digitalAddress"
                value={formData.digitalAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Fellowship */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fellowship <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fellowship"
                value={formData.fellowship}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                // required
              />
            </div>

            {/* Church Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Church Information <span className="text-red-500">*</span>
              </label>
              <textarea
                name="churchInformation"
                value={formData.churchInformation}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`px-8 py-3 text-white font-semibold rounded-lg shadow-md ${isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {isLoading ? "Saving..." : "Complete Profile"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ProfileCompletion;