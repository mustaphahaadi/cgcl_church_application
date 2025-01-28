import '../styles/Features.css'

function Features() {
  const featuresList = [
    {
      title: "Worship Services",
      description: "Sunday Services at 9:00 AM & 11:00 AM"
    },
    {
      title: "Community",
      description: "Join our growing family of believers"
    },
    {
      title: "Events",
      description: "Participate in our upcoming events"
    }
  ]

  return (
    <section className="features">
      {featuresList.map((feature, index) => (
        <div key={index} className="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  )
}

export default Features