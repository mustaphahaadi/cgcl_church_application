import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, message, phone, subject } = formData;

    // Validate inputs
    if (!name || !email || !message || !phone || !subject) {
      setStatusMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: "info", text: "Sending your message..." });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatusMessage({
        type: "success",
        text: "Thank you for contacting us! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "", phone: "", subject: "" });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-to-r from-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="bg-gray-800 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6"> Connect</h1>
          <p className="text-lg mb-4">📧 contact@gclchurch.com</p>
          <p className="text-lg mb-4">📞 +123 456 789</p>
          <p className="text-lg mb-6">📍 Otumfuo Street, Kumasi</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition duration-300"
              >
                <i className="fab fa-facebook text-3xl"></i>
              </a>
              <a
                href="#"
                className="text-blue-300 hover:text-blue-200 transition duration-300"
              >
                <i className="fab fa-twitter text-3xl"></i>
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-400 transition duration-300"
              >
                <i className="fab fa-instagram text-3xl"></i>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 transition duration-300"
              >
                <i className="fab fa-linkedin text-3xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Your Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Your Email
              </label>
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Phone
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder=" "
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Subject
              </label>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer resize-none min-h-[120px]"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
              >
                Your Message
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
            {statusMessage && (
              <div
                className={`mt-4 p-3 rounded-lg text-center ${
                  statusMessage.type === "error"
                    ? "bg-red-100 text-red-700"
                    : statusMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
