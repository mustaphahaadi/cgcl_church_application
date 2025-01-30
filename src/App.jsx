import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/pages/Sermons" element={<Sermons />} />
        <Route path="/pages/About" element={<About />} />
        <Route path="/pages/Events" element={<Events />} />
        <Route path="/pages/Contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <main className="main-content">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;