import churchImage from "../assets/about-img.jpeg";


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
           <span className="text-blue-600">About Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A vibrant community of believers dedicated to spreading the love of Christ 
            and serving our community in Kuamsi, Ghana.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <img
              src={churchImage}
              alt="Church"
              className="relative rounded-2xl w-fit h-[500px] object-cover shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2025, our church has been a cornerstone of faith and fellowship 
                in Kuamsi, Ghana. We offer a variety of programs, including worship services, 
                Bible studies, youth groups, and community outreach initiatives.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/ministries"
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 shadow-sm hover:shadow group"
              >
                <span>Our Ministries</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/events"
                className="flex items-center justify-center px-6 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition duration-300 shadow-sm hover:shadow group"
              >
                <span>Upcoming Events</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Faith", description: "We believe in the transformative power of faith in Jesus Christ" },
              { title: "Community", description: "We are committed to building a loving and supportive community" },
              { title: "Service", description: "We strive to serve our community and those in need" },
              { title: "Growth", description: "We encourage spiritual growth through Bible study and fellowship" }
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;