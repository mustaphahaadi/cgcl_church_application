const YouthMinistry = () => {
  const activities = [
    {
      title: "Weekly Meetings",
      description: "Join us every Friday at 6 PM for fellowship and fun!",
    },
    {
      title: "Community Service",
      description: "Participate in our monthly community service projects.",
    },
    {
      title: "Retreats",
      description: "Annual retreats for spiritual growth and bonding.",
    },
    {
      title: "Game Nights",
      description: "Enjoy game nights every second Saturday of the month.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Youth Ministry</h1>
        <p className="mt-2 text-lg text-gray-700">
          A vibrant community for our youth to grow in faith and friendship.
        </p>
      </header>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Upcoming Activities
        </h2>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {activity.title}
              </h3>
              <p className="text-gray-600">{activity.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <footer className="text-center mt-8">
        <p className="text-gray-600">Join us and be part of our community!</p>
      </footer>
    </div>
  );
};

export default YouthMinistry;
