function Stats() {
  const stats = [
    {
      number: "10,000+",
      label: "Mock Interviews",
    },
    {
      number: "95%",
      label: "Success Rate",
    },
    {
      number: "500+",
      label: "Partner Companies",
    },
    {
      number: "24/7",
      label: "AI Available",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-slate-900 p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="text-4xl font-bold text-blue-500">
              {stat.number}
            </h2>

            <p className="mt-3 text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;