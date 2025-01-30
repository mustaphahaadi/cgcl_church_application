import "../styles/Features.css";

function Features() {
  const featuresList = [
    {
      title: "Worship Services",
      description: "Sunday Services at 9:00 AM & 11:00 AM",
      icon: "🎵", // You can replace this with an actual icon library like FontAwesome
    },
    {
      title: "Community",
      description: "Join our growing family of believers",
      icon: "👨‍👩‍👧‍👦", // You can replace this with an actual icon library like FontAwesome
    },
    {
      title: "Events",
      description: "Participate in our upcoming events",
      icon: "📅", // You can replace this with an actual icon library like FontAwesome
    },
  ];

  return (
    <section className="features">
      <h2 className="features-title">What We Offer</h2>
      <p className="features-subtitle">
        Explore the ways you can connect and grow with us.
      </p>
      <div className="features-grid">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
