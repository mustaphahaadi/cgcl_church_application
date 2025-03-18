// import React from "react";
// import PropTypes from "prop-types";
import { Calendar, Users, Mountain, GamepadIcon } from "lucide-react";

const activities = [
  {
    title: "Weekly Meetings",
    description: "Join us every Friday at 6 PM for fellowship and fun!",
    icon: Calendar,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Community Service",
    description: "Participate in our monthly community service projects.",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Retreats",
    description: "Annual retreats for spiritual growth and bonding.",
    icon: Mountain,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Game Nights",
    description: "Enjoy game nights every second Saturday of the month.",
    icon: GamepadIcon,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
];

function YouthMinistry() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Youth</span>
              <span className="block text-blue-600">Ministry</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A vibrant community where young people come together to grow in
              faith, build lasting friendships, and make a difference in the
              world.
            </p>
          </div>
        </div>
      </header>

      {/* Activities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Upcoming Activities
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join us for these exciting events and activities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={index}
                className={`relative group rounded-xl shadow-sm overflow-hidden ${activity.bgColor} transition-all duration-300 ease-in-out hover:shadow-lg`}
              >
                <div className="p-8">
                  <div
                    className={`inline-block p-3 rounded-lg ${activity.bgColor} ${activity.color}`}
                  >
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{activity.description}</p>
                  <div className="mt-6">
                    <button
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                    >
                      Sign Up
                      <svg
                        className="ml-2 -mr-1 h-4 w-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Questions? Contact our Youth Ministry team:
          </p>
          <div className="mt-4">
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default YouthMinistry;
