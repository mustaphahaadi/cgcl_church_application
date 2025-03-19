import { motion } from "framer-motion";

const Outreach = () => {
  // Sample outreach data (replace with real data from your backend or API)
  const outreachPrograms = [
    {
      id: 1,
      title: "Food Drive",
      date: "Every Saturday",
      time: "9:00 AM - 12:00 PM",
      location: "Church Parking Lot",
      description:
        "We collect and distribute food to families in need within our community.",
      icon: "🍲",
      image: "https://via.placeholder.com/400x300?text=Food+Drive", // Placeholder image
    },
    {
      id: 2,
      title: "Clothing Donation",
      date: "First Sunday of Each Month",
      time: "1:00 PM - 3:00 PM",
      location: "Fellowship Hall",
      description:
        "Providing gently used clothing to support those facing hardship.",
      icon: "👕",
      image: "https://via.placeholder.com/400x300?text=Clothing+Donation",
    },
    {
      id: 3,
      title: "Community Clean-Up",
      date: "October 25, 2025",
      time: "8:00 AM - 11:00 AM",
      location: "Downtown Park",
      description: "Join us to beautify our community and foster local pride.",
      icon: "🌳",
      image: "https://via.placeholder.com/400x300?text=Community+Clean-Up",
    },
    {
      id: 4,
      title: "Prayer Outreach",
      date: "Every Wednesday",
      time: "6:00 PM - 7:00 PM",
      location: "Various Neighborhoods",
      description:
        "Walking our streets, offering prayer and support to residents.",
      icon: "🙏",
      image: "https://via.placeholder.com/400x300?text=Prayer+Outreach",
    },
  ];

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
          className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight"
        >
          Outreach Programs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Extending God’s love through service and support to our community.
        </motion.p>
      </header>

      {/* Outreach Listings */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {outreachPrograms.map((program) => (
          <motion.div
            key={program.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{program.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                  {program.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm font-medium">
                <span className="text-blue-600">When:</span> {program.date} at{" "}
                {program.time}
              </p>
              <p className="text-gray-600 text-sm font-medium mt-1">
                <span className="text-blue-600">Where:</span> {program.location}
              </p>
              <p className="mt-3 text-gray-700 text-base">
                {program.description}
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 block w-full bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold text-center hover:bg-blue-800 transition-colors duration-300"
              >
                Get Involved
              </motion.a>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Outreach;
