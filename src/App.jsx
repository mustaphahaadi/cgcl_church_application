// import SystemLogs from "./logs/SystemLogs";
// import { initializeLogs } from "./logs/initial-logs";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
import Home from "./pages/Home"; // Import the Home component
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Sermons from "./pages/Sermons";
import NotFound from "./pages/NotFound";
import Give from "./pages/Give";
import Ministries from "./pages/Ministries";
import Signup from "./pages/Signup";
import YouthMinistry from "./pages/YouthMinistry";
import WorshipTeam from "./pages/WorshipTeam";
import Fellowships from "./pages/Fellowships";
import Testimonies from "./pages/Testimonies";
import TestimonyShare from "./pages/TestimonyShare";
import Profile from "./pages/Profile";
import MemberFellowship from "./pages/MemberFellowship";
import { ToastContainer } from "react-toastify";
import ServiceTimes from "./pages/ServiceTimes";
import Outreach from "./pages/Outreach";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import LiveStream from "./pages/LiveStream";
import PrayerRequests from "./pages/PrayerRequests"; // Add this import
import api from "./utils/api";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { api_endpoint } from "./hooks/apiHooks";
import ProfileCompletion from "./pages/ProfileCompletion";


function App() {
  useEffect(() => {
    // const navigator = useNavigate()
    const interval = setInterval(() => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        api
          .post(`${api_endpoint}auth/refresh/`, { refresh: refreshToken })
          .then((res) => {
            const newToken = res.data.access;
            const newrefreshToken = res.data.refresh;
            localStorage.setItem("access_token", newToken);
            localStorage.setItem("refresh_token", newrefreshToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          })
          .catch((err) => {
            console.error("Error refreshing token:", err);
            // navigator("/login");
          });
      }
    }, 9 * 60 * 1000); // Refresh every 9 minutes
    return () => clearInterval(interval);
  }, []);

  // Call this before rendering your app
  // initializeLogs();
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/TestimonyShare" element={<TestimonyShare />} />
            <Route path="/Testimonies" element={<Testimonies />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Sermons" element={<Sermons />} />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute>
                  <ProfileCompletion />
                </ProtectedRoute>
              }
            />
            <Route path="/MemberFellowship" element={<MemberFellowship />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/member-fellowship" element={<MemberFellowship />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Give" element={<Give />} />
            <Route path="/Ministries" element={<Ministries />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/YouthMinistry" element={<YouthMinistry />} />
            <Route path="/WorshipTeam" element={<WorshipTeam />} />
            <Route path="/Fellowships" element={<Fellowships />} />
            <Route path="/Service-times" element={<ServiceTimes />} />
            <Route path="/Outreach" element={<Outreach />} />
            <Route path="/live-stream" element={<LiveStream />} />
            <Route path="/prayer-requests" element={<PrayerRequests />} />
{/*             <Route path="/system-logs" element={<SystemLogs />} /> */}
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
