import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { base_url } from "../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${base_url}auth/password-reset/`, {
        email,
      });
      
      if (response.status === 200) {
        toast.success("Password reset instructions sent to your email!");
        setEmail("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to send password reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-xl p-8"
      >
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
            Forgot Password
          </h1>
          <p className="mt-2 text-gray-600">
            Enter your email to reset your password
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-transparent"
              placeholder="Email"
            />
            <label className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm">
              Email Address
            </label>
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
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;