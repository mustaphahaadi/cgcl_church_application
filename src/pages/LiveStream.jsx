import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Share2, 
  MessageSquare, 
  Send, 
  FileText, 
  Heart, 
  Download, 
  Settings, 
  ChevronDown,
  PlayCircle,
  Bookmark
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LiveStream = () => {
  const { user } = useAuth();
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(245);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "Pastor James", message: "Welcome to our Sunday service!", timestamp: new Date().toISOString(), isStaff: true },
    { id: 2, user: "Grace M.", message: "Excited to worship with everyone today!", timestamp: new Date(Date.now() - 120000).toISOString() },
    { id: 3, user: "Thomas K.", message: "Amen! Joining from Chicago today.", timestamp: new Date(Date.now() - 60000).toISOString() }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [streamQuality, setStreamQuality] = useState("auto");
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const chatEndRef = useRef(null);
  
  const sermonNotes = {
    title: "Finding Peace in Troubled Times",
    scripture: "John 14:27",
    points: [
      "Understanding God's peace vs. worldly peace",
      "How to maintain peace during life's storms",
      "Practical steps to cultivate inner peace daily"
    ],
    downloadLink: "#"
  };

  const previousServices = [
    { id: 1, title: "The Power of Faith", date: "May 21, 2023", duration: "1:25:30", thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" },
    { id: 2, title: "Walking in Love", date: "May 14, 2023", duration: "1:18:45", thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" },
    { id: 3, title: "Spiritual Growth", date: "May 7, 2023", duration: "1:22:10", thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "CLGC Church Live Service",
        url: window.location.href,
      });
    } catch {
      toast.info("Use the link to share this stream");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newChatMessage = {
      id: chatMessages.length + 1,
      user: user?.firstName ? `${user.firstName} ${user.lastName.charAt(0)}.` : "Guest User",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isStaff: false
    };
    
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");
  };

  const handleDonate = () => {
    toast.success("Redirecting to donation page...");
    // In a real app, you would redirect to your donation page
    // window.location.href = "/give";
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Simulate live stream status check
  useEffect(() => {
    const checkStreamStatus = () => {
      // This would typically be an API call to check stream status
      const mockStreamData = {
        isLive: Math.random() > 0.3, // Increased probability of being live
        viewers: Math.floor(Math.random() * 300) + 200,
      };
      
      setIsLive(mockStreamData.isLive);
      setViewerCount(mockStreamData.viewers);
    };

    const interval = setInterval(checkStreamStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Live Stream Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                {isLive ? (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-white text-xl mb-4">Stream will begin shortly...</p>
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-3">
                  {isLive && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {viewerCount}
                  </span>
                </div>

                {/* Stream Quality Selector */}
                <div className="absolute bottom-4 right-4">
                  <div className="relative">
                    <button 
                      className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                      onClick={() => setShowQualityOptions(!showQualityOptions)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {streamQuality.toUpperCase()}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    
                    {showQualityOptions && (
                      <div className="absolute bottom-full mb-2 right-0 bg-black/80 rounded-lg overflow-hidden">
                        {["auto", "1080p", "720p", "480p", "360p"].map(quality => (
                          <button
                            key={quality}
                            className={`block w-full text-left px-4 py-2 text-sm ${streamQuality === quality ? 'bg-blue-600 text-white' : 'text-white hover:bg-gray-700'}`}
                            onClick={() => {
                              setStreamQuality(quality);
                              setShowQualityOptions(false);
                              toast.info(`Quality set to ${quality.toUpperCase()}`);
                            }}
                          >
                            {quality.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sunday Service Live Stream</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Sunday, 10:00 AM
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        120 minutes
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-4 sm:mt-0 space-x-2">
                    <button
                      onClick={handleDonate}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Donate
                    </button>
                    <button
                      onClick={handleShare}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">About this service</h2>
                  <p className="mt-2 text-gray-600">
                    Join us for our Sunday worship service. Experience powerful praise and worship, 
                    and receive an inspiring message from {"God's"} Word. Whether {"you're"} joining us online 
                    or in person, {"we're"} glad {"you're"} here!
                  </p>
                </div>

                {/* Interactive Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowChat(!showChat)}
                    className={`flex items-center px-4 py-2 rounded-lg border ${showChat ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {showChat ? 'Hide Chat' : 'Show Chat'}
                  </button>
                  <button 
                    onClick={() => setShowNotes(!showNotes)}
                    className={`flex items-center px-4 py-2 rounded-lg border ${showNotes ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {showNotes ? 'Hide Notes' : 'Sermon Notes'}
                  </button>
                  <a 
                    href={sermonNotes.downloadLink}
                    className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </a>
                </div>

                {/* Sermon Notes (Collapsible) */}
                {showNotes && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{sermonNotes.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Scripture: {sermonNotes.scripture}</p>
                      </div>
                      <button 
                        onClick={() => setShowNotes(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">Main Points:</h4>
                      <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-1">
                        {sermonNotes.points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save Notes
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Previous Recordings */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Previous Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {previousServices.map(service => (
                  <div key={service.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      <img 
                        src={service.thumbnail} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {service.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 truncate">{service.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{service.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All Recordings
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Chat */}
          {showChat && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:w-1/3"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
                    Live Chat
                  </h2>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                        {msg.user.charAt(0)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-baseline">
                          <span className={`font-medium text-sm ${msg.isStaff ? 'text-blue-600' : 'text-gray-900'}`}>
                            {msg.user}
                            {msg.isStaff && (
                              <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                Staff
                              </span>
                            )}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {formatTimestamp(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                
                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="mt-2 text-xs text-gray-500">
                    Please keep conversations respectful and on-topic.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Upcoming Streams */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Wednesday Bible Study",
                date: "Wednesday, 7:00 PM",
                description: "Deep dive into God's Word",
                image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Friday Prayer Meeting",
                date: "Friday, 6:30 PM",
                description: "Join us for corporate prayer",
                image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Youth Service",
                date: "Saturday, 4:00 PM",
                description: "Special service for our youth",
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              }
            ].map((stream, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={stream.image} 
                    alt={stream.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{stream.title}</h3>
                  <p className="text-sm text-blue-600 mt-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {stream.date}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{stream.description}</p>
                  <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                    Set Reminder
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveStream;