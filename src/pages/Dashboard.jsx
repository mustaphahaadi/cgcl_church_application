import { useState } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaPray,
  FaHandsHelping,
  FaVideo,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats] = useState({
    totalMembers: 450,
    weeklyAttendance: 380,
    smallGroups: 12,
    monthlyDonations: 25000,
    newMembers: 15,
    volunteersNeeded: 8,
    activeVolunteers: 45,
    prayerRequests: 23,
  });

  const [prayerRequests] = useState([
    {
      id: 1,
      request: "Healing for Sarah's mother",
      status: "Active",
      date: "2024-03-24",
    },
    {
      id: 2,
      request: "John's job search",
      status: "Active",
      date: "2024-03-23",
    },
    {
      id: 3,
      request: "Mission trip funding",
      status: "Answered",
      date: "2024-03-22",
    },
  ]);

  const [recentSermons] = useState([
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor James",
      date: "2024-03-24",
      views: 245,
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: "Pastor Sarah",
      date: "2024-03-17",
      views: 189,
    },
  ]);

  const [volunteerNeeds] = useState([
    { id: 1, role: "Children's Ministry", slots: 3, urgency: "High" },
    { id: 2, role: "Welcome Team", slots: 2, urgency: "Medium" },
    { id: 3, role: "Tech Team", slots: 1, urgency: "Low" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header section remains the same */}

        {/* Stats Grid - Enhanced with new metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Active Members
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalMembers}
                </p>
                <p className="text-green-500 text-sm mt-2">
                  +{stats.newMembers} new
                </p>
              </div>
              <FaUsers className="text-blue-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Prayer Requests
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.prayerRequests}
                </p>
                <p className="text-green-500 text-sm mt-2">12 answered</p>
              </div>
              <FaPray className="text-green-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Volunteers
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.activeVolunteers}
                </p>
                <p className="text-purple-500 text-sm mt-2">
                  {stats.volunteersNeeded} needed
                </p>
              </div>
              <FaHandsHelping className="text-purple-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">
                  Monthly Giving
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  ${stats.monthlyDonations}
                </p>
                <p className="text-yellow-500 text-sm mt-2">
                  +5% from last month
                </p>
              </div>
              <FaDollarSign className="text-yellow-500 text-3xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prayer Requests Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Prayer Requests
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {prayerRequests.map((prayer) => (
                <div
                  key={prayer.id}
                  className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg"
                >
                  <p className="text-gray-800">{prayer.request}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">{prayer.date}</span>
                    <span
                      className={`text-sm ${
                        prayer.status === "Answered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {prayer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sermons Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Sermons
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentSermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="flex items-center space-x-4 border-b border-gray-100 pb-4"
                >
                  <div className="bg-gray-100 p-3 rounded-full">
                    <FaVideo className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-medium">
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {sermon.speaker} • {sermon.date}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {sermon.views} views
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Needs Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Volunteer Needs
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Sign Up
              </button>
            </div>
            <div className="space-y-4">
              {volunteerNeeds.map((need) => (
                <div
                  key={need.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-800 font-medium">{need.role}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        need.urgency === "High"
                          ? "bg-red-100 text-red-800"
                          : need.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {need.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {need.slots} positions available
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
