import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Filter, Search, ChevronDown, ChevronRight, Bell } from "lucide-react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [remindMeEvents, setRemindMeEvents] = useState([]);

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
      category: "worship",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
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
      category: "youth",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
      category: "outreach",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      title: "Bible Study Group",
      date: "2025-10-18",
      time: "6:30 PM",
      location: "Fellowship Hall",
      description: "Deep dive into scripture with group discussion and prayer.",
      icon: "📖",
      category: "study",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      title: "Prayer Breakfast",
      date: "2025-11-05",
      time: "8:00 AM",
      location: "Church Cafeteria",
      description: "Start your day with prayer and fellowship over breakfast.",
      icon: "🙏",
      category: "prayer",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "Worship Night",
      date: "2025-11-15",
      time: "7:00 PM",
      location: "Main Sanctuary",
      description: "A night dedicated to praise and worship.",
      icon: "🎵",
      category: "worship",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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

  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Toggle reminder for an event
  const toggleReminder = (eventId) => {
    if (remindMeEvents.includes(eventId)) {
      setRemindMeEvents(remindMeEvents.filter(id => id !== eventId));
    } else {
      setRemindMeEvents([...remindMeEvents, eventId]);
    }
  };

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Events" },
    { id: "worship", name: "Worship" },
    { id: "youth", name: "Youth" },
    { id: "outreach", name: "Outreach" },
    { id: "study", name: "Bible Study" },
    { id: "prayer", name: "Prayer" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-12 px-6">
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight"
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

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
              <ChevronDown className={`h-5 w-5 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setCategoryFilter(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      categoryFilter === category.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Featured Event (first event) */}
      {filteredEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={filteredEvents[0].image} 
                  alt={filteredEvents[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{filteredEvents[0].icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {filteredEvents[0].title}
                  </h2>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>{formatDate(filteredEvents[0].date)}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>{filteredEvents[0].time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>{filteredEvents[0].location}</span>
                </div>
                <p className="text-gray-700 mb-6">
                  {filteredEvents[0].description}
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-indigo-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-1" />
                    Learn More
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleReminder(filteredEvents[0].id)}
                    className={`px-4 py-2 rounded-lg font-semibold border flex items-center justify-center ${
                      remindMeEvents.includes(filteredEvents[0].id)
                        ? 'bg-green-100 text-green-700 border-green-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Bell className="h-5 w-5 mr-1" />
                    {remindMeEvents.includes(filteredEvents[0].id) ? 'Reminded' : 'Remind Me'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Event Cards */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Events</h2>
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(1).map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{event.icon}</span>
                    <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                      {event.title}
                    </h2>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-indigo-600 text-white rounded-lg py-2 px-3 text-sm font-semibold hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Learn More
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleReminder(event.id)}
                      className={`p-2 rounded-lg border ${
                        remindMeEvents.includes(event.id)
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <Bell className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Calendar Integration CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-6xl mx-auto mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="md:flex items-center">
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Never Miss an Event
            </h2>
            <p className="text-indigo-100 mb-6">
              Subscribe to our church calendar and get all events directly on your phone or computer.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                Google Calendar
              </button>
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                Apple Calendar
              </button>
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                Outlook
              </button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3 p-8">
            <Calendar className="w-full h-auto text-white opacity-20" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Events;
