import { Link } from "react-router-dom";
import "../styles/Sermons.css"; // Import a CSS file for styling

const Sermons = () => {
  // Sample sermon data (replace with real data from your backend or API)
  const sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      date: "October 8, 2023",
      speaker: "Pastor John Doe",
      series: "Faith Series",
      description:
        "Explore the transformative power of faith in our daily lives.",
      audioLink: "https://example.com/sermon1",
      videoLink: "https://example.com/sermon1-video",
    },
    {
      id: 2,
      title: "Living in Grace",
      date: "October 1, 2023",
      speaker: "Pastor Jane Smith",
      series: "Grace Series",
      description: "Discover how to live a life full of grace and forgiveness.",
      audioLink: "https://example.com/sermon2",
      videoLink: "https://example.com/sermon2-video",
    },
    {
      id: 3,
      title: "The Joy of Giving",
      date: "September 24, 2023",
      speaker: "Guest Speaker Mark Lee",
      series: "Generosity Series",
      description: "Learn the joy and impact of giving generously.",
      audioLink: "https://example.com/sermon3",
      videoLink: "https://example.com/sermon3-video",
    },
  ];

  return (
    <div className="sermons-container">
      <h2>Sermons</h2>
      <p className="sermons-subtitle">
        Listen to our latest sermons and teachings.
      </p>
      <div className="sermons-filters">
        <select className="filter-select">
          <option value="all">All Series</option>
          <option value="faith">Faith Series</option>
          <option value="grace">Grace Series</option>
          <option value="generosity">Generosity Series</option>
        </select>
        <select className="filter-select">
          <option value="all">All Speakers</option>
          <option value="john-doe">Pastor John Doe</option>
          <option value="jane-smith">Pastor Jane Smith</option>
          <option value="mark-lee">Guest Speaker Mark Lee</option>
        </select>
      </div>
      <div className="sermons-list">
        {sermons.map((sermon) => (
          <div key={sermon.id} className="sermon-card">
            <h3 className="sermon-title">{sermon.title}</h3>
            <p className="sermon-date">{sermon.date}</p>
            <p className="sermon-speaker">Speaker: {sermon.speaker}</p>
            <p className="sermon-series">Series: {sermon.series}</p>
            <p className="sermon-description">{sermon.description}</p>
            <div className="sermon-links">
              <a
                href={sermon.audioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sermon-link"
              >
                Listen
              </a>
              <a
                href={sermon.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sermon-link"
              >
                Watch
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="page-links">
        <Link to="/" className="page-link">
          Home
        </Link>
        <Link to="/pages/About" className="page-link">
          About Us
        </Link>
        <Link to="/pages/Contact" className="page-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Sermons;
