// "use client";

import { useState } from "react";
import {
  Heart,
  Users,
  HandIcon as Hands,
  BookOpen,
  MapPin,
  Calendar,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import newsImage1 from "../assets/news-1.png";
import newsImage2 from "../assets/news-2.png";
import churchImage from "../assets/about-img.jpeg";
import pastorImage from "../assets/pastor.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <div
          className="relative h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${newsImage1})`,
          }}
        >
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About CLGC
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                A vibrant community of believers dedicated to spreading the love
                of Christ and serving our community in Kuamsi, Ghana.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <a
                  href="#visit"
                  className="px-8 py-3 bg-white text-blue-700 rounded-full font-medium hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Plan Your Visit
                </a>
                <a
                  href="#story"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="text-blue-600">City of Light Global Church</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            We are a church that believes in Jesus, loves God, and loves people.
            Whether {"you're"} a committed Christian or just beginning to explore
            faith, you are welcome here. Our hope is that you will find Grace
            Community Church to be a place where you can belong, grow, and make
            a difference.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </section>

      {/* Our Story & Mission Tabs */}
      <section id="story" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="sticky top-20">
                <div className="mb-8 inline-flex p-1 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`px-6 py-3 rounded-lg font-medium text-sm ${
                      activeTab === "story"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Our Story
                  </button>
                  <button
                    onClick={() => setActiveTab("mission")}
                    className={`px-6 py-3 rounded-lg font-medium text-sm ${
                      activeTab === "mission"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Mission & Vision
                  </button>
                  <button
                    onClick={() => setActiveTab("beliefs")}
                    className={`px-6 py-3 rounded-lg font-medium text-sm ${
                      activeTab === "beliefs"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Our Beliefs
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={newsImage2}
                    alt="Church"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white font-medium">
                      {activeTab === "story" &&
                        "Founded in 2005 in Kumasi, Ghana"}
                      {activeTab === "mission" &&
                        "Serving our community with love"}
                      {activeTab === "beliefs" && "Grounded in Biblical truth"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              {activeTab === "story" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Story
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Founded in 2005, CLGC began as a small
                    gathering of 15 families meeting in a local school. Our
                    founders had a vision to create a church that would be
                    deeply rooted in Biblical teaching while actively serving
                    the needs of Kumasi.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Over the years, {"we've"} grown to a congregation of over 500
                    members, but our commitment to authentic community and
                    compassionate service remains unchanged. In 2015, we moved
                    to our current location, which has allowed us to expand our
                    ministries and outreach programs.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Throughout our history, {"we've"} remained focused on being a
                    church where people can encounter God, connect with others,
                    and make a difference in our community and beyond.
                  </p>

                  <div className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Our Journey
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          year: "2005",
                          event: "Church founded with 15 families",
                        },
                        {
                          year: "2008",
                          event:
                            "Launched our first community outreach program",
                        },
                        {
                          year: "2012",
                          event:
                            "Started our youth ministry and children's program",
                        },
                        {
                          year: "2015",
                          event: "Moved to our current church building",
                        },
                        {
                          year: "2020",
                          event: "Expanded to include online services",
                        },
                        {
                          year: "2023",
                          event: "Celebrated reaching 500 members",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {item.year.substring(2)}
                            </div>
                            {index !== 5 && (
                              <div className="w-0.5 h-full bg-blue-100 mt-2"></div>
                            )}
                          </div>
                          <div className="pt-2">
                            <p className="font-medium text-gray-900">
                              {item.year}
                            </p>
                            <p className="text-gray-600">{item.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "mission" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Mission & Vision
                  </h2>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      To love God, love people, and make disciples who transform
                      our community and the world with the gospel of Jesus
                      Christ.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      To be a vibrant church family where people of all
                      backgrounds can encounter God&apos;s love, grow in faith,
                      and use their gifts to serve others.
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed pt-4">
                    We believe that the church should be at the center of
                    bringing hope and transformation to our community. {"That's"}
                    why {"we're"} committed to not just gathering on Sundays, but to
                    living out our faith every day of the week.
                  </p>

                  <div className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Strategic Priorities
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Worship",
                          description:
                            "Creating meaningful worship experiences",
                        },
                        {
                          title: "Discipleship",
                          description:
                            "Helping people grow in their faith journey",
                        },
                        {
                          title: "Community",
                          description: "Building authentic relationships",
                        },
                        {
                          title: "Service",
                          description:
                            "Meeting needs in our church and community",
                        },
                        {
                          title: "Outreach",
                          description:
                            "Sharing God's love locally and globally",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "beliefs" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Beliefs
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    At Grace Community Church, our beliefs are rooted in the
                    Bible and centered on Jesus Christ. We believe that the
                    Bible is {"God's"} Word and the ultimate authority for our faith
                    and practice.
                  </p>

                  <div className="space-y-4 pt-4">
                    {[
                      {
                        title: "God",
                        description:
                          "We believe in one God who exists in three persons: Father, Son, and Holy Spirit.",
                      },
                      {
                        title: "Jesus Christ",
                        description:
                          "We believe Jesus is the Son of God who came to earth, died for our sins, and rose again.",
                      },
                      {
                        title: "Holy Spirit",
                        description:
                          "We believe the Holy Spirit empowers Christians to live godly lives and serve effectively.",
                      },
                      {
                        title: "Salvation",
                        description:
                          "We believe salvation comes by grace through faith in Jesus Christ alone.",
                      },
                      {
                        title: "The Church",
                        description:
                          "We believe the church is God's primary way of accomplishing His purposes in the world.",
                      },
                      {
                        title: "The Bible",
                        description:
                          "We believe the Bible is God's inspired Word and our final authority.",
                      },
                    ].map((belief, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {belief.title}
                        </h3>
                        <p className="text-gray-600">{belief.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do as a church community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Faith",
                description:
                  "We believe in the transformative power of faith in Jesus Christ and seek to live out that faith daily.",
                icon: <BookOpen className="h-8 w-8" />,
              },
              {
                title: "Community",
                description:
                  "We are committed to building a loving and supportive community where everyone feels welcome and valued.",
                icon: <Users className="h-8 w-8" />,
              },
              {
                title: "Service",
                description:
                  "We strive to serve our community and those in need, following Jesus' example of selfless love.",
                icon: <Hands className="h-8 w-8" />,
              },
              {
                title: "Growth",
                description:
                  "We encourage spiritual growth through Bible study, prayer, worship, and authentic relationships.",
                icon: <Heart className="h-8 w-8" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section id="visit" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Visit Us This Sunday
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  {"We'd"} love to welcome you to our church family. Join us for
                  worship, fellowship, and spiritual growth.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 text-blue-200 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Service Times</p>
                      <p className="text-blue-100">
                        Sundays at 9:00 AM & 11:00 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-200 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-blue-100">
                        123 Church Street, Kuamsi, Ghana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-200 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Contact</p>
                      <p className="text-blue-100">+233 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-200 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-blue-100">info@gracechurch.org</p>
                    </div>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl w-fit"
                >
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>

              <div className="h-full min-h-[400px] bg-blue-800">
                <img
                  src={churchImage}
                  alt="Church Building"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals who guide our church
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Pastor David Mensah",
                role: "Lead Pastor",
                bio: "Pastor David has been leading our church since 2010. He has a passion for teaching God's Word and helping people grow in their faith.",
                image: pastorImage,
              },
              {
                name: "Sarah Osei",
                role: "Worship Director",
                bio: "Sarah leads our worship ministry with creativity and passion, helping our congregation connect with God through music.",
                image: pastorImage,
              },
              {
                name: "Michael Adu",
                role: "Youth Pastor",
                bio: "Michael has a heart for helping young people discover their identity in Christ and develop a lifelong faith.",
                image: pastorImage,
              },
              {
                name: "Grace Annan",
                role: "Children's Ministry Director",
                bio: "Grace creates engaging programs that help children learn about God's love in age-appropriate ways.",
                image: pastorImage,
              },
              {
                name: "Daniel Boateng",
                role: "Outreach Coordinator",
                bio: "Daniel coordinates our community service initiatives and missions programs locally and internationally.",
                image: pastorImage,
              },
              {
                name: "Rebecca Owusu",
                role: "Administrative Director",
                bio: "Rebecca oversees the day-to-day operations of the church, ensuring everything runs smoothly.",
                image: pastorImage,
              },
            ].map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-64 bg-gray-200">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {leader.role}
                  </p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Members Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from members of our church family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This church has become like a second family to me. The community is so welcoming and supportive.",
                name: "Abena Kofi",
                role: "Member since 2018",
              },
              {
                quote:
                  "I've grown so much in my faith since joining this church. The teaching is biblical and practical.",
                name: "Emmanuel Darko",
                role: "Member since 2015",
              },
              {
                quote:
                  "My children love the children's ministry, and we've all found meaningful ways to serve and connect.",
                name: "Priscilla Asante",
                role: "Member since 2020",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative"
              >
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="text-6xl text-blue-100 font-serif" />
                </div>
                <p className="text-gray-600 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
