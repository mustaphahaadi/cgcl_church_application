import { Link } from "react-router-dom"; // Import Link for navigation

const Sermons = () => {
  return (
    <div>
      <h2>Sermons</h2>
      <p>Listen to our latest sermons and teachings.</p>
      <Link to="/contact">Contact Us</Link> {/* Link to Contact page */}
      <Link to="/about">About Us</Link> {/* Link to About page */}
    </div>
  );
};

export default Sermons;