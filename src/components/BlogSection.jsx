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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest News & Blog Posts
        </h2>
        <Slider {...settings}>
          {posts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white p-6 h-64 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                <p className="text-gray-800 mb-4">{post.excerpt}</p>
              </div>
              <a
                href={post.link}
                className="inline-block bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300 self-start"
              >
                Read More
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BlogSection;
