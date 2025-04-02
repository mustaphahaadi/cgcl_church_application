import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, ChevronRight, Bell, Share2, Info, Users, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const ServiceTimes = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [remindMeServices, setRemindMeServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      color: "bg-blue-600",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
      pastor: "Pastor John Smith",
      nextDate: "October 15, 2023",
      attendees: 250,
      childcare: true,
      translation: ["Spanish", "French"],
      livestream: true,
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
      id: 2,
      day: "Sunday",
      title: "Evening Prayer",
      time: "6:00 PM - 7:00 PM",
      location: "Chapel",
      description: "A time of reflection, prayer, and communion.",
      icon: "🙏",
      color: "bg-purple-600",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
      pastor: "Pastor Sarah Williams",
      nextDate: "October 15, 2023",
      attendees: 75,
      childcare: false,
      translation: [],
      livestream: false,
      image: "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
    },
    {
      id: 3,
      day: "Wednesday",
      title: "Midweek Bible Study",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      description: "Deep dive into scripture with group discussion.",
      icon: "📖",
      color: "bg-green-600",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
      pastor: "Pastor Michael Johnson",
      nextDate: "October 18, 2023",
      attendees: 120,
      childcare: true,
      translation: ["Spanish"],
      livestream: true,
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      day: "Friday",
      title: "Youth Service",
      time: "6:30 PM - 8:00 PM",
      location: "Youth Hall",
      description: "An engaging service for teens with music and a message.",
      icon: "🎉",
      color: "bg-orange-600",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600",
      pastor: "Youth Pastor Alex Chen",
      nextDate: "October 20, 2023",
      attendees: 85,
      childcare: false,
      translation: [],
      livestream: true,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      day: "Saturday",
      title: "Prayer Breakfast",
      time: "8:00 AM - 9:30 AM",
      location: "Church Cafeteria",
      description: "Start your weekend with prayer and fellowship over breakfast.",
      icon: "🍳",
      color: "bg-red-600",
      lightColor: "bg-red-100",
      textColor: "text-red-600",
      pastor: "Elder David Thompson",
      nextDate: "October 21, 2023",
      attendees: 60,
      childcare: false,
      translation: [],
      livestream: false,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
  ];

  // Group services by day for better organization
  const groupedServices = services.reduce((acc, service) => {
    acc[service.day] = acc[service.day] || [];
    acc[service.day].push(service);
    return acc;
  }, {});

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Load reminders from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('serviceReminders');
    if (savedReminders) {
      setRemindMeServices(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('serviceReminders', JSON.stringify(remindMeServices));
  }, [remindMeServices]);

  // Filter services based on active tab
  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.day.toLowerCase() === activeTab.toLowerCase());

  // Toggle reminder for a service
  const toggleReminder = (serviceId) => {
    if (remindMeServices.includes(serviceId)) {
      setRemindMeServices(remindMeServices.filter(id => id !== serviceId));
      toast.info("Reminder removed");
    } else {
      setRemindMeServices([...remindMeServices, serviceId]);
      toast.success("Reminder set for this service");
    }
  };

  // Open modal with service details
  const openServiceDetails = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Days of the week for tabs
  const days = [
    { id: "all", label: "All Services" },
    { id: "sunday", label: "Sunday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
  ];

  // Add to calendar function
  const addToCalendar = (service) => {
    const eventTitle = `Church Service: ${service.title}`;
    const eventDetails = `${service.description} at ${service.location}`;
    
    // Create Google Calendar URL (this is a simplified example)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=20231015T100000Z/20231015T120000Z&location=${encodeURIComponent(service.location)}`;
    
    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
    toast.success("Opening calendar...");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Service Times
        </h1>
        <p className="text-gray-600 text-lg">
          Join us for worship, prayer, and community at CLGC Church. We offer various services throughout the week.
        </p>
      </motion.header>

      {/* Featured Service (First Sunday Service) */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={services[0].image} 
                  alt={services[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{services[0].icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {services[0].title}
                  </h2>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{services[0].day}s</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{services[0].time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{services[0].location}</span>
                </div>
                <p className="text-gray-700 mb-6">
                  {services[0].description}
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openServiceDetails(services[0])}
                    className="flex-1 bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Info className="h-5 w-5 mr-1" />
                    Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleReminder(services[0].id)}
                    className={`px-4 py-2 rounded-lg font-semibold border flex items-center justify-center ${
                      remindMeServices.includes(services[0].id)
                        ? 'bg-green-100 text-green-700 border-green-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Bell className="h-5 w-5 mr-1" />
                    {remindMeServices.includes(services[0].id) ? 'Reminded' : 'Remind Me'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Day Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
          <div className="flex space-x-2">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setActiveTab(day.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === day.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading ? (
        <div className="max-w-6xl mx-auto flex justify-center items-center py-20">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Service Listings */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {activeTab === "all" ? (
              // Group by day when showing all services
              Object.entries(groupedServices).map(([day, dayServices], index) => (
                <div key={day} className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2 flex items-center"
                  >
                    <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                    {day}
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dayServices.map((service) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        remindMeServices={remindMeServices}
                        toggleReminder={toggleReminder}
                        openServiceDetails={openServiceDetails}
                        itemVariants={itemVariants}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show flat list when filtered by day
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    remindMeServices={remindMeServices}
                    toggleReminder={toggleReminder}
                    openServiceDetails={openServiceDetails}
                    itemVariants={itemVariants}
                  />
                ))}
              </div>
            )}
          </motion.section>

          {/* Special Services CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-6xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="md:flex items-center">
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Special Holiday Services
                </h2>
                <p className="text-blue-100 mb-6">
                  Join us for special services during holidays and important church events. Check our calendar for upcoming special services.
                </p>
                <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center">
                  View Calendar
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
              <div className="hidden md:block md:w-1/3 p-8">
                <Calendar className="w-full h-auto text-white opacity-20" />
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Service Details Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${selectedService.lightColor} mb-2`}>
                  <span className={`text-sm font-medium ${selectedService.textColor}`}>
                    {selectedService.day}
                  </span>
                </div>
                <h2 className="text-white text-2xl font-bold">{selectedService.title}</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>{selectedService.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{selectedService.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>~{selectedService.attendees} attendees</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Service</h3>
              <p className="text-gray-600 mb-6">{selectedService.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Led By</h3>
              <p className="text-gray-600 mb-6">{selectedService.pastor}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-700 mb-2">Amenities</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${selectedService.childcare ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {selectedService.childcare ? '✓' : '✕'}
                      </span>
                      <span>Childcare</span>
                    </li>
                    <li className="flex items-center">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${selectedService.livestream ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {selectedService.livestream ? '✓' : '✕'}
                      </span>
                      <span>Livestream Available</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-700 mb-2">Translation Available</h4>
                  {selectedService.translation.length > 0 ? (
                    <ul className="space-y-1">
                      {selectedService.translation.map((lang, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                          <span>{lang}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm">No translation services available</p>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Service</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>{selectedService.nextDate}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => addToCalendar(selectedService)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Add to Calendar
                </button>
                <button
                  onClick={() => toggleReminder(selectedService.id)}
                  className={`px-4 py-3 rounded-lg flex items-center justify-center ${
                    remindMeServices.includes(selectedService.id)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Bell className={`h-5 w-5 ${remindMeServices.includes(selectedService.id) ? 'text-green-700' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    navigator.share({
                      title: selectedService.title,
                      text: `Join us for ${selectedService.title} on ${selectedService.day}s at ${selectedService.time}`,
                      url: window.location.href,
                    }).catch(() => {
                      toast.info("Copy this link to share");
                    });
                  }}
                  className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              {selectedService.livestream && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Livestream Information</h3>
                  <p className="text-gray-600 mb-4">
                    {"This service is available via livestream. Join us online if you can't make it in person!"}
                  </p>
                  <button
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    Watch Livestream
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, remindMeServices, toggleReminder, openServiceDetails, itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
    >
      <div className={`h-2 ${service.color}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{service.icon}</span>
            <h3 className="text-xl font-semibold text-gray-800 leading-tight">
              {service.title}
            </h3>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleReminder(service.id);
            }}
            className={`p-1 rounded-full ${
              remindMeServices.includes(service.id) 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>{service.time}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-gray-600 text-sm">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>{service.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          {service.childcare && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full mr-2">
              Childcare
            </span>
          )}
          {service.livestream && (
            <span className="bg-red-50 text-red-700 px-2 py-1 rounded-full">
              Livestream
            </span>
          )}
        </div>
        
        <button
          onClick={() => openServiceDetails(service)}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <ChevronRight className="h-4 w-4 mr-1" />
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Add PropTypes validation for ServiceCard component
ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    childcare: PropTypes.bool,
    livestream: PropTypes.bool
  }).isRequired,
  remindMeServices: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleReminder: PropTypes.func.isRequired,
  openServiceDetails: PropTypes.func.isRequired,
  itemVariants: PropTypes.object.isRequired
};

export default ServiceTimes;
