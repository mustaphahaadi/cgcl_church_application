import { useState, useRef,useEffect } from "react";
import { motion } from "framer-motion";
import healingImage from "../assets/healing.jpeg";
import { getAllSermons } from "../hooks/apiHooks";

const Sermons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");
  const [playingSermonId, setPlayingSermonId] = useState(null);
  const [sermons,setSermons] = useState([]);
  const audioRef = useRef(null);

  const handleListen = (sermon) => {
    if (playingSermonId === sermon.id) {
      audioRef.current.pause();
      setPlayingSermonId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(sermon.audioLink);
      audioRef.current.play();
      setPlayingSermonId(sermon.id);
    }
  };

  const handleWatch = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const _sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      date: "January 10, 2025",
      speaker: "Rev. Daniel Kusi",
      series: "Faith Series",
      description:
        "Explore the transformative power of faith in our daily lives.",
      audioLink: "https://example.com/sermon1",
      videoLink: "https://youtu.be/c_VyjZTR5VM?si=QQWfvXFaT3CLmFg_",
      thumbnail: healingImage,
      duration: "45:30",
      views: 1250,
      scripture: "Hebrews 11:1-6",
      tags: ["faith", "transformation", "spiritual growth"],
    },
    {
      id: 2,
      title: "Walking in Divine Grace",
      date: "October 1, 2024",
      speaker: "Pastor Kwame Akwasi",
      series: "Grace Series",
      description: "Understanding and living in God's amazing grace daily.",
      audioLink: "https://example.com/sermon2",
      videoLink: "https://example.com/sermon2-video",
      thumbnail: healingImage,
      duration: "52:15",
      views: 980,
      scripture: "Ephesians 2:8-9",
      tags: ["grace", "salvation", "christian living"],
    },
    {
      id: 3,
      title: "Kingdom Prosperity Principles",
      date: "January 24, 2025",
      speaker: "Rev. Kofi Mensah",
      series: "Prosperity Series",
      description: "Biblical principles for prosperity and stewardship.",
      audioLink: "https://example.com/sermon3",
      videoLink: "https://example.com/sermon3-video",
      thumbnail: healingImage,
      duration: "48:20",
      views: 1100,
      scripture: "3 John 1:2",
      tags: ["prosperity", "stewardship", "finance"],
    },
  ];

  // const filteredSermons = sermons.filter((sermon) => {
  //   const matchesSearch =
  //     sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesSeries =
  //     selectedSeries === "all" || sermon.series === selectedSeries;
  //   const matchesSpeaker =
  //     selectedSpeaker === "all" || sermon.speaker === selectedSpeaker;
  //   return matchesSearch && matchesSeries && matchesSpeaker;
  // });
  useEffect(()=>{
      const sermon = async () => {
        try{
          const response = await getAllSermons();
          if(response.status !== 200){
            
            throw new Error("error occuried");
          }
          setSermons((prev)=> response.data.results)
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      sermon()
    },[])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Sermons & Teachings
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Explore our collection of life-changing messages from our ministers
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search sermons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Series</option>
              <option value="Faith Series">Faith Series</option>
              <option value="Grace Series">Grace Series</option>
              <option value="Prosperity Series">Prosperity Series</option>
            </select>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Speakers</option>
              <option value="Rev. Daniel Kusi">Rev. Daniel Kusi</option>
              <option value="Pastor Kwame Akwasi">Pastor Kwame Akwasi</option>
              <option value="Rev. Kofi Mensah">Rev. Kofi Mensah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={sermon.thumbnail || healingImage}
                  alt={sermon.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/images/sermon-placeholder.jpg";
                  }}
                />
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                  {sermon.duration|| "22mins"}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{sermon.date}</span>
                  <span className="text-sm text-gray-500">
                    {sermon.views||""} views
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sermon.title}
                </h3>

                <p className="text-gray-600 mb-2">{sermon.user_name}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {sermon.series}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    {sermon.scripture}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {sermon.description}
                </p>

                <div className="flex gap-2 mb-4">
                  {/* {sermon.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))} */}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleListen(sermon || "")}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    {playingSermonId === sermon.id ? 'Pause' : 'Listen Now'}
                  </button>
                  <button
                    onClick={() => handleWatch(sermon.video_link || sermon.video)}
                    className="flex-1 bg-gray-800 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                  >
                    Watch Video
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sermons;
