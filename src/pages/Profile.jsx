const Profile = () => {
  // Sample user data, you can replace this with actual data from your state or API
  const user = {
    firstName: "Kwame",
    lastName: "Mensah",
    email: "kwame.mensah@example.com",
    phone: "+233 123 456 7890",
    address: "Otumfuo Street, Kumasi",
    occupation: "Software Developer",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-gray-600">{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
            <p className="text-gray-600">{user.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <p className="text-gray-600">{user.address}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Occupation</h2>
            <p className="text-gray-600">{user.occupation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
