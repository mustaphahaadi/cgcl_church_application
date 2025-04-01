import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Heart, Clock, Check } from "lucide-react";

const PrayerRequests = () => {
  const { user } = useAuth();
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    isPrivate: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // In a real app, fetch prayer requests from your API
    // This is mock data for demonstration
    const mockPrayerRequests = [
      {
        id: 1,
        title: "Healing for Sarah",
        description: "Please pray for my sister Sarah who is recovering from surgery.",
        author: "John Doe",
        createdAt: "2023-05-15T10:30:00Z",
        prayerCount: 12,
        isAnswered: false,
        isPrivate: false
      },
      {
        id: 2,
        title: "New Job Opportunity",
        description: "I have an interview next week. Praying for God's favor.",
        author: "Jane Smith",
        createdAt: "2023-05-14T08:15:00Z",
        prayerCount: 8,
        isAnswered: false,
        isPrivate: false
      },
      {
        id: 3,
        title: "Family Reconciliation",
        description: "Praying for healing in my family relationships.",
        author: "Michael Johnson",
        createdAt: "2023-05-10T14:45:00Z",
        prayerCount: 15,
        isAnswered: true,
        isPrivate: false
      }
    ];
    
    setPrayerRequests(mockPrayerRequests);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!newRequest.title || !newRequest.description) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    
    // In a real app, send to your API
    setTimeout(() => {
      const newPrayerRequest = {
        id: prayerRequests.length + 1,
        title: newRequest.title,
        description: newRequest.description,
        author: user?.firstName ? `${user.firstName} ${user.lastName}` : "Anonymous",
        createdAt: new Date().toISOString(),
        prayerCount: 0,
        isAnswered: false,
        isPrivate: newRequest.isPrivate
      };
      
      setPrayerRequests([newPrayerRequest, ...prayerRequests]);
      setNewRequest({ title: "", description: "", isPrivate: false });
      toast.success("Prayer request submitted successfully");
      setIsLoading(false);
    }, 1000);
  };

  const handlePrayerClick = (id) => {
    setPrayerRequests(prayerRequests.map(request => 
      request.id === id ? { ...request, prayerCount: request.prayerCount + 1 } : request
    ));
    toast.info("Thank you for praying! 🙏");
  };

  const markAsAnswered = (id) => {
    setPrayerRequests(prayerRequests.map(request => 
      request.id === id ? { ...request, isAnswered: true } : request
    ));
    toast.success("Praise God for answered prayers! 🙌");
  };

  const filteredRequests = prayerRequests.filter(request => {
    if (filter === "all") return true;
    if (filter === "active") return !request.isAnswered;
    if (filter === "answered") return request.isAnswered;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight">
            Prayer Requests
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Share your prayer needs and pray for others in our community
          </p>
        </div>

        {/* Submit Prayer Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            {/* <Hands className="w-6 h-6 mr-2 text-blue-500" /> */}
            Submit a Prayer Request
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newRequest.title}
                onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Prayer request title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share more details about your prayer request"
                rows={4}
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="private-request"
                checked={newRequest.isPrivate}
                onChange={(e) => setNewRequest({...newRequest, isPrivate: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="private-request" className="ml-2 block text-sm text-gray-700">
                Make this request private (only visible to church staff)
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>Submit Prayer Request</>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Prayer Request List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              Community Prayers
            </h2>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === "all" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === "active" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("answered")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === "answered" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Answered
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-lg border ${
                    request.isAnswered 
                      ? "bg-green-50 border-green-200" 
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {request.title}
                      {request.isAnswered && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Answered
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(request.createdAt)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{request.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted by: {request.author}
                    </span>
                    
                    <div className="flex space-x-2">
                      {!request.isAnswered && user && (
                        <button
                          onClick={() => markAsAnswered(request.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark Answered
                        </button>
                      )}
                      
                      <button
                        onClick={() => handlePrayerClick(request.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {/* <Hands className="w-4 h-4 mr-1" /> */}
                        Pray ({request.prayerCount})
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No prayer requests found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;