import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogSection = () => {
  const posts = [
    {
      title: "Community Outreach: Helping Hands",
      date: "March 15, 2025",
      excerpt:
        "Our recent outreach program was a success! We helped over 100 families in need...",
      link: "/blog/community-outreach-helping-hands",
    },
    {
      title: "Youth Retreat Highlights",
      date: "February 28, 2025",
      excerpt:
        "The youth retreat was filled with fun, fellowship, and spiritual growth. Here are some highlights...",
      link: "/blog/youth-retreat-highlights",
    },
    {
      title: "Upcoming Events You Don't Want to Miss",
      date: "March 1, 2024",
      excerpt:
        "Mark your calendars! We have several exciting events coming up this month...",
      link: "/blog/upcoming-events",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Latest <span className="text-blue-600">Updates</span>
        </h2>
        <div className="px-4">
          <Slider {...settings}>
            {posts.map((post, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col justify-between border border-gray-100">
                  <div>
                    <p className="text-blue-600 text-sm font-medium mb-3">
                      {post.date}
                    </p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <a
                    href={post.link}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
