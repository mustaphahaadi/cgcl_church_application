// import React from 'react';
import {
  Church,
  Users,
  HeartHandshake,
  BookOpen,
  HelpingHand as PrayingHands,
  Smile as Family,
} from "lucide-react";

const ministriesList = [
  {
    title: "Worship Services",
    description:
      "Join us for uplifting worship every Sunday at 9:00 AM and 11:00 AM.",
    icon: Church,
    link: "/worship-services",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverColor: "hover:bg-purple-100",
  },
  {
    title: "Youth Ministry",
    description:
      "A vibrant community for our youth to grow in faith and friendship.",
    icon: Users,
    link: "/YouthMinistry",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverColor: "hover:bg-blue-100",
  },
  {
    title: "Community Outreach",
    description:
      "Engaging with our local community through service and support.",
    icon: HeartHandshake,
    link: "/community-outreach",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    hoverColor: "hover:bg-green-100",
  },
  {
    title: "Bible Study",
    description:
      "Deepen your understanding of the Word through weekly Bible studies.",
    icon: BookOpen,
    link: "/bible-study",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "Prayer Group",
    description:
      "Join us in prayer every Wednesday evening to lift each other up.",
    icon: PrayingHands,
    link: "/prayer-group",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverColor: "hover:bg-rose-100",
  },
  {
    title: "Family Events",
    description:
      "Fun and engaging events for families to connect and grow together.",
    icon: Family,
    link: "/family-events",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverColor: "hover:bg-teal-100",
  },
];

function Ministries() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Our</span>
                  <span className="block text-blue-600">Ministries</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Explore the various ministries we offer to help you grow in
                  faith and community. Each ministry is designed to nurture your
                  spiritual journey and create meaningful connections.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Ministries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ministriesList.map((ministry, index) => {
            const IconComponent = ministry.icon;
            return (
              <div
                key={index}
                className={`relative group rounded-xl shadow-sm overflow-hidden ${ministry.bgColor} ${ministry.hoverColor} transition-all duration-300 ease-in-out`}
              >
                <div className="p-8">
                  <div
                    className={`inline-block p-3 rounded-lg ${ministry.bgColor} ${ministry.iconColor}`}
                  >
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {ministry.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{ministry.description}</p>
                  <div className="mt-6">
                    <a
                      href={ministry.link}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                    >
                      Learn More
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
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ministries;
