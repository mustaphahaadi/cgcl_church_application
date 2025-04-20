import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  Users, FileText, Video, MessageSquare, Calendar, Settings, UserPlus, Search, RefreshCw, Shield, Church, Plus, X
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { api_endpoint } from "../hooks/apiHooks";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSermons: 0,
    totalTestimonies: 0,
    totalEvents: 0,
    totalPrayerRequests: 0,
    fellowships: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [fellowships, setFellowships] = useState([]);
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
const [systemLogs, setSystemLogs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchAdditionalData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch dashboard statistics
      const statsResponse = await api.get(`${api_endpoint}admin/stats/`);
      setStats(statsResponse.data);
      
      // Fetch users
      const usersResponse = await api.get(`${api_endpoint}admin/users/`);
      setUsers(usersResponse.data);
      setFilteredUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      // Fetch fellowships
      const fellowshipsResponse = await api.get(`${api_endpoint}fellowships/`);
      setFellowships(fellowshipsResponse.data.results || fellowshipsResponse.data);
      
      // Fetch events
      const eventsResponse = await api.get(`${api_endpoint}events/`);
      setEvents(eventsResponse.data.results || eventsResponse.data);
      
      // Fetch sermons
      const sermonsResponse = await api.get(`${api_endpoint}sermons/`);
      setSermons(sermonsResponse.data.results || sermonsResponse.data);
      
      // Fetch prayer requests
      const prayerResponse = await api.get(`${api_endpoint}prayer-requests/`);
      setPrayerRequests(prayerResponse.data.results || prayerResponse.data);
         // Fetch testimonies
    const testimoniesResponse = await api.get(`${api_endpoint}testimonies/`);
    setTestimonies(testimoniesResponse.data.results || testimoniesResponse.data);
    
    // Fetch system logs
    const logsResponse = await api.get(`${api_endpoint}admin/logs/`);
    setSystemLogs(logsResponse.data.results || logsResponse.data);
  } catch (error) {
    console.error("Error fetching additional data:", error);
    } 
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "user");
    setRoleModalOpen(true);
  };

  const updateUserRole = async () => {
    try {
      await api.put(`${api_endpoint}admin/users/${selectedUser.id}/role/`, {
        role: selectedRole
      });
      
      // Update local state
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, role: selectedRole } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast.success(`Role updated for ${selectedUser.username}`);
      setRoleModalOpen(false);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    try {
      await api.delete(`${api_endpoint}admin/users/${userId}/`);
      
      // Update local state
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast.success("User deleted successfully");
      setUserModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.totalUsers}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("users")} className="text-blue-600 hover:underline">
            View all members
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Sermons</h3>
          <Video className="h-8 w-8 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.totalSermons}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("sermons")} className="text-blue-600 hover:underline">
            Manage sermons
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Testimonies</h3>
          <FileText className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.totalTestimonies}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("testimonies")} className="text-blue-600 hover:underline">
            View testimonies
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Events</h3>
          <Calendar className="h-8 w-8 text-yellow-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.totalEvents}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("events")} className="text-blue-600 hover:underline">
            Manage events
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Prayer Requests</h3>
          <MessageSquare className="h-8 w-8 text-red-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.totalPrayerRequests}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("prayer-requests")} className="text-blue-600 hover:underline">
            View prayer requests
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Fellowships</h3>
          <Church className="h-8 w-8 text-purple-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{stats.fellowships}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("fellowships")} className="text-blue-600 hover:underline">
            Manage fellowships
          </Link>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
            Church Members
          </h3>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button 
              onClick={fetchDashboardData}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fellowship
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {user.profile_image ? (
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={user.profile_image} 
                          alt={user.username} 
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email || "No email"}</div>
                  <div className="text-sm text-gray-500">{user.telephone || "No phone"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                      user.role === 'media' ? 'bg-indigo-100 text-indigo-800' : 
                      user.role === 'fellowship_leader' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {user.role || "Member"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.fellowship || "Not assigned"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleUserClick(user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRoleChange(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Manage Role
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFellowships = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
            Fellowships Management
          </h3>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Fellowship
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leader
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meeting Day
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fellowships.map((fellowship) => (
              <tr key={fellowship.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{fellowship.name}</div>
                  <div className="text-sm text-gray-500">{fellowship.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{fellowship.leader_name || "Not assigned"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {fellowship.member_count || 0} members
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {fellowship.meeting_day || "Not set"} {fellowship.meeting_time ? `at ${fellowship.meeting_time}` : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {fellowships.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No fellowships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
            Events Management
          </h3>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.description?.substring(0, 50)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${new Date(event.date) > new Date() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSermons = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
            Sermons Management
          </h3>
          <Link
            to="/media-dashboard/add-sermon"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sermon
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preacher
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sermons.map((sermon) => (
              <tr key={sermon.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{sermon.title}</div>
                  <div className="text-sm text-gray-500">{sermon.scripture_reference}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sermon.preacher}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sermon.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${sermon.media_type === 'video' ? 'bg-purple-100 text-purple-800' : 
                      sermon.media_type === 'audio' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {sermon.media_type || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/media-dashboard/edit-sermon/${sermon.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {sermons.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No sermons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPrayerRequests = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">
          Prayer Requests
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prayerRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {request.user_name || "Anonymous"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {request.request}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${request.is_answered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {request.is_answered ? 'Answered' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {prayerRequests.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No prayer requests found
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
        <h3 className="text-lg font-semibold text-gray-700">
          Testimonies
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Testimony
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonies.map((testimony) => (
              <tr key={testimony.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {testimony.user_name || "Anonymous"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {testimony.category}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {testimony.testimony}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(testimony.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${testimony.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {testimony.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  {!testimony.is_approved && (
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      Approve
                    </button>
                  )}
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {testimonies.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No testimonies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">
          System Logs
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {systemLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {log.username || "System"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {log.action}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ip_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${log.status === 'success' ? 'bg-green-100 text-green-800' : 
                      log.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {systemLogs.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No system logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Super Admin Dashboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Complete control over the church application
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-blue-600 text-white">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 mr-3" />
                  <h2 className="text-lg font-semibold">Admin Controls</h2>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "overview"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("users")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "users"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Users className="h-5 w-5 mr-3" />
                      Users Management
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("fellowships")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "fellowships"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Church className="h-5 w-5 mr-3" />
                      Fellowships
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("events")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "events"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Calendar className="h-5 w-5 mr-3" />
                      Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("sermons")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "sermons"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Video className="h-5 w-5 mr-3" />
                      Sermons
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("testimonies")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "testimonies"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Testimonies
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("prayer-requests")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "prayer-requests"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5 mr-3" />
                      Prayer Requests
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("system-logs")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "system-logs"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      System Logs
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {activeTab === "overview" && renderOverview()}
                {activeTab === "users" && renderUsers()}
                {activeTab === "fellowships" && renderFellowships()}
                {activeTab === "events" && renderEvents()}
                {activeTab === "sermons" && renderSermons()}
                {activeTab === "testimonies" && renderTestimonies()}
                {activeTab === "prayer-requests" && renderPrayerRequests()}
                {activeTab === "system-logs" && renderSystemLogs()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {userModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={() => setUserModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="flex-shrink-0 h-24 w-24 mb-4 sm:mb-0 sm:mr-6">
                  {selectedUser.profile_image ? (
                    <img 
                      className="h-24 w-24 rounded-full object-cover" 
                      src={selectedUser.profile_image} 
                      alt={selectedUser.username} 
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                      {selectedUser.first_name.charAt(0)}{selectedUser.last_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedUser.first_name} {selectedUser.middle_name ? selectedUser.middle_name + " " : ""}{selectedUser.last_name}
                  </h4>
                  <p className="text-gray-500">@{selectedUser.username}</p>
                  <div className="mt-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${selectedUser.role === 'admin' ? 'bg-red-100 text-red-800' : 
                        selectedUser.role === 'media' ? 'bg-indigo-100 text-indigo-800' : 
                        selectedUser.role === 'fellowship_leader' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {selectedUser.role || "Member"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Email</h5>
                  <p className="text-gray-900">{selectedUser.email || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Phone</h5>
                  <p className="text-gray-900">{selectedUser.telephone || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Gender</h5>
                  <p className="text-gray-900">{selectedUser.gender || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Fellowship</h5>
                  <p className="text-gray-900">{selectedUser.fellowship || "Not assigned"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h5>
                  <p className="text-gray-900">{selectedUser.dob || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Joined</h5>
                  <p className="text-gray-900">
                    {selectedUser.date_joined 
                      ? new Date(selectedUser.date_joined).toLocaleDateString() 
                      : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-500 mb-1">Address</h5>
                <p className="text-gray-900">{selectedUser.address || "Not provided"}</p>
                {selectedUser.digital_address && (
                  <p className="text-gray-500 text-sm mt-1">Digital: {selectedUser.digital_address}</p>
                )}
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-500 mb-1">Occupation</h5>
                <p className="text-gray-900">{selectedUser.occupation || "Not provided"}</p>
              </div>

              <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
                <button
                  onClick={() => handleRoleChange(selectedUser)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Manage Role
                </button>
                <button
                  onClick={() => deleteUser(selectedUser.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {roleModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Manage User Role</h3>
                <button
                  onClick={() => setRoleModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-4 text-gray-700">
                Update role for <span className="font-semibold">{selectedUser.username}</span>
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="role-user"
                      name="role"
                      type="radio"
                      value="user"
                      checked={selectedRole === "user"}
                      onChange={() => setSelectedRole("user")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-user" className="ml-3 block text-sm font-medium text-gray-700">
                      Regular Member
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="role-fellowship-leader"
                      name="role"
                      type="radio"
                      value="fellowship_leader"
                      checked={selectedRole === "fellowship_leader"}
                      onChange={() => setSelectedRole("fellowship_leader")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-fellowship-leader" className="ml-3 block text-sm font-medium text-gray-700">
                      Fellowship Leader
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="role-media"
                      name="role"
                      type="radio"
                      value="media"
                      checked={selectedRole === "media"}
                      onChange={() => setSelectedRole("media")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-media" className="ml-3 block text-sm font-medium text-gray-700">
                      Media Team
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="role-admin"
                      name="role"
                      type="radio"
                      value="admin"
                      checked={selectedRole === "admin"}
                      onChange={() => setSelectedRole("admin")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="role-admin" className="ml-3 block text-sm font-medium text-gray-700">
                      Super Admin
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserRole}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;