import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const LiveStream = () => {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(245);

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

  // Simulate live stream status check
  useEffect(() => {
    const checkStreamStatus = () => {
      // This would typically be an API call to check stream status
      const mockStreamData = {
        isLive: Math.random() > 0.5,
        viewers: Math.floor(Math.random() * 300) + 200,
      };
      
      setIsLive(mockStreamData.isLive);
      setViewerCount(mockStreamData.viewers);
    };

    const interval = setInterval(checkStreamStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
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
              <div className="flex items-center justify-center h-full">
                <p className="text-white text-xl">Stream will begin shortly...</p>
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
          </div>

          {/* Stream Info */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sunday Service Live Stream</h1>
                <div className="mt-2 flex items-center space-x-4 text-gray-600">
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
              <button
                onClick={handleShare}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
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

            {/* Upcoming Streams */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Streams</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Wednesday Bible Study",
                    date: "Wednesday, 7:00 PM",
                    description: "Deep dive into God's Word",
                  },
                  {
                    title: "Friday Prayer Meeting",
                    date: "Friday, 6:30 PM",
                    description: "Join us for corporate prayer",
                  },
                ].map((stream, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{stream.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{stream.date}</p>
                    <p className="text-sm text-gray-600 mt-1">{stream.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveStream;