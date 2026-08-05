function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      company: "Amazon",
      text: "This AI interview platform helped me prepare with confidence and land my dream job.",
    },
    {
      name: "Priya Gupta",
      company: "Adobe",
      text: "The instant feedback after every interview really improved my communication skills.",
    },
    {
      name: "Arjun Verma",
      company: "Microsoft",
      text: "The mock interviews felt incredibly realistic. Highly recommended.",
    },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          What Our Users Say
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((user) => (
            <div
              key={user.name}
              className="rounded-xl bg-slate-800 p-8 shadow-lg transition hover:-translate-y-2"
            >
              <div className="mb-4 text-yellow-400 text-2xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-300 italic">
                "{user.text}"
              </p>

              <div className="mt-6">
                <h3 className="font-semibold text-white">
                  {user.name}
                </h3>

                <p className="text-blue-400">
                  {user.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;