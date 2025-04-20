import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  Users, Calendar, MessageSquare, FileText, 
 Search, RefreshCw, Plus, X, Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api,{ base_url } from "../utils/api";
import { Link } from "react-router-dom";

const FellowshipLeaderDashboard = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [fellowship, setFellowship] = useState(null);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    is_online: false,
    meeting_link: ""
  });
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [userData]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = members.filter(member => 
        member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, members]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch fellowship details
      const fellowshipResponse = await api.get(`${base_url}fellowships/leader/`);
      setFellowship(fellowshipResponse.data);
      
      // Fetch fellowship members
      const membersResponse = await api.get(`${base_url}fellowships/${fellowshipResponse.data.id}/members/`);
      setMembers(membersResponse.data);
      setFilteredMembers(membersResponse.data);
      
      // Fetch fellowship events
      const eventsResponse = await api.get(`${base_url}fellowships/${fellowshipResponse.data.id}/events/`);
      setEvents(eventsResponse.data);
      
      // Fetch fellowship prayer requests
      const prayerResponse = await api.get(`${base_url}fellowships/${fellowshipResponse.data.id}/prayer-requests/`);
      setPrayerRequests(prayerResponse.data);
      
      // Fetch fellowship testimonies
      const testimoniesResponse = await api.get(`${base_url}fellowships/${fellowshipResponse.data.id}/testimonies/`);
      setTestimonies(testimoniesResponse.data);
    } catch (error) {
      console.error("Error fetching fellowship data:", error);
      toast.error("Failed to load fellowship data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setMemberModalOpen(true);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${base_url}fellowships/${fellowship.id}/events/`, {
        ...newEvent,
        fellowship: fellowship.id
      });
      
      setEvents([...events, response.data]);
      setEventModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        is_online: false,
        meeting_link: ""
      });
      
      toast.success("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    
    try {
      await api.delete(`${base_url}fellowships/${fellowship.id}/events/${eventId}/`);
      setEvents(events.filter(event => event.id !== eventId));
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const handleAttendanceClick = async (event) => {
    setSelectedEvent(event);
    try {
      const response = await api.get(`${base_url}fellowships/${fellowship.id}/events/${event.id}/attendance/`);
      setAttendance(response.data);
      setAttendanceModalOpen(true);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance data");
    }
  };

  const markAttendance = async (memberId, isPresent) => {
    try {
      await api.post(`${base_url}fellowships/${fellowship.id}/events/${selectedEvent.id}/attendance/`, {
        member: memberId,
        is_present: isPresent
      });
      
      // Update local state
      setAttendance(attendance.map(item => 
        item.member.id === memberId ? { ...item, is_present: isPresent } : item
      ));
      
      toast.success("Attendance updated");
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fellowship && (
        <div className="bg-white rounded-lg shadow-md p-6 col-span-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{fellowship.name} Fellowship</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><span className="font-medium">Location:</span> {fellowship.location}</p>
              <p className="text-gray-600"><span className="font-medium">Meeting Day:</span> {fellowship.meeting_day || "Not set"}</p>
              <p className="text-gray-600"><span className="font-medium">Meeting Time:</span> {fellowship.meeting_time || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-600"><span className="font-medium">Leader:</span> {userData?.first_name} {userData?.last_name}</p>
              <p className="text-gray-600"><span className="font-medium">Members:</span> {members.length}</p>
              <p className="text-gray-600"><span className="font-medium">Upcoming Events:</span> {events.filter(event => new Date(event.date) >= new Date()).length}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Members</h3>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{members.length}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("members")} className="text-blue-600 hover:underline">
            View all members
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Events</h3>
          <Calendar className="h-8 w-8 text-indigo-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{events.length}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("events")} className="text-blue-600 hover:underline">
            Manage events
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Prayer Requests</h3>
          <MessageSquare className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{prayerRequests.length}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("prayer-requests")} className="text-blue-600 hover:underline">
            View prayer requests
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Testimonies</h3>
          <FileText className="h-8 w-8 text-yellow-600" />
        </div>
        <p className="text-3xl font-bold mt-4">{testimonies.length}</p>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="#" onClick={() => setActiveTab("testimonies")} className="text-blue-600 hover:underline">
            View testimonies
          </Link>
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
            Fellowship Members
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
                Member
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {member.profile_image ? (
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={member.profile_image} 
                          alt={member.username} 
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {member.first_name.charAt(0)}{member.last_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.first_name} {member.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{member.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.email || "No email"}</div>
                  <div className="text-sm text-gray-500">{member.telephone || "No phone"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {member.attendance_rate ? `${member.attendance_rate}%` : "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Last attended: {member.last_attendance ? new Date(member.last_attendance).toLocaleDateString() : "Never"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleMemberClick(member)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No members found
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
            Fellowship Events
          </h3>
          <button
            onClick={() => setEventModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
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
                  {event.is_online ? (
                    <span className="text-indigo-600">Online Meeting</span>
                  ) : (
                    event.location
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${new Date(event.date) > new Date() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleAttendanceClick(event)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Attendance
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-900"
                  >
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

  const renderPrayerRequests = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">
          Fellowship Prayer Requests
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
                  {!request.is_answered && (
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      Mark as Answered
                    </button>
                  )}
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
          Fellowship Testimonies
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {testimonies.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No testimonies found
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
            Fellowship Leader Dashboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your fellowship members and activities
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-indigo-600 text-white">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3" />
                  <h2 className="text-lg font-semibold">Fellowship Controls</h2>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "overview"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="mr-3">📊</div>
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("members")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "members"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Users className="h-5 w-5 mr-3" />
                      Members
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("events")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "events"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Calendar className="h-5 w-5 mr-3" />
                      Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("prayer-requests")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "prayer-requests"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5 mr-3" />
                      Prayer Requests
                    </button>
                  </li>
                                    <li>
                    <button
                      onClick={() => setActiveTab("testimonies")}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                        activeTab === "testimonies"
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Testimonies
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <>
                {activeTab === "overview" && renderOverview()}
                {activeTab === "members" && renderMembers()}
                {activeTab === "events" && renderEvents()}
                {activeTab === "prayer-requests" && renderPrayerRequests()}
                {activeTab === "testimonies" && renderTestimonies()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      {memberModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Member Details</h3>
                <button
                  onClick={() => setMemberModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="flex-shrink-0 h-24 w-24 mb-4 sm:mb-0 sm:mr-6">
                  {selectedMember.profile_image ? (
                    <img 
                      className="h-24 w-24 rounded-full object-cover" 
                      src={selectedMember.profile_image} 
                      alt={selectedMember.username} 
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl">
                      {selectedMember.first_name.charAt(0)}{selectedMember.last_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedMember.first_name} {selectedMember.middle_name ? selectedMember.middle_name + " " : ""}{selectedMember.last_name}
                  </h4>
                  <p className="text-gray-500">@{selectedMember.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Email</h5>
                  <p className="text-gray-900">{selectedMember.email || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Phone</h5>
                  <p className="text-gray-900">{selectedMember.telephone || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Gender</h5>
                  <p className="text-gray-900">{selectedMember.gender || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h5>
                  <p className="text-gray-900">{selectedMember.dob || "Not provided"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Joined</h5>
                  <p className="text-gray-900">
                    {selectedMember.date_joined 
                      ? new Date(selectedMember.date_joined).toLocaleDateString() 
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Attendance Rate</h5>
                  <p className="text-gray-900">{selectedMember.attendance_rate ? `${selectedMember.attendance_rate}%` : "N/A"}</p>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-500 mb-1">Address</h5>
                <p className="text-gray-900">{selectedMember.address || "Not provided"}</p>
                {selectedMember.digital_address && (
                  <p className="text-gray-500 text-sm mt-1">Digital: {selectedMember.digital_address}</p>
                )}
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-500 mb-1">Occupation</h5>
                <p className="text-gray-900">{selectedMember.occupation || "Not provided"}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h5 className="text-sm font-medium text-gray-500 mb-3">Recent Activities</h5>
                {selectedMember.recent_activities && selectedMember.recent_activities.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedMember.recent_activities.map((activity, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{activity.description} - {new Date(activity.date).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No recent activities</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Create New Event</h3>
                <button
                  onClick={() => setEventModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleCreateEvent}>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="time"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      id="is_online"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={newEvent.is_online}
                      onChange={(e) => setNewEvent({...newEvent, is_online: e.target.checked})}
                    />
                    <label htmlFor="is_online" className="ml-2 block text-sm text-gray-700">
                      This is an online event
                    </label>
                  </div>
                  
                  {newEvent.is_online ? (
                    <div>
                      <label htmlFor="meeting_link" className="block text-sm font-medium text-gray-700 mb-1">
                        Meeting Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        id="meeting_link"
                        required={newEvent.is_online}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={newEvent.meeting_link}
                        onChange={(e) => setNewEvent({...newEvent, meeting_link: e.target.value})}
                        placeholder="https://zoom.us/j/123456789"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        required={!newEvent.is_online}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {attendanceModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Attendance for {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setAttendanceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
              </p>
            </div>
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-700">
                  Mark attendance for fellowship members
                </h4>
                <div className="text-sm text-gray-500">
                  Total Members: {members.length}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => {
                      const attendanceRecord = attendance.find(a => a.member.id === member.id);
                      const isPresent = attendanceRecord ? attendanceRecord.is_present : false;
                      
                      return (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {member.profile_image ? (
                                  <img 
                                    className="h-10 w-10 rounded-full" 
                                    src={member.profile_image} 
                                    alt={member.username} 
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                    {member.first_name.charAt(0)}{member.last_name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.first_name} {member.last_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  @{member.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.email || "No email"}</div>
                            <div className="text-sm text-gray-500">{member.telephone || "No phone"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => markAttendance(member.id, true)}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  isPresent 
                                    ? 'bg-green-100 text-green-800 border-2 border-green-500' 
                                    : 'bg-gray-100 text-gray-800 hover:bg-green-50'
                                }`}
                              >
                                <Check className="h-4 w-4 inline-block mr-1" />
                                Present
                              </button>
                              <button
                                onClick={() => markAttendance(member.id, false)}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  !isPresent && attendanceRecord
                                    ? 'bg-red-100 text-red-800 border-2 border-red-500' 
                                    : 'bg-gray-100 text-gray-800 hover:bg-red-50'
                                }`}
                              >
                                <X className="h-4 w-4 inline-block mr-1" />
                                Absent
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {members.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                          No members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setAttendanceModalOpen(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FellowshipLeaderDashboard;