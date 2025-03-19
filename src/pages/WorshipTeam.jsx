import { motion } from "framer-motion";
import healingImage from "../assets/healing.jpeg";

const WorshipTeam = () => {
  const teamMembers = [
    {
      name: "Kwame Mensah",
      role: "Lead Vocalist",
      image: healingImage,
    },
    {
      name: "Abena Owusu",
      role: "Guitarist",
      image: healingImage,
    },
    {
      name: "Kofi Addo",
      role: "Pianist",
      image: healingImage,
    },
    {
      name: "Efua Nyarko",
      role: "Drummer",
      image: healingImage,
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
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-600 tracking-tight"
        >
          Worship Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Meet our dedicated worship team who leads us in praise and worship.
        </motion.p>
      </header>

      <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-semibold text-gray-800 mb-8 text-center"
        >
          Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-200 transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-indigo-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-indigo-600 text-sm font-medium mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-600 text-lg"
        >
          Join us in worship every Sunday!
        </motion.p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 inline-block bg-indigo-600 text-white rounded-lg py-2 px-6 font-semibold hover:bg-indigo-700 transition-colors duration-300"
        >
          Learn More
        </motion.a>
      </footer>
    </div>
  );
};

export default WorshipTeam;
