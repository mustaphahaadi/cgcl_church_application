// import "../styles/Features.css";

function Features() {
  const featuresList = [
    {
      title: "Worship Services",
      description: "Sunday Services at 9:00 AM & 11:00 AM",
      icon: "🛐",
    },
    {
      title: "Community",
      description: "Join our growing family of believers",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Events",
      description: "Participate in our upcoming events",
      icon: "📅",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto p-10 text-center">
      <h2 className="text-4xl text-gray-800 mb-2">What We Offer</h2>
      <p className="text-lg text-gray-600 mb-10">
        Explore the ways you can connect and grow with us.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg p-8 shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-5xl mb-5">{feature.icon}</div>
            <h3 className="text-2xl text-blue-600 mb-2">{feature.title}</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
