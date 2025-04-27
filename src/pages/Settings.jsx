import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { base_url } from "../utils/api";

const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${base_url}auth/change-password/`,
        {
          old_password: formData.currentPassword,
          new_password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
              Settings
            </h1>
            <p className="mt-2 text-gray-600">Manage your account settings</p>
          </header>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Username:</span> {user?.username}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;