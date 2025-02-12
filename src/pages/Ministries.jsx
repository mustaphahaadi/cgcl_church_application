const ministriesList = [
  {
    title: "Worship Services",
    description:
      "Join us for uplifting worship every Sunday at 9:00 AM and 11:00 AM.",
    icon: "🛐",
    link: "/worship-services",
  },
  {
    title: "Youth Ministry",
    description:
      "A vibrant community for our youth to grow in faith and friendship.",
    icon: "👦👧",
    link: "/YouthMinistry",
  },
  {
    title: "Community Outreach",
    description:
      "Engaging with our local community through service and support.",
    icon: "🤝",
    link: "/community-outreach",
  },
  {
    title: "Bible Study",
    description:
      "Deepen your understanding of the Word through weekly Bible studies.",
    icon: "📖",
    link: "/bible-study",
  },
  {
    title: "Prayer Group",
    description:
      "Join us in prayer every Wednesday evening to lift each other up.",
    icon: "🙏",
    link: "/prayer-group",
  },
  {
    title: "Family Events",
    description:
      "Fun and engaging events for families to connect and grow together.",
    icon: "👨‍👩‍👧‍👦",
    link: "/family-events",
  },
];

const Ministries = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 text-center p-3">Ministries</h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Explore the various ministries we offer to help you grow in faith and
        community.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministriesList.map((ministry, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
          >
            <div className="text-5xl mb-4 text-center">{ministry.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {ministry.title}
            </h3>
            <p className="text-gray-600 text-center mb-4">
              {ministry.description}
            </p>
            <div className="text-center">
              <a
                href={ministry.link}
                className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ministries;
