import { Clock, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const BlogSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const topStories = [
    {
      category: "SERMONS",
      date: "AUGUST 20",
      title: "NEW SERIES: The Power of Faith",
      excerpt:
        "Our new sermon series, 'The Power of Faith', explores the transformative power of faith in our daily lives.",
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      category: "TESTIMONIES",
      date: "AUGUST 20",
      title: "Member Testimony: Overcoming Addiction",
      excerpt:
        "Read how one of our members overcame addiction through the power of faith and the support of our church community.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
  ];

  const trendingStories = [
    {
      number: 1,
      title: "Youth worship night attracts community teens",
      image:
        "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      number: 2,
      title: "New worship album recorded live at Sunday service",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      number: 3,
      title: "Pastor's sermon series on faith draws online audience",
      image:
        "https://images.unsplash.com/photo-1490127252417-7c393f993ee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      number: 4,
      title: "Church expands children's ministry with new facilities",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      number: 5,
      title: "Mission team returns from successful trip to Guatemala",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
  ];

  const latestNews = [
    {
      category: "WORSHIP",
      timing: "JUST NOW",
      title: "Special Easter service preparations underway",
      image:
        "https://images.unsplash.com/photo-1445633629932-0029acc44e88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      category: "COMMUNITY",
      timing: "JUST NOW",
      title: "Church partners with local schools for mentorship program",
      image: null,
    },
    {
      category: "EVENTS",
      timing: "5 MINS AGO",
      title: "Christmas concert tickets now available for reservation",
      image:
        "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    {
      category: "MINISTRY",
      timing: "12 MINS AGO",
      title: "Women's Bible study group launches new 8-week series",
      image: null,
    },
    {
      category: "MISSIONS",
      timing: "30 MINS AGO",
      title: "Fundraising goal reached for clean water project in Kenya",
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Clock Header */}
          <div className="flex items-center justify-between mb-12 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900 font-mono tracking-tight">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Sermons */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                RECENT SERMONS
              </h2>
              <div className="space-y-8">
                {topStories.map((story, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center text-sm text-white/90 mb-2">
                          <span className="font-medium">{story.category}</span>
                          <span className="mx-2">•</span>
                          <span>{story.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600">{story.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Sermons */}
            <div className="lg:col-span-3">
              <div className="sticky top-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-blue-900">TRENDING</h2>
                  <TrendingUp className="text-blue-600 h-6 w-6" />
                </div>
                <div className="space-y-6">
                  {trendingStories.map((story, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 items-start bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-5xl font-light text-blue-200 leading-none">
                        {story.number}
                      </div>
                      <div className="space-y-3 flex-1">
                        <img
                          src={story.image}
                          alt=""
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Latest Testimonies */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-blue-900">
                    LATEST UPDATES
                  </h2>
                  <Clock className="text-blue-600 h-6 w-6" />
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                  {latestNews.map((news, index) => (
                    <div
                      key={index}
                      className={`group relative ${
                        index !== latestNews.length - 1
                          ? "pb-6 border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        {news.image ? (
                          <img
                            src={news.image}
                            alt=""
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div
                            className={`w-1 self-stretch rounded-full ${
                              news.category === "WORSHIP"
                                ? "bg-blue-500"
                                : news.category === "COMMUNITY"
                                ? "bg-green-500"
                                : news.category === "EVENTS"
                                ? "bg-orange-500"
                                : news.category === "MINISTRY"
                                ? "bg-purple-500"
                                : "bg-red-500"
                            }`}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center text-xs mb-2">
                            <span
                              className={`font-medium ${
                                news.category === "WORSHIP"
                                  ? "text-blue-500"
                                  : news.category === "COMMUNITY"
                                  ? "text-green-500"
                                  : news.category === "EVENTS"
                                  ? "text-orange-500"
                                  : news.category === "MINISTRY"
                                  ? "text-purple-500"
                                  : "text-red-500"
                              }`}
                            >
                              {news.category}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-400">{news.timing}</span>
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {news.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
