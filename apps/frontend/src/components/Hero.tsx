import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-24">

      <h1 className="text-6xl font-extrabold text-white">
        Ace Every Interview
      </h1>

      <p className="text-gray-400 mt-6 text-xl max-w-2xl">
        AI-powered mock interviews with instant feedback,
        analytics and personalized improvement tips.
      </p>

     <div className="mt-8 flex justify-center gap-4">
  <Link
    to="/dashboard"
    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    Start Interview
  </Link>

  <Link
    to="/signup"
    className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
  >
    Get Started
  </Link>
</div>

    </section>
  )
}

export default Hero