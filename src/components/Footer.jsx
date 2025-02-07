import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are a welcoming community dedicated to spreading God love and
            message of hope.
          </p>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li> Service Times</li>
            <li>Ministries</li>
            <li>Give Online</li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <p>123 Church Street</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@churchapp.com</p>
        </div>
        <div className="footer-section connect">
          <h3>Connect With Us</h3>

          {/* Add social media icons or links here */}
          <div className="social-icons">
            <div className="social-icons">
              <a
                href="#"
                className="social-icon"
                style={{ marginRight: "20px" }}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social-icon"
                style={{ marginRight: "20px" }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Church App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

