"use client";

import { Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// Import images at the top
import newsImage1 from "../assets/news-1.png";
import newsImage2 from "../assets/news-2.png";

const NewsSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const topStories = [
    {
      category: "EVENTS",
      date: "AUGUST 20",
      title: "ANNUAL CHURCH RETREAT DRAWS RECORD ATTENDANCE",
      excerpt:
        "Over 250 members participated in our annual church retreat at Lake Harmony, setting a new attendance record for the fifth consecutive year.",
      image: newsImage1,
    },
    {
      category: "MINISTRY",
      date: "AUGUST 20",
      title: "OUTREACH PROGRAM HELPS 120 FAMILIES IN NEED",
      excerpt:
        "Church volunteers distributed food, clothing, and essential supplies to 120 families affected by recent economic hardships in our community.",
      image: newsImage1,
    },
  ];

  const trendingStories = [
    {
      number: 1,
      title: "Youth worship night attracts community teens",
      image: newsImage1,
    },
    {
      number: 2,
      title: "New worship album recorded live at Sunday service",
      image: newsImage1,
    },
    {
      number: 3,
      title: "Pastor's sermon series on faith draws online audience",
      image: newsImage2,
    },
    {
      number: 4,
      title: "Church expands children's ministry with new facilities",
      image: newsImage2,
    },
    {
      number: 5,
      title: "Mission team returns from successful trip to Guatemala",
      image: newsImage1,
    },
  ];

  const latestNews = [
    {
      category: "WORSHIP",
      timing: "JUST NOW",
      title: "Special Easter service preparations underway",
      image: newsImage2,
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
      image: newsImage2,
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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          {/* <h2 ">Current Time</h2> */}
          <span className="text-2xl font-bold text-gray-900">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOP STORIES */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              TOP STORIES
            </h2>
            <div className="space-y-6">
              {topStories.map((story, index) => (
                <div key={index} className="mb-8">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <div className="flex items-center text-sm mb-2">
                    <span className="text-secondary font-medium">
                      {story.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">{story.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{story.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-800">TRENDING</h2>
              <TrendingUp className="text-gray-400 h-5 w-5" />
            </div>
            <div className="space-y-6">
              {trendingStories.map((story, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-5xl font-light text-blue-200 leading-none">
                    {story.number}
                  </div>
                  <div className="flex gap-3">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                    <h3 className="text-sm font-medium text-gray-800">
                      {story.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LATEST NEWS */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-800">LATEST NEWS</h2>
              <Clock className="text-gray-400 h-5 w-5" />
            </div>
            <div className="divide-y">
              {latestNews.map((news, index) => (
                <div key={index} className="py-4">
                  <div className="flex gap-4">
                    {news.image && (
                      <img
                        src={news.image || "/placeholder.svg"}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div
                      className={`${news.image ? "" : "border-l-4 pl-3"} ${
                        news.category === "WORSHIP"
                          ? "border-blue-500"
                          : news.category === "COMMUNITY"
                          ? "border-green-500"
                          : news.category === "EVENTS"
                          ? "border-orange-500"
                          : news.category === "MINISTRY"
                          ? "border-purple-500"
                          : "border-red-500"
                      }`}
                    >
                      <div className="flex items-center text-xs mb-1">
                        <span className="text-gray-500 font-medium">
                          {news.category}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-400">{news.timing}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-800">
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
    </section>
  );
};

export default NewsSection;
