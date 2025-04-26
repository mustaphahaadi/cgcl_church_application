import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api,{base_url} from "../utils/api";

const MemberFellowship = () => {
  const { user, setUser } = useAuth();
  const [isJoining, setIsJoining] = useState(false);
  const [userFellowship,setUserFellowship] = useState(null)
  const [selectedFellowship, setSelectedFellowship] = useState("");

  // Import fellowships from Fellowships component
  const availableFellowships = [
    {
      id: "young-adults",
      name: "Young Adults",
      description: "A group for young adults to connect and grow in faith together through meaningful discussions and activities.",
      location: "Community Center Room A",
      time: "Sundays at 5 PM",
      memberCount: 25,
      color: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      id: "womens",
      name: "Women's Fellowship",
      description: "A supportive group for women to share experiences, discuss scripture, and grow together in a welcoming environment.",
      location: "Church Library",
      time: "Tuesdays at 6 PM",
      memberCount: 30,
      color: "text-purple-500",
      iconBg: "bg-purple-50",
    },
    {
      id: "mens",
      name: "Men's Group",
      description: "A group for men to discuss faith and life challenges, offering support and accountability in a casual setting.",
      location: "Church Basement",
      time: "Wednesdays at 7 PM",
      memberCount: 20,
      color: "text-green-500",
      iconBg: "bg-green-50",
    },
    {
      id: "family",
      name: "Family Connect",
      description: "A group for families to engage in activities, discussions, and service projects that build connections and faith.",
      location: "Main Sanctuary",
      time: "Fridays at 6 PM",
      memberCount: 15,
      color: "text-orange-500",
      iconBg: "bg-orange-50",
    }
  ];

  // Get user's fellowships
  const userFellowships = userFellowship || [];
  
  const handleJoinFellowship = async () => {
    if (!selectedFellowship) {
      toast.error("Please select a fellowship to join");
      return;
    }

    try {
      const fellowship = availableFellowships.find(f => f.id === selectedFellowship);
      
      // Add new fellowship to user's fellowships array
      const updatedFellowships = [...userFellowships, selectedFellowship];
      
      setUser(prev => ({
        ...prev,
        fellowships: updatedFellowships
      }));

      toast.success(`Successfully joined ${fellowship.name}!`);
      setIsJoining(false);
    } catch (error) {
      console.error("Failed to join fellowship:", error);
      toast.error("Failed to join fellowship. Please try again.");
    }
  };

  useEffect(()=>{
    const fellowshipApi = async() =>{
      try{
        const response = await api.get(`${base_url}fellowships/my/`);
        setUserFellowship(response?.data)
      }catch(error){
        toast.error("Failed to fetch your fellowship")
        console.error("Error",error)
      }
    }

    fellowshipApi()
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">My Fellowships</h2>
        </div>

        <div className="p-8">
          {userFellowships.length > 0 ? (
            <div className="space-y-6">
              {userFellowships.map(fellowshipId => {
                const fellowship = availableFellowships.find(f => f.id === fellowshipId);
                return (
                  <div key={fellowship.id} className={`p-6 rounded-lg ${fellowship.iconBg}`}>
                    <h3 className={`text-2xl font-semibold ${fellowship.color} mb-4`}>
                      {fellowship.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{fellowship.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span>{fellowship.time}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Users className="w-5 h-5" />
                        <span>{fellowship.memberCount} Members</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-6">You {"haven't"} joined any fellowships yet.</p>
            </div>
          )}

          {/* Always show the Join button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsJoining(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Join Another Fellowship
            </button>
          </div>

          {isJoining && (
            <div className="mt-8 border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Available Fellowships</h3>
              <div className="space-y-4">
                {availableFellowships
                  .filter(fellowship => !userFellowships.includes(fellowship.id))
                  .map((fellowship) => (
                    <div
                      key={fellowship.id}
                      className={`p-4 rounded-lg border cursor-pointer transition duration-200 ${
                        selectedFellowship === fellowship.id
                          ? `${fellowship.iconBg} border-${fellowship.color}`
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedFellowship(fellowship.id)}
                    >
                      <h4 className={`font-semibold ${fellowship.color}`}>{fellowship.name}</h4>
                      <p className="text-sm text-gray-600">{fellowship.time}</p>
                      <p className="text-sm text-gray-600">{fellowship.location}</p>
                      <p className="text-sm text-gray-600 mt-2">{fellowship.description}</p>
                    </div>
                  ))}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsJoining(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinFellowship}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Join
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MemberFellowship;
