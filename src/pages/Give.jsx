import { useState } from "react";

const Give = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation logic here (e.g., API call)
    console.log("Donation submitted:", formData);
    alert("Thank you for your generous donation!");
    setFormData({ name: "", email: "", amount: "", message: "" });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Give Online</h1>
        <p className="mt-2 text-lg text-gray-700">
          Your generosity helps us make a difference in our community.
        </p>
      </header>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Ways to Give
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Online Donations</li>
          <li>Text-to-Give: Text {"GIVE"} to 12345</li>
          <li>In-Person during services</li>
          <li>Mail a check to our church address</li>
        </ul>
      </section>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Make a Donation
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="amount"
            >
              Donation Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="message"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Donate Now
          </button>
        </form>
      </section>
      <footer className="text-center mt-8">
        <p className="text-gray-600">
          Thank you for your support! Your contributions help us serve our
          community and spread the love of Christ.
        </p>
      </footer>
    </div>
  );
};

export default Give;
