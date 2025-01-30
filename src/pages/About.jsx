import { Link } from "react-router-dom";
import "../styles/About.css"; // Import a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to [Your Church Name]! We are a community of believers dedicated
        to spreading the love of Christ and serving our community. Our mission
        is to inspire, empower, and uplift everyone who walks through our doors.
      </p>
      <p>
        Founded in [Year], our church has been a cornerstone of faith and
        fellowship in [Location]. We offer a variety of programs, including
        worship services, Bible studies, youth groups, and community outreach
        initiatives.
      </p>
      <div className="about-links">
        <Link to="/pages/Contact" className="about-link">
          Contact Us
        </Link>
        <Link to="/" className="about-link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default About;
