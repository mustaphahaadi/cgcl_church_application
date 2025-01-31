import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // Import the Home component
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Sermons from "./pages/Sermons";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/pages/About" element={<About />} />
          <Route path="/pages/Contact" element={<Contact />} />
          <Route path="/pages/Events" element={<Events />} />
          <Route path="/pages/Sermons" element={<Sermons />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
