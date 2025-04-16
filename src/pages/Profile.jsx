import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {api, base_url} from "../utils/api";

const Profile = () => {
  const { user, setUser,userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userData?.first_name || "",
    middle_name: userData?.middle_name || "",
    last_name: userData?.last_name || "",
    date_of_birth: user?.date_of_birth || "",
    gender: userData?.gender || "",
    marital_Status: user?.marital_Status || "",
    house_address: user?.house_address || "",
    // nearestBusStop: user?.nearestBusStop || "",
    telephone: userData?.telephone || "",
    email: userData?.email || "",
    fellowship: user?.fellowship || "",
    born_again: user?.born_again || "",
    occupation: user?.occupation || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to update user data
      const response = await api.patch(`${base_url}profiles/`,{formData});

      setUser(prev => ({
        ...prev,
        ...formData
      }));
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  
  useEffect(() => {
    const handleOnload = async () => {
      try {
        const response = await api.get(`${base_url}profiles/`);
        if (response?.status !== 200) {
          throw new Error("Profile Error");
        }

        // Update user data in context
        setUser(response?.data);
        setFormData(response?.data); // Sync form data with fetched user data
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error(error?.response?.data?.error || "Failed to load profile");
      }
    };

    handleOnload();
  }, [isEditing]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">My Profile</h2>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-blue-600">
                {user?.first_name?.charAt(0) || userData?.username?.charAt(0) || "U"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Non-editable Fields */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Username</label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{userData?.username}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Fellowship</label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.fellowship || "Not assigned"}</p>
              </div>

              {/* Editable Fields */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={true}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Birthday</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Marital Status</label>
                <select
                  name="marital_Status"
                  value={formData.marital_Status}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">House Address</label>
                <textarea
                  name="house_address"
                  value={formData.house_address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none`}
                />
              </div>

              {/* <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Nearest Bus Stop</label>
                <input
                  type="text"
                  name="nearestBusStop"
                  value={formData.nearestBusStop}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                />
              </div> */}
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
