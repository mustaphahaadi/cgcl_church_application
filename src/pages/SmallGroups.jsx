const SmallGroups = () => {
  const smallGroups = [
    {
      name: "Young Adults",
      description: "A group for young adults to connect and grow in faith.",
      meetingTime: "Sundays at 5 PM",
      location: "Community Center Room A",
    },
    {
      name: "Women's Fellowship",
      description: "A supportive group for women to share and grow together.",
      meetingTime: "Tuesdays at 6 PM",
      location: "Church Library",
    },
    {
      name: "Men's Group",
      description: "A group for men to discuss faith and life challenges.",
      meetingTime: "Wednesdays at 7 PM",
      location: "Church Basement",
    },
    {
      name: "Family Connect",
      description:
        "A group for families to engage in activities and discussions.",
      meetingTime: "Fridays at 6 PM",
      location: "Main Sanctuary",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Small Groups</h1>
        <p className="mt-2 text-lg text-gray-700">
          Join a small group to connect with others and grow in your faith.
        </p>
      </header>
      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {smallGroups.map((group, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {group.name}
            </h2>
            <p className="text-gray-600">{group.description}</p>
            <p className="text-gray-600 mt-2">
              Meeting Time: {group.meetingTime}
            </p>
            <p className="text-gray-600">Location: {group.location}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SmallGroups;
