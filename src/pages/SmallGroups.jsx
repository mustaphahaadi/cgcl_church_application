"use client";

import { Clock, MapPin, Users } from "lucide-react";

const SmallGroups = () => {
  const smallGroups = [
    {
      name: "Young Adults",
      description:
        "A group for young adults to connect and grow in faith together through meaningful discussions and activities.",
      meetingTime: "Sundays at 5 PM",
      location: "Community Center Room A",
      color: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      name: "Women's Fellowship",
      description:
        "A supportive group for women to share experiences, discuss scripture, and grow together in a welcoming environment.",
      meetingTime: "Tuesdays at 6 PM",
      location: "Church Library",
      color: "text-purple-500",
      iconBg: "bg-purple-50",
    },
    {
      name: "Men's Group",
      description:
        "A group for men to discuss faith and life challenges, offering support and accountability in a casual setting.",
      meetingTime: "Wednesdays at 7 PM",
      location: "Church Basement",
      color: "text-green-500",
      iconBg: "bg-green-50",
    },
    {
      name: "Family Connect",
      description:
        "A group for families to engage in activities, discussions, and service projects that build connections and faith.",
      meetingTime: "Fridays at 6 PM",
      location: "Main Sanctuary",
      color: "text-orange-500",
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Small Groups</h1>
        <p className="text-gray-600 text-lg">
          Join a small group to connect with others and grow in your faith
          through meaningful relationships and conversations.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {smallGroups.map((group, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className={`flex items-center gap-2 mb-4`}>
              <div className={`${group.iconBg} p-1.5 rounded-md`}>
                <Users className={`h-4 w-4 ${group.color}`} />
              </div>
              <span className={`text-sm font-medium ${group.color}`}>
                {group.name}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{group.description}</p>

            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{group.meetingTime}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{group.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallGroups;
