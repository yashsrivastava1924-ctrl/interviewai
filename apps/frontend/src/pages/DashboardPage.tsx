import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          InterviewAI 🚀
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-slate-400 hover:text-white"
          >
            Logout
          </Link>
        </div>

      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* Welcome */}
        <section>
          <h1 className="text-4xl font-bold">
            Welcome back 👋
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Ready to ace your next interview?
          </p>
        </section>

        {/* Stats */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Interviews Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              12
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Average Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              78%
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Improvement
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-400">
              +14%
            </h2>
          </div>

        </section>

        {/* Start Interview */}
        <section className="mt-10 rounded-2xl border border-blue-900 bg-blue-950/40 p-8">

          <h2 className="text-2xl font-bold">
            Ready for another interview?
          </h2>

          <p className="mt-2 text-slate-400">
            Practice with an AI-powered mock interview and get
            instant feedback.
          </p>

          <Link
            to="/interview/setup"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            🚀 Start New Interview
          </Link>

        </section>

        {/* Recent Interviews */}
        <section className="mt-12">

          <h2 className="text-2xl font-bold">
            Recent Interviews
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">

            <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900 px-6 py-4 text-sm font-medium text-slate-400">
              <span>Interview</span>
              <span>Score</span>
              <span>Action</span>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-800 px-6 py-5">
              <span>Frontend Developer</span>
              <span>82%</span>
              <button className="text-left text-blue-400">
                View
              </button>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-800 px-6 py-5">
              <span>Java Developer</span>
              <span>76%</span>
              <button className="text-left text-blue-400">
                View
              </button>
            </div>

            <div className="grid grid-cols-3 px-6 py-5">
              <span>Backend Developer</span>
              <span>71%</span>
              <button className="text-left text-blue-400">
                View
              </button>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DashboardPage;