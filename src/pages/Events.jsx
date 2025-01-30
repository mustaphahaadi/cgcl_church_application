import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <h2>Upcoming Events</h2>
      <p>Check out our calendar for upcoming events and services.</p>
      <Link to="/contact">Contact Us</Link>
      <Link to="/about">About Us</Link>
    </div>
  );
};

export default Events;