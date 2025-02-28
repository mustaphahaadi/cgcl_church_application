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
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the ways you can connect and grow with us.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
