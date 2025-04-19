import { useState } from "react";
import api, {base_url} from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [emailError, setEmailError] = useState("");

  const MAX_MESSAGE_LENGTH = 500;

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailError(
        validateEmail(value) ? "" : "Please enter a valid email address."
      );
    }

    if (name === "phone") {
      // Auto-format phone number
      const formattedPhone = value
        .replace(/\D/g, "") // Remove non-digits
        .slice(0, 10) // Limit to 10 digits
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"); // Format as (123) 456-7890
      setFormData({ ...formData, [name]: formattedPhone });
    } else if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return; // Prevent typing beyond max length
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      phone: "",
      subject: "",
    });
    setEmailError("");
    setStatusMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, message, phone, subject } = formData;

    if (!name || !email || !message || !phone || !subject) {
      setStatusMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (!validateEmail(email)) {
      setStatusMessage({
        type: "error",
        text: "Please provide a valid email address.",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: "info", text: "Sending your message..." });

    try {
      const response = await api.post(`${base_url}api/contacts/`,JSON.stringify(formData));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setStatusMessage({
        type: "success",
        text: "Thank you for contacting us! We’ll respond soon.",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: "",
        subject: "",
      });
      setEmailError("");
      setTimeout(() => setStatusMessage(null), 5000); // Auto-dismiss success after 5s
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-6 animate-fade-in-down">
              Let’s Connect
            </h1>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-indigo-200">✉️</span>{" "}
                contact@gclchurch.com
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-200">📞</span> +123 456 789
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-200">📍</span> Otumfuo Street,
                Kumasi
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Stay Connected</h2>
            <div className="flex gap-6">
              {[
                { platform: "facebook", label: "Follow us on Facebook" },
                { platform: "twitter", label: "Follow us on Twitter" },
                { platform: "instagram", label: "Follow us on Instagram" },
                { platform: "linkedin", label: "Connect on LinkedIn" },
              ].map(({ platform, label }) => (
                <a
                  key={platform}
                  href="#"
                  className="text-2xl text-white hover:text-indigo-200 transition-colors duration-300 transform hover:scale-110 group relative"
                  aria-label={label}
                >
                  <i className={`fab fa-${platform}`}></i>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-gray-800 text-white px-2 py-1 rounded">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-up">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "phone", "subject"].map((field) => (
              <div key={field} className="relative group">
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-all duration-300 peer bg-gray-50 text-gray-700 placeholder-transparent ${
                    field === "email" && emailError
                      ? "border-red-500"
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                  placeholder={field}
                />
                <label
                  htmlFor={field}
                  className="absolute -top-2.5 left-3 text-sm bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 group-hover:text-indigo-500 text-gray-600"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "email" && emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
            ))}

            <div className="relative group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 peer bg-gray-50 text-gray-700 placeholder-transparent min-h-[140px] resize-none"
                placeholder="Your Message"
              />
              <label
                htmlFor="message"
                className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-focus:text-indigo-500 group-hover:text-indigo-500"
              >
                Your Message
              </label>
              <p className="text-gray-500 text-xs mt-1">
                {formData.message.length}/{MAX_MESSAGE_LENGTH}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Reset
              </button>
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-lg text-center font-medium transition-all duration-300 ${
                  statusMessage.type === "error"
                    ? "bg-red-100 text-red-800"
                    : statusMessage.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
