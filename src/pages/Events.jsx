const Events = () => {
  // Sample event data (replace with real data from your backend or API)
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "October 15, 2025",
      time: "10:00 AM",
      location: "Main Sanctuary",
      description: "Join us for a powerful time of worship and teaching.",
      icon: "🛐",
    },
    {
      id: 2,
      title: "Youth Night",
      date: "October 20, 2025",
      time: "7:00 PM",
      location: "Youth Hall",
      description:
        "A fun and engaging night for teens with games, music, and a message.",
      icon: "🎉",
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "December 22, 2025",
      time: "9:00 AM",
      location: "Downtown Park",
      description:
        "Help us serve the community with food, clothing, and prayer.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Upcoming Events</h1>
        <p className="mt-2 text-lg text-gray-700">
          Explore the various events we have planned for our community.
        </p>
      </header>
      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl">{event.icon}</span>
              <h2 className="text-xl font-semibold text-gray-800 ml-2">
                {event.title}
              </h2>
            </div>
            <p className="text-gray-600">
              {event.date} at {event.time}
            </p>
            <p className="text-gray-600">Location: {event.location}</p>
            <p className="mt-2 text-gray-700">{event.description}</p>
            <button className="mt-4 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Events;
