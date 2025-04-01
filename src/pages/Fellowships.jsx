import { useState, useEffect } from "react";
import { Clock, MapPin, Users, Calendar, ChevronRight, Search, Filter, Heart, MessageCircle, Share2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Fellowships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("all");
  const [favoriteGroups, setFavoriteGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fellowshipGroups = [
    {
      id: 1,
      name: "Young Adults",
      description:
        "A group for young adults to connect and grow in faith together through meaningful discussions and activities.",
      meetingTime: "Sundays at 5 PM",
      location: "Community Center Room A",
      color: "text-blue-500",
      iconBg: "bg-blue-50",
      borderColor: "border-blue-200",
      day: "sunday",
      leader: "Pastor Michael Kwodwo",
      members: 24,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      activities: ["Bible Study", "Social Events", "Community Service"],
      nextMeeting: "October 15, 2023"
    },
    {
      id: 2,
      name: "Women's Fellowship",
      description:
        "A supportive group for women to share experiences, discuss scripture, and grow together in a welcoming environment.",
      meetingTime: "Tuesdays at 6 PM",
      location: "Church Library",
      color: "text-purple-500",
      iconBg: "bg-purple-50",
      borderColor: "border-purple-200",
      day: "tuesday",
      leader: "Ama Serwaa",
      members: 32,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      activities: ["Prayer", "Book Club", "Mentoring"],
      nextMeeting: "October 17, 2023"
    },
    {
      id: 3,
      name: "Men's Group",
      description:
        "A group for men to discuss faith and life challenges, offering support and accountability in a casual setting.",
      meetingTime: "Wednesdays at 7 PM",
      location: "Church Basement",
      color: "text-green-500",
      iconBg: "bg-green-50",
      borderColor: "border-green-200",
      day: "wednesday",
      leader: "David Anane",
      members: 18,
      image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      activities: ["Bible Study", "Sports Events", "Breakfast Meetings"],
      nextMeeting: "October 18, 2023"
    },
    {
      id: 4,
      name: "Family Connect",
      description:
        "A group for families to engage in activities, discussions, and service projects that build connections and faith.",
      meetingTime: "Fridays at 6 PM",
      location: "Main Sanctuary",
      color: "text-orange-500",
      iconBg: "bg-orange-50",
      borderColor: "border-orange-200",
      day: "friday",
      leader: "Kingley & Teresa Kwame",
      members: 45,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      activities: ["Family Activities", "Parenting Discussions", "Community Service"],
      nextMeeting: "October 20, 2023"
    },
    {
      id: 5,
      name: "Senior Saints",
      description:
        "A fellowship group for seniors to connect, share wisdom, and enjoy fellowship in a comfortable and accessible environment.",
      meetingTime: "Thursdays at 10 AM",
      location: "Fellowship Hall",
      color: "text-red-500",
      iconBg: "bg-red-50",
      borderColor: "border-red-200",
      day: "thursday",
      leader: "Nana Thomas",
      members: 28,
      image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80",
      activities: ["Bible Study", "Lunch Gatherings", "Prayer"],
      nextMeeting: "October 19, 2023"
    },
    {
      id: 6,
      name: "College Ministry",
      description:
        "A vibrant community for college students to find support, explore faith questions, and build lasting friendships.",
      meetingTime: "Saturdays at 4 PM",
      location: "Youth Center",
      color: "text-cyan-500",
      iconBg: "bg-cyan-50",
      borderColor: "border-cyan-200",
      day: "saturday",
      leader: "Pastor Alex Oboy",
      members: 35,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      activities: ["Bible Study", "Social Events", "Service Projects"],
      nextMeeting: "October 21, 2023"
    },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteGroups');
    if (savedFavorites) {
      setFavoriteGroups(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteGroups', JSON.stringify(favoriteGroups));
  }, [favoriteGroups]);

  // Filter groups based on search term and selected day
  const filteredGroups = fellowshipGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = selectedDay === "all" || group.day === selectedDay;
    return matchesSearch && matchesDay;
  });

  // Toggle favorite status for a group
  const toggleFavorite = (groupId) => {
    if (favoriteGroups.includes(groupId)) {
      setFavoriteGroups(favoriteGroups.filter(id => id !== groupId));
      toast.info("Removed from favorites");
    } else {
      setFavoriteGroups([...favoriteGroups, groupId]);
      toast.success("Added to favorites");
    }
  };

  // Open modal with group details
  const openGroupDetails = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  // Handle join group
  const handleJoinGroup = (group) => {
    toast.success(`Request sent to join ${group.name}`);
    setShowModal(false);
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

  // Days of the week for filter
  const days = [
    { id: "all", label: "All Days" },
    { id: "sunday", label: "Sunday" },
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Our Fellowships
        </h1>
        <p className="text-gray-600 text-lg">
          Join a small group to connect with others and grow in your faith
          through meaningful relationships and conversations.
        </p>
      </motion.header>

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-10"
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
                placeholder="Search fellowships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Filter Label */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600 font-medium">Filter by day:</span>
            </div>
          </div>
          
          {/* Day Filter Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDay === day.id
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
        <div className="max-w-7xl mx-auto flex justify-center items-center py-20">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading fellowships...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Favorite Groups Section (if any) */}
          {favoriteGroups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-7xl mx-auto mb-10"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-red-500 mr-2" />
                Your Favorite Groups
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fellowshipGroups
                  .filter(group => favoriteGroups.includes(group.id))
                  .map((group) => (
                    <motion.div
                      key={group.id}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white border-l-4 ${group.borderColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`flex items-center gap-2`}>
                          <div className={`${group.iconBg} p-2 rounded-md`}>
                            <Users className={`h-5 w-5 ${group.color}`} />
                          </div>
                          <span className={`font-semibold text-lg ${group.color}`}>
                            {group.name}
                          </span>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(group.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>

                      <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{group.meetingTime}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{group.location}</span>
                      </div>

                      <button
                        onClick={() => openGroupDetails(group)}
                        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* All Groups Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Fellowship Groups</h2>
            
            {filteredGroups.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">No fellowship groups found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-bold text-xl">{group.name}</h3>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(group.id);
                              }}
                              className={`${favoriteGroups.includes(group.id) ? 'text-red-500' : 'text-white'} hover:text-red-400`}
                            >
                              <Heart className={`h-5 w-5 ${favoriteGroups.includes(group.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                          <div className="flex items-center text-white/80 text-sm mt-1">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{group.members} members</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
                      
                      <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{group.meetingTime}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{group.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Next: {group.nextMeeting}</span>
                      </div>

                      <button
                        onClick={() => openGroupDetails(group)}
                        className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-7xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="md:flex items-center">
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {"Can't"} Find the Right Group?
                </h2>
                <p className="text-blue-100 mb-6">
                  {"We're always looking to start new fellowship groups based on interests and needs. Let us know what you're looking for!"}
                </p>
                <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                  Suggest a New Group
                </button>
              </div>
              <div className="hidden md:block md:w-1/3 p-8">
                <Users className="w-full h-auto text-white opacity-20" />
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Group Details Modal */}
      {showModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64">
              <img 
                src={selectedGroup.image} 
                alt={selectedGroup.name}
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
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${selectedGroup.iconBg} mb-2`}>
                  <Users className={`h-4 w-4 ${selectedGroup.color}`} />
                  <span className={`text-sm font-medium ${selectedGroup.color}`}>
                    {selectedGroup.name}
                  </span>
                </div>
                <h2 className="text-white text-2xl font-bold">{selectedGroup.name}</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>{selectedGroup.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{selectedGroup.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>{selectedGroup.members} members</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Group</h3>
              <p className="text-gray-600 mb-6">{selectedGroup.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Leader</h3>
              <p className="text-gray-600 mb-6">{selectedGroup.leader}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Activities</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {selectedGroup.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Next Meeting</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>{selectedGroup.nextMeeting}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => handleJoinGroup(selectedGroup)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Join This Group
                </button>
                <button
                  onClick={() => toggleFavorite(selectedGroup.id)}
                  className={`px-4 py-3 rounded-lg flex items-center justify-center ${
                    favoriteGroups.includes(selectedGroup.id)
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${favoriteGroups.includes(selectedGroup.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    navigator.share({
                      title: selectedGroup.name,
                      text: `Check out the ${selectedGroup.name} fellowship group at our church!`,
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
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Contact Group Leader
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm interested in joining this group..."
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast.success("Message sent to group leader")}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Fellowships;
