

const Sermons = () => {
  // Sample sermon data (replace with real data from your backend or API)
  const sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      date: "January 10, 2025",
      speaker: "Pastor Kusi Daniel",
      series: "Faith Series",
      description:
        "Explore the transformative power of faith in our daily lives.",
      audioLink: "https://example.com/sermon1",
      videoLink: "https://example.com/sermon1-video",
    },
    {
      id: 2,
      title: "Living in Grace",
      date: "October 1, 2024",
      speaker: "Pastor Kwame Akwasi",
      series: "Grace Series",
      description: "Discover how to live a life full of grace and forgiveness.",
      audioLink: "https://example.com/sermon2",
      videoLink: "https://example.com/sermon2-video",
    },
    {
      id: 3,
      title: "The Joy of Giving",
      date: "January 24, 2025",
      speaker: "Guest Speaker Mark Lee",
      series: "Generosity Series",
      description: "Learn the joy and impact of giving generously.",
      audioLink: "https://example.com/sermon3",
      videoLink: "https://example.com/sermon3-video",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Sermons</h1>
      <p className="text-lg text-gray-600 mb-10">
        Listen to our latest sermons and teachings.
      </p>
      <div className="mb-6 flex justify-center gap-4">
        <select className="border-2 border-blue-500 rounded-lg p-2 text-gray-800">
          <option value="all">All Series</option>
          <option value="faith">Faith Series</option>
          <option value="grace">Grace Series</option>
          <option value="generosity">Generosity Series</option>
        </select>
        <select className="border-2 border-blue-500 rounded-lg p-2 text-gray-800">
          <option value="all">All Speakers</option>
          <option value="john-doe">Pastor John Doe</option>
          <option value="jane-smith">Pastor Jane Smith</option>
          <option value="mark-lee">Guest Speaker Mark Lee</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="bg-white border border-gray-300 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105"
          >
            <h3 className="text-2xl text-blue-600 mb-2">{sermon.title}</h3>
            <p className="text-sm text-gray-500 mb-1">{sermon.date}</p>
            <p className="text-gray-800 mb-1">Speaker: {sermon.speaker}</p>
            <p className="text-orange-500 font-bold mb-2">
              Series: {sermon.series}
            </p>
            <p className="text-gray-600 mb-4">{sermon.description}</p>
            <div className="flex justify-center gap-4">
              <a
                href={sermon.audioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
              >
                Listen
              </a>
              <a
                href={sermon.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 text-white rounded-md px-4 py-2 hover:bg-teal-600 transition duration-300"
              >
                Watch
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sermons;
