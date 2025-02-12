import churchImage from "../assets/about-img.jpeg"; // Replace with your image path

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        About Us
      </h1>
      <div className="flex flex-col md:flex-row bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex-1 min-w-[300px]">
          <img
            src={churchImage}
            alt="Church"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-2 p-6 flex flex-col justify-center">
          <p className="text-lg text-gray-600 mb-4">
            Welcome to <strong className="text-blue-600">CGCL CHURCH!</strong>{" "}
            We are a community of believers dedicated to spreading the love of
            Christ and serving our community. Our mission is to inspire,
            empower, and uplift everyone who walks through our doors.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Founded in 2025, our church has been a cornerstone of faith and
            fellowship in Kuamsi, Ghana. We offer a variety of programs,
            including worship services, Bible studies, youth groups, and
            community outreach initiatives.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="/ministries"
              className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300"
            >
              Our Ministries
            </a>
            <a
              href="/events"
              className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 transition duration-300"
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Values
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>
            Faith: We believe in the transformative power of faith in Jesus
            Christ.
          </li>
          <li>
            Community: We are committed to building a loving and supportive
            community.
          </li>
          <li>Service: We strive to serve our community and those in need.</li>
          <li>
            Growth: We encourage spiritual growth through Bible study and
            fellowship.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
