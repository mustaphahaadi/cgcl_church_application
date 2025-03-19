import { motion } from "framer-motion";

const Events = () => {
  // Sample event data (replace with real data from your backend or API)
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "2025-10-15",
      time: "10:00 AM",
      location: "Main Sanctuary",
      description: "Join us for a powerful time of worship and teaching.",
      icon: "🛐",
    },
    {
      id: 2,
      title: "Youth Night",
      date: "2025-10-20",
      time: "7:00 PM",
      location: "Youth Hall",
      description:
        "A fun and engaging night for teens with games, music, and a message.",
      icon: "🎉",
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "2025-12-22",
      time: "9:00 AM",
      location: "Downtown Park",
      description:
        "Help us serve the community with food, clothing, and prayer.",
      icon: "🤝",
    },
  ];

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-600 tracking-tight"
        >
          Upcoming Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Explore the various events we have planned for our community.
        </motion.p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{event.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                  {event.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm font-medium">
                {formatDate(event.date)} at {event.time}
              </p>
              <p className="text-gray-600 text-sm font-medium mt-1">
                <span className="text-indigo-600">Location:</span>{" "}
                {event.location}
              </p>
              <p className="mt-3 text-gray-700 text-base">
                {event.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 w-full bg-indigo-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-indigo-700 transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Events;
