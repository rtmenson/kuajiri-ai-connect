
const Statistics = () => {
  const stats = [
    { number: "94%", label: "Match Accuracy" },
    { number: "-60%", label: "Time to Hire" },
    { number: "4.9/5", label: "User Satisfaction" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Driven Success
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                {stat.number}
              </div>
              <div className="text-xl text-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
