import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, X } from "lucide-react";
import ProfileImage from "../assets/pastor.png";

const Profile = () => {
  // Sample user data (replace with real data from your backend or API)
  const initialUser = {
    name: "Kwame Adjei",
    email: "kwame@gmail.com",
    membershipDate: "2020-01-01", // ISO format for formatting
    bio: "A passionate member of the community, dedicated to serving others.",
    profileImage: ProfileImage,
    visitDate: new Date().toISOString().split("T")[0], // Current date
    dob: "", // Date of Birth
    houseAddress: "",
    digitalAddress: "",
    occupation: "",
    churchInfo: "",
    fellowship: "",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...initialUser });

  useEffect(() => {
    // Check if the profile is complete
    const isProfileComplete = () => {
      return (
        formData.name && formData.email && formData.dob && formData.houseAddress
      );
    };

    if (!isProfileComplete()) {
      alert("Please complete your profile.");
    }
  }, [formData]);

  // Format membership date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    } else {
      alert("Image must be less than 5MB.");
    }
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
    // Here you would typically send updated data to your backend
    console.log("Profile updated:", formData);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Sample recent activities
  const recentActivities = [
    { id: 1, activity: "Attended the Food Drive", date: "March 15, 2024" },
    {
      id: 2,
      activity: "Participated in the Community Clean-Up",
      date: "February 20, 2024",
    },
    {
      id: 3,
      activity: "Joined the Women's Fellowship",
      date: "January 10, 2024",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Header */}
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight"
        >
          Your Profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Welcome back, {user.name.split(" ")[0]}! Manage your profile details
          below.
        </motion.p>
      </header>

      {/* Profile Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0 text-center">
            <div className="relative">
              <img
                src={formData.profileImage}
                alt={user.name}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto object-cover border-4 border-blue-200 transition-transform duration-300 hover:scale-105"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Edit2 className="h-5 w-5" />
                </label>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Profile Details
              </h2>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  <Edit2 className="h-5 w-5" />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Save className="h-5 w-5" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 rounded-lg py-2 px-4 font-semibold hover:bg-gray-300 transition-colors duration-300"
                  >
                    <X className="h-5 w-5" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
              ) : (
                <p className="mt-1 text-gray-800 text-lg">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
              ) : (
                <p className="mt-1 text-gray-600">{user.email}</p>
              )}
            </div>

            {/* Membership Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Member Since
              </label>
              <p className="mt-1 text-gray-600">
                {formatDate(user.membershipDate)}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.dob ? formatDate(user.dob) : "Not provided"}
                </p>
              )}
            </div>

            {/* House Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                House Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="houseAddress"
                  value={formData.houseAddress}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.houseAddress || "Not provided"}
                </p>
              )}
            </div>

            {/* Digital Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Digital Address (Optional)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="digitalAddress"
                  value={formData.digitalAddress}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.digitalAddress || "Not provided"}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.occupation || "Not provided"}
                </p>
              )}
            </div>

            {/* Church Information */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Church Information
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="churchInfo"
                  value={formData.churchInfo}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.churchInfo || "Not provided"}
                </p>
              )}
            </div>

            {/* Fellowship */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fellowship
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fellowship"
                  value={formData.fellowship}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-600">
                  {user.fellowship || "Not provided"}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                />
              ) : (
                <p className="mt-1 text-gray-700">
                  {user.bio || "No bio provided."}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Activities Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Recent Activities
        </h3>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="text-gray-700">
              {activity.activity} -{" "}
              <span className="text-gray-500">{activity.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Profile;
