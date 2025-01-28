import '../styles/Navbar.css'
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <a href="/">Church App</a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/about" className="nav-link">About</a></li>
          <li><a href="/services" className="nav-link">Services</a></li>
          <li><a href="/events" className="nav-link">Events</a></li>
          <li><a href="/contact" className="nav-link contact-btn">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar