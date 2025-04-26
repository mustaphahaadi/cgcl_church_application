import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, {base_url} from "../utils/api";
import { toast } from "react-toastify";
import {
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Bell,
  Heart,
  Clock,
  ChevronRight,
  Video,
  Music,
  BookOpen,
  Gift,
  RefreshCw,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    upcomingEvents: [],
    recentSermons: [],
    fellowshipInfo: null,
    prayerRequests: [],
    testimonies: [],
    announcements: [],
  });
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Create an array to store all API calls
      const apiCalls = [];
      
      // Add try/catch for each API call to prevent one failure from stopping everything
      try {
        // Fetch upcoming events
        const eventsResponse = await api.get(`${base_url}events/`);
        const events = eventsResponse.data && eventsResponse.data.results ? 
          eventsResponse.data.results : 
          (Array.isArray(eventsResponse.data) ? eventsResponse.data : []);
        
        // Filter for upcoming events
        const upcomingEvents = events
          .filter(event => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5);
          
        setDashboardData(prevData => ({
          ...prevData,
          upcomingEvents
        }));
      } catch (error) {
        console.error("Error fetching events:", error);
        setDashboardData(prevData => ({
          ...prevData,
          upcomingEvents: []
        }));
      }
  
      try {
        // Fetch recent sermons
        const sermonsResponse = await api.get(`${base_url}sermons/`);
        const sermons = sermonsResponse.data && sermonsResponse.data.results ? 
          sermonsResponse.data.results : 
          (Array.isArray(sermonsResponse.data) ? sermonsResponse.data : []);
        const recentSermons = sermons.slice(0, 3);
        
        setDashboardData(prevData => ({
          ...prevData,
          recentSermons
        }));
      } catch (error) {
        console.error("Error fetching sermons:", error);
        setDashboardData(prevData => ({
          ...prevData,
          recentSermons: []
        }));
      }
  
      try {
        // Fetch user's fellowship info if they belong to one
        const fellowshipResponse = await api.get(`${base_url}fellowships/my/`);
        const fellowshipInfo = fellowshipResponse.data;
        
        setDashboardData(prevData => ({
          ...prevData,
          fellowshipInfo
        }));
      } catch (error) {
        console.log("User not part of a fellowship yet");
        setDashboardData(prevData => ({
          ...prevData,
          fellowshipInfo: null
        }));
      }
  
      try {
        // Fetch prayer requests
        const prayerResponse = await api.get(`${base_url}prayer_requests/my/`);
        const prayerRequests = prayerResponse.data && prayerResponse.data.results ? 
          prayerResponse.data.results : 
          (Array.isArray(prayerResponse.data) ? prayerResponse.data : []);
        
        setDashboardData(prevData => ({
          ...prevData,
          prayerRequests
        }));
      } catch (error) {
        console.error("Error fetching prayer requests:", error);
        setDashboardData(prevData => ({
          ...prevData,
          prayerRequests: []
        }));
      }
  
      try {
        // Fetch testimonies
        const testimoniesResponse = await api.get(`${base_url}members/my/testimonies/`);
        const testimonies = testimoniesResponse.data && testimoniesResponse.data.results ? 
          testimoniesResponse.data.results : 
          (Array.isArray(testimoniesResponse.data) ? testimoniesResponse.data : []);
        setDashboardData(prevData => ({
          ...prevData,
          testimonies
        }));
      } catch (error) {
        console.error("Error fetching testimonies:", error);
        setDashboardData(prevData => ({
          ...prevData,
          testimonies: []
        }));
      }
  
      try {
        // Fetch announcements
        const announcementsResponse = await api.get(`${base_url}announcements/`);
        const announcements = announcementsResponse.data && announcementsResponse.data.results ? 
          announcementsResponse.data.results : 
          (Array.isArray(announcementsResponse.data) ? announcementsResponse.data : []);
        
        setDashboardData(prevData => ({
          ...prevData,
          announcements
        }));
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setDashboardData(prevData => ({
          ...prevData,
          announcements: []
        }));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load some dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-md p-6 text-white col-span-full">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.first_name || user?.username}!</h2>
        <p className="opacity-90">
          Stay connected with your church community and keep track of all activities.
        </p>
      </div>

      {/* Fellowship Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">My Fellowship</h3>
          <Users className="h-6 w-6 text-indigo-600" />
        </div>
        {dashboardData.fellowshipInfo ? (
          <>
            <p className="text-xl font-bold text-gray-900 mb-2">{dashboardData.fellowshipInfo.name}</p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Leader:</span> {dashboardData.fellowshipInfo.leader_name}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Meeting Day:</span> {dashboardData.fellowshipInfo.meeting_day || "Sunday After Service"}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Meeting Time:</span> {dashboardData.fellowshipInfo.meeting_time || "Not set"}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Location:</span> {dashboardData.fellowshipInfo.location || "Church"}
            </p>
            {/* <Link
              to="/member-fellowship"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              View Fellowship Details <ChevronRight className="h-4 w-4 ml-1" />
            </Link> */}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">You're not part of any fellowship yet.</p>
            <Link
              to="/fellowships"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join a Fellowship
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
          <Calendar className="h-6 w-6 text-indigo-600" />
        </div>
        {dashboardData.upcomingEvents.length > 0 ? (
          <ul className="space-y-3">
            {dashboardData.upcomingEvents.map((event) => (
              <li key={event.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-sm text-gray-500">
                  {event.is_online ? "Online Meeting" : event.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming events</p>
        )}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All Events <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Recent Sermons Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Sermons</h3>
          <BookOpen className="h-6 w-6 text-indigo-600" />
        </div>
        {dashboardData.recentSermons.length > 0 ? (
          <ul className="space-y-3">
            {dashboardData.recentSermons.map((sermon) => (
              <li key={sermon.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="font-medium text-gray-900">{sermon.title}</p>
                <p className="text-sm text-gray-500">
                  By: {sermon.speaker.username} | {new Date(sermon.created_at).toLocaleDateString()}
                </p>
                <div className="flex space-x-2 mt-1">
                  {sermon.video_url && (
                    <a
                      href={sermon.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs px-2 py-1 bg-red-100 text-red-800 rounded"
                    >
                      <Video className="h-3 w-3 mr-1" /> Watch
                    </a>
                  )}
                  {sermon.audio_url && (
                    <a
                      href={sermon.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs px-2 py-1 bg-green-100 text-green-800 rounded"
                    >
                      <Music className="h-3 w-3 mr-1" /> Listen
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent sermons</p>
        )}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link
            to="/sermons"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All Sermons <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link
            to="/prayer-requests"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Prayer Request</span>
          </Link>
          <Link
            to="/testimonies"
            className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <FileText className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Testimonies</span>
          </Link>
          <Link
            to="/give"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Gift className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Give</span>
          </Link>
          <Link
            to="/live-stream"
            className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Video className="h-8 w-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Live Stream</span>
          </Link>
          <Link
            to="/service-times"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Clock className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Service Times</span>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderPrayerRequests = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">My Prayer Requests</h3>
          <Link
            to="/prayer-requests"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Prayer Request
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData.prayerRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{request.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(request.created_at).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.is_answered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.is_answered ? 'Answered' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
            {dashboardData.prayerRequests.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  You haven't submitted any prayer requests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestimonies = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">My Testimonies</h3>
          <Link
            to="/testimonyshare"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share Testimony
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Testimony
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData.testimonies.map((testimony) => (
              <tr key={testimony.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{testimony.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{testimony.content}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(testimony.created_at).toLocaleDateString()}</div>
                </td>
              </tr>
            ))}
            {dashboardData.testimonies.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  You haven't shared any testimonies yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Church Announcements</h3>
      </div>
      <div className="p-6">
        {dashboardData.announcements.length > 0 ? (
          <ul className="space-y-4">
            {dashboardData.announcements.map((announcement) => (
              <li key={announcement.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <Bell className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-1">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                    <p className="text-xs text-gray-500">
                      Posted on {new Date(announcement.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No announcements at this time</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to your personal church dashboard
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("prayer-requests")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "prayer-requests"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Prayer Requests
              </button>
              <button
                onClick={() => setActiveTab("testimonies")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "testimonies"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Testimonies
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "announcements"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Announcements
              </button>
            </nav>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "overview" && renderOverview()}
            {activeTab === "prayer-requests" && renderPrayerRequests()}
            {activeTab === "testimonies" && renderTestimonies()}
            {activeTab === "announcements" && renderAnnouncements()}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
