import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">CGCL CHURCH</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/pages/About" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/pages/Events" className="nav-link">
              Events
            </Link>
          </li>
          <li>
            <Link to="/pages/Sermons" className="nav-link">
              Sermons
            </Link>
          </li>
          <li>
            <Link to="/pages/Contact" className="contact-button">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
