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
import Profile from "./pages/Profile"; // Import the Profile component
import MemberFellowship from "./pages/MemberFellowship"; // Import the Member Fellowship component
// import LatestTestimonies from "./components/LatestTestimonies";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/TestimonyShare" element={<TestimonyShare />} />
          <Route path="/Testimonies" element={<Testimonies />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Sermons" element={<Sermons />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MemberFellowship" element={<MemberFellowship />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Give" element={<Give />} />
          <Route path="/Ministries" element={<Ministries />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/YouthMinistry" element={<YouthMinistry />} />
          <Route path="/WorshipTeam" element={<WorshipTeam />} />
          <Route path="/Fellowships" element={<Fellowships />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
