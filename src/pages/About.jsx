import "../styles/About.css"; // Import the new CSS file
import churchImage from "../assets/about-img.jpeg"; // Replace with your image path

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <div className="about-card">
        <div className="about-image">
          <img src={churchImage} alt="Church" />
        </div>
        <div className="about-content">
          <p>
            welcome to <strong>CGCL CHURCH!</strong> We are a community of
            believers dedicated to spreading the love of Christ and serving our
            community. Our mission is to inspire, empower, and uplift everyone
            who walks through our doors.
          </p>
          <p>
            Founded in 2025, our church has been a cornerstone of faith and
            fellowship in Kuamsi, Ghana. We offer a variety of programs,
            including worship services, Bible studies, youth groups, and
            community outreach initiatives.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default About;
