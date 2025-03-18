import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Clock, MapPin, Users, ChevronRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const MemberFellowship = () => {
  const fellowships = [
    {
      name: "Young Adults",
      description:
        "A group for young adults to connect and grow in faith together through meaningful discussions and activities.",
      meetingTime: "Sundays at 5 PM",
      location: "Community Center Room A",
      icon: Users,
    },
    {
      name: "Women's Fellowship",
      description:
        "A supportive group for women to share experiences, discuss scripture, and grow together in a welcoming environment.",
      meetingTime: "Tuesdays at 6 PM",
      location: "Church Library",
      icon: Users,
    },
    {
      name: "Men's Group",
      description:
        "A group for men to discuss faith and life challenges, offering support and accountability in a casual setting.",
      meetingTime: "Wednesdays at 7 PM",
      location: "Church Basement",
      icon: Users,
    },
    {
      name: "Family Connect",
      description:
        "A group for families to engage in activities, discussions, and service projects that build connections and faith.",
      meetingTime: "Fridays at 6 PM",
      location: "Main Sanctuary",
      icon: Users,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedFellowship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully joined the fellowship!", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "", selectedFellowship: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Member Fellowships
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Join a fellowship to connect with others and grow in your faith
            through meaningful relationships and conversations.
          </p>
        </header>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fellowships.map((fellowship, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
            >
              <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
                <fellowship.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {fellowship.name}
              </h3>
              <p className="text-gray-600 mb-4">{fellowship.description}</p>
              <div className="flex items-center gap-2 mb-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{fellowship.meetingTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{fellowship.location}</span>
              </div>
            </div>
          ))}
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-16 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Join a Fellowship
          </h3>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="selectedFellowship"
              >
                Select Fellowship
              </label>
              <select
                id="selectedFellowship"
                name="selectedFellowship"
                value={formData.selectedFellowship}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200"
              >
                <option value="">Select a fellowship</option>
                {fellowships.map((fellowship, index) => (
                  <option key={index} value={fellowship.name}>
                    {fellowship.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Join Fellowship
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberFellowship;
