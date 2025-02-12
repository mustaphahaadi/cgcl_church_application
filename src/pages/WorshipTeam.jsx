
const WorshipTeam = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Lead Vocalist",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Guitarist",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emily Johnson",
      role: "Pianist",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Michael Brown",
      role: "Drummer",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Worship Team</h1>
        <p className="mt-2 text-lg text-gray-700">
          Meet our dedicated worship team who leads us in praise and worship.
        </p>
      </header>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="text-center mt-8">
        <p className="text-gray-600">Join us in worship every Sunday!</p>
      </footer>
    </div>
  );
};

export default WorshipTeam;
