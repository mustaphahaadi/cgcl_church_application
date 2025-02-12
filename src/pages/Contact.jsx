import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message, phone, subject } = formData;

    // Validate inputs
    if (!name || !email || !message || !phone || !subject) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "", phone: "", subject: "" });
  };

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg my-10">
      <div className="flex-1 p-5">
        <h1 className="text-4xl font-bold mb-4">
          Lets Pray and Preach the word of God
        </h1>
        <p className="mb-3">📧 contact@gclchurch.com</p>
        <p className="mb-3">📞 +123 456 789</p>
        <p className="mb-3">📍 Otumfuo Street, Kumasi</p>
      </div>
      <div className="flex-1 bg-white text-gray-800 rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="name">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="message">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 resize-none min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-1 px-3 hover:bg-gray-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
