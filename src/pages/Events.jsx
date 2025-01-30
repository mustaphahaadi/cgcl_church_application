import { Link } from "react-router-dom";
import "../styles/Events.css"; // Import a CSS file for styling

const Events = () => {
  // Sample event data (replace with real data from your backend or API)
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "October 15, 2023",
      time: "10:00 AM",
      location: "Main Sanctuary",
      description: "Join us for a powerful time of worship and teaching.",
    },
    {
      id: 2,
      title: "Youth Night",
      date: "October 20, 2023",
      time: "7:00 PM",
      location: "Youth Hall",
      description:
        "A fun and engaging night for teens with games, music, and a message.",
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "October 22, 2023",
      time: "9:00 AM",
      location: "Downtown Park",
      description:
        "Help us serve the community with food, clothing, and prayer.",
    },
  ];

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <p className="events-subtitle">
        Check out our calendar for upcoming events and services.
      </p>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{event.date}</p>
            <p className="event-time">{event.time}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
            <button className="event-button">Learn More</button>
          </div>
        ))}
      </div>
      <div className="page-links">
        <Link to="/" className="page-link">
          Home
        </Link>
        <Link to="/about" className="page-link">
          About Us
        </Link>
        <Link to="/contact" className="page-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Events;
