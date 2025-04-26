import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Upload, Video, Mic, Plus, X, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api, { base_url } from "../utils/api";
import { useNavigate } from "react-router";

const MediaDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [sermons, setSermons] = useState([]);
  const [uploadType, setUploadType] = useState(null); // 'video' or 'audio'
  
  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "sermon",
    file: null,
    youtube_link: "",
  });

  useEffect(() => {
    // Fetch existing sermons
    const allowedRoles = ["admin", "media"];
    
    // Check if user has the required role
    const userData = JSON.parse(localStorage.getItem("user"))
    const userRole = userData.role;
    console.log(userRole,allowedRoles.includes(userRole))
    console.log(user)
    if (!allowedRoles.includes(userRole)) {
      navigate("/dashboard")
    }

    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await api.get(`${base_url}sermons/`);
      setSermons(response?.data);
    } catch (error) {
      console.error("Error fetching sermons:", error);
      toast.error("Failed to load sermons");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (uploadType === 'video' && !file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }
    
    if (uploadType === 'audio' && !file.type.startsWith('audio/')) {
      toast.error("Please select a valid audio file");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.preacher || !formData.date) {
      toast.error("Please fill all required fields");
      return;
    }

    if (uploadType === 'video' && !formData.youtube_link && !formData.file) {
      toast.error("Please provide either a YouTube link or upload a video file");
      return;
    }

    if (uploadType === 'audio' && !formData.file) {
      toast.error("Please upload an audio file");
      return;
    }

    setIsUploading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("preacher", formData.preacher);
      data.append("date", formData.date);
      data.append("description", formData.description);
      data.append("category", formData.category);
      
      if (uploadType === 'video') {
        data.append("type", "video");
        if (formData.youtube_link) {
          data.append("youtube_link", formData.youtube_link);
        }
      } else {
        data.append("type", "audio");
      }

      if (formData.file) {
        data.append("file", formData.file);
      }

      const response = await api.post(`${base_url}sermons/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`${uploadType === 'video' ? 'Video' : 'Audio'} sermon uploaded successfully!`);
      
      // Reset form
      setFormData({
        title: "",
        preacher: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        category: "sermon",
        file: null,
        youtube_link: "",
      });
      setUploadType(null);
      
      // Refresh sermons list
      fetchSermons();
    } catch (error) {
      console.error("Error uploading sermon:", error);
      toast.error(`Failed to upload ${uploadType === 'video' ? 'video' : 'audio'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setUploadType(null);
    setFormData({
      title: "",
      preacher: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: "sermon",
      file: null,
      youtube_link: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Media Team Dashboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Upload and manage sermon videos and audio recordings
          </p>
        </div>

        {!uploadType ? (
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <button
              onClick={() => setUploadType("video")}
              className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              <Video className="h-6 w-6" />
              <span className="text-lg font-medium">Upload Video Sermon</span>
            </button>
            <button
              onClick={() => setUploadType("audio")}
              className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              <Mic className="h-6 w-6" />
              <span className="text-lg font-medium">Upload Audio Sermon</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-xl rounded-lg p-6 mb-12 max-w-3xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {uploadType === "video" ? "Upload Video Sermon" : "Upload Audio Sermon"}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Sermon Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="preacher" className="block text-sm font-medium text-gray-700">
                  Preacher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="preacher"
                  name="preacher"
                  value={formData.preacher}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="sermon">Sermon</option>
                  <option value="teaching">Teaching</option>
                  <option value="testimony">Testimony</option>
                  <option value="worship">Worship</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {uploadType === "video" && (
                <div>
                  <label htmlFor="youtube_link" className="block text-sm font-medium text-gray-700">
                    YouTube Link (Optional if uploading a file)
                  </label>
                  <input
                    type="url"
                    id="youtube_link"
                    name="youtube_link"
                    value={formData.youtube_link}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {uploadType === "video" ? "Video File" : "Audio File"} 
                  {uploadType === "video" && formData.youtube_link ? " (Optional)" : " (Required)"}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept={uploadType === "video" ? "video/*" : "audio/*"}
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {uploadType === "video" 
                        ? "MP4, WebM, MKV up to 500MB" 
                        : "MP3, WAV, OGG up to 50MB"}
                    </p>
                    {formData.file && (
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <Check className="h-4 w-4 mr-1" /> {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isUploading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Sermon"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Uploads
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {sermons.length > 0 ? (
              sermons.map((sermon) => (
                <li key={sermon.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {sermon.type === "video" ? (
                          <Video className="h-5 w-5 text-indigo-600 mr-3" />
                        ) : (
                          <Mic className="h-5 w-5 text-indigo-600 mr-3" />
                        )}
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {sermon.title}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {sermon.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {sermon.preacher}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(sermon.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-5 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center py-6">
                  <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
                  <p>No sermons uploaded yet</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MediaDashboard;