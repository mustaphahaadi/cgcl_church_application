import { motion } from "framer-motion";

const ServiceTimes = () => {
  // Sample service data (replace with real data from your backend or API)
  const services = [
    {
      id: 1,
      day: "Sunday",
      title: "Main Worship Service",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "A vibrant service with worship, teaching, and fellowship.",
      icon: "🛐",
    },
    {
      id: 2,
      day: "Sunday",
      title: "Evening Prayer",
      time: "6:00 PM - 7:00 PM",
      location: "Chapel",
      description: "A time of reflection, prayer, and communion.",
      icon: "🙏",
    },
    {
      id: 3,
      day: "Wednesday",
      title: "Midweek Bible Study",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      description: "Deep dive into scripture with group discussion.",
      icon: "📖",
    },
    {
      id: 4,
      day: "Friday",
      title: "Youth Service",
      time: "6:30 PM - 8:00 PM",
      location: "Youth Hall",
      description: "An engaging service for teens with music and a message.",
      icon: "🎉",
    },
  ];

  // Group services by day for better organization
  const groupedServices = services.reduce((acc, service) => {
    acc[service.day] = acc[service.day] || [];
    acc[service.day].push(service);
    return acc;
  }, {});

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
      {/* Header */}
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-600 tracking-tight"
        >
          Service Times
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Join us for worship, prayer, and community at CLGC Church.
        </motion.p>
      </header>

      {/* Service Listings */}
      <section className="max-w-6xl mx-auto">
        {Object.entries(groupedServices).map(([day, dayServices], index) => (
          <div key={day} className="mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2"
            >
              {day}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dayServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{service.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    <span className="text-indigo-600">Time:</span>{" "}
                    {service.time}
                  </p>
                  <p className="text-gray-600 text-sm font-medium mt-1">
                    <span className="text-indigo-600">Location:</span>{" "}
                    {service.location}
                  </p>
                  <p className="mt-3 text-gray-700 text-base">
                    {service.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 w-full bg-indigo-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServiceTimes;
