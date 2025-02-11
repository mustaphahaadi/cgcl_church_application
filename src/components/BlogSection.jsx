import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogSection = () => {
  const posts = [
    {
      title: "Community Outreach: Helping Hands",
      date: "March 15, 2023",
      excerpt:
        "Our recent outreach program was a success! We helped over 100 families in need...",
      link: "/blog/community-outreach-helping-hands",
    },
    {
      title: "Youth Retreat Highlights",
      date: "February 28, 2023",
      excerpt:
        "The youth retreat was filled with fun, fellowship, and spiritual growth. Here are some highlights...",
      link: "/blog/youth-retreat-highlights",
    },
    {
      title: "Upcoming Events You Don't Want to Miss",
      date: "March 1, 2023",
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
              className={`rounded-lg shadow-md overflow-hidden p-6 transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                index % 2 === 0 ? "bg-blue-200" : "bg-green-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <p className="text-gray-800 mb-4">{post.excerpt}</p>
              <a
                href={post.link}
                className="text-blue-600 hover:underline font-bold"
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
