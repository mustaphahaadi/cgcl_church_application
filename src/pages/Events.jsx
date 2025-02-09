import "../styles/Events.css";
const Events = () => {
  // Sample event data (replace with real data from your backend or API)
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "October 15, 2025",
      time: "10:00 AM",
      location: "Main Sanctuary",
      description: "Join us for a powerful time of worship and teaching.",
    },
    {
      id: 2,
      title: "Youth Night",
      date: "October 20, 2025",
      time: "7:00 PM",
      location: "Youth Hall",
      description:
        "A fun and engaging night for teens with games, music, and a message.",
    },
    {
      id: 3,
      title: "Community Outreach",
      date: "December 22, 2025",
      time: "9:00 AM",
      location: "Downtown Park",
      description:
        "Help us serve the community with food, clothing, and prayer.",
    },
  ];

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <p className="events-subtitle">
        Check out our calendar for upcoming events and services.
      </p>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h4 className="event-title">{event.title}</h4>
            <p className="event-date">{event.date}</p>
            <p className="event-time">{event.time}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
            <button className="event-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
