import { Users, CalendarDays, Heart, BookOpen, ThumbsUp } from "lucide-react";

function Features() {
  const featuresList = [
    {
      title: "Worship Services",
      description: "Sunday Services at 9:00 AM & 11:00 AM",
      icon: Users,
      color: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Community",
      description: "Join our growing family of believers",
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      title: "Events",
      description: "Participate in our upcoming events",
      icon: CalendarDays,
      color: "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-600",
      borderColor: "border-violet-200",
    },
    {
      title: "Bible Study",
      description:
        "Deepen your understanding of the Word through weekly Bible studies.",
      icon: BookOpen,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      title: "Volunteer Opportunities",
      description: "Get involved in various community service projects.",
      icon: ThumbsUp,
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Support Groups",
      description: "Join support groups for various life challenges.",
      icon: Heart,
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the ways you can connect and grow with us.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, index) => (
              <div key={index} className="group relative">
                {/* Hover effect background */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                />

                {/* Card */}
                <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl border border-white/20 p-8 shadow-xl shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-4 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon
                        className={`h-8 w-8 ${feature.iconColor}`}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
