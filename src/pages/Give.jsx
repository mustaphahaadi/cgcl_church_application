import { useState } from "react";
import { motion } from "framer-motion";

const Give = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
    paymentMethod: "mtn-momo", // Default to MTN Mobile Money
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presetAmounts = [50, 100, 200, 500]; // Adjusted to Ghanaian Cedi (GHS) amounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresetAmount = (amount) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call for donation processing
      console.log("Donation submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Thank you for your generous donation!");
      setFormData({
        name: "",
        email: "",
        amount: "",
        message: "",
        paymentMethod: "mtn-momo",
      });
    } catch (error) {
      console.error("Donation error:", error);
      alert("There was an issue processing your donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-600 tracking-tight"
        >
          Give Online
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Your generosity helps us make a difference in our community.
        </motion.p>
      </header>

      {/* Ways to Give */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Ways to Give
        </motion.h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-indigo-600">📱</span> Mobile Money (MTN,
            Vodafone, AirtelTigo)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-600">💳</span> Online via Bank Card
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-600">⛪</span> In-Person during
            services
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-600">✉️</span> Mail a check to our
            church address
          </li>
        </ul>
      </section>

      {/* Donation Form */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Make a Donation
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 placeholder-transparent"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Donation Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Amount (GHS)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {presetAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  type="button"
                  onClick={() => handlePresetAmount(amount)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    formData.amount === amount.toString()
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  }`}
                >
                  GHS {amount}
                </motion.button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                step="1"
                className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 placeholder-transparent"
                placeholder="Custom Amount"
              />
              <label
                htmlFor="amount"
                className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
              >
                Custom Amount
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="relative">
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
            >
              <option value="mtn-momo">MTN Mobile Money</option>
              <option value="vodafone-cash">Vodafone Cash</option>
              <option value="airteltigo-money">AirtelTigo Money</option>
              <option value="ghanapay">GhanaPay</option>
              <option value="bank-card">Bank Card (Visa/Mastercard)</option>
            </select>
            <label
              htmlFor="paymentMethod"
              className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500"
            >
              Payment Method
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="peer w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 resize-none placeholder-transparent"
              placeholder="Message"
            />
            <label
              htmlFor="message"
              className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
            >
              Message (Optional)
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
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
                Processing...
              </>
            ) : (
              "Donate Now"
            )}
          </motion.button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Thank you for your support! Your contributions help us serve our
          community and spread the love of Christ.
        </motion.p>
      </footer>
    </div>
  );
};

export default Give;
