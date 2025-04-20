import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import healingImage from "../assets/healing.jpeg";
import { Link } from "react-router";
import api, { base_url } from "../utils/api";

const Testimonies = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [testimonies,setTestimonies] = useState([]);

  useEffect(()=>{
    const testimonies = async () => {
      try{
        const response = await api.get(`${base_url}members/testimonies/`);
        if(response.status !== 200){
          
          throw new Error("error occuried");
        }
        setTestimonies((prev)=> response.data.results)
        
      }catch(error){
        console.log(error)
      }
    }
    testimonies()
  },[])
  const categories = [
    { id: "all", label: "All Testimonies" },
    { id: "healing", label: "Healing" },
    { id: "salvation", label: "Salvation" },
    { id: "provision", label: "Divine Provision" },
    { id: "deliverance", label: "Deliverance" },
    { id: "breakthrough", label: "Breakthrough" },
  ];

  // Filter testimonies based on category and search
  const filteredTestimonies = testimonies.filter((testimony) => {
    const matchesCategory =
      selectedCategory === "all" || testimony.category === selectedCategory;
    const matchesSearch = testimony.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Testimonies of {"God's"} Faithfulness
          </h1>
          <p className="text-lg text-gray-900 max-w-5xl mx-auto">
            Read inspiring stories of how God is moving in the lives of His
            people. Share in the joy of transformed lives and miraculous
            encounters.
          </p>
        </div>

        {/* Share Testimony Button */}
        <div className="text-center mb-8">
          <Link to="/testimonyshare">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg">
              Share Your Testimony
            </button>
          </Link>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                    ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search testimonies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonies.map((testimony) => (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={testimony.image || healingImage}
                  alt={testimony.user_name}
                  className="w-full h-48 object-cover"
                />
                {testimony.video && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize">
                    {testimony.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {testimony.date }
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {testimony.title || "Divine Healing Testimony"}
                </h3>

                <div className="flex items-center mb-4">
                  <img
                    src={testimony.image || healingImage}
                    alt={testimony.user_name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-600">{testimony.user_name}</span>
                  {testimony.verified && (
                    <svg
                      className="w-5 h-5 text-blue-500 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {testimony.content}
                </p>

                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{testimony.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
