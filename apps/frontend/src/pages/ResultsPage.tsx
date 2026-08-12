import { Link, useLocation } from "react-router-dom";

type InterviewResult = {
  questions: string[];
  answers: string[];
};

function ResultsPage() {
  const location = useLocation();

  const result = location.state as InterviewResult | null;

  // If someone opens /results directly
  // without completing an interview
  if (
    !result ||
    !Array.isArray(result.questions) ||
    !Array.isArray(result.answers)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="px-6 text-center">
          <div className="text-5xl">📊</div>

          <h1 className="mt-6 text-3xl font-bold">
            No Interview Results
          </h1>

          <p className="mt-4 text-slate-400">
            Complete an interview first to see your results.
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Temporary mock scores
  const overallScore = 82;
  const technicalScore = 85;
  const communicationScore = 80;
  const confidenceScore = 81;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <div className="text-2xl font-bold">
          InterviewAI 🚀
        </div>

        <Link
          to="/dashboard"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
        >
          Dashboard
        </Link>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-blue-400">
            Interview Complete
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Your Interview Results
          </h1>

          <p className="mt-4 text-slate-400">
            Here's a summary of your performance.
          </p>
        </div>

        {/* Overall Score */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-sm text-slate-400">
            Overall Score
          </p>

          <div className="mt-4 text-7xl font-bold text-blue-500">
            {overallScore}
            <span className="text-3xl text-slate-500">
              /100
            </span>
          </div>

          <p className="mt-4 text-green-400">
            Excellent performance 🎉
          </p>
        </section>

        {/* Score Cards */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Technical */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Technical Knowledge
            </p>

            <p className="mt-3 text-4xl font-bold">
              {technicalScore}
              <span className="text-lg text-slate-500">
                /100
              </span>
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${technicalScore}%`,
                }}
              />
            </div>
          </div>

          {/* Communication */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Communication
            </p>

            <p className="mt-3 text-4xl font-bold">
              {communicationScore}
              <span className="text-lg text-slate-500">
                /100
              </span>
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${communicationScore}%`,
                }}
              />
            </div>
          </div>

          {/* Confidence */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Confidence
            </p>

            <p className="mt-3 text-4xl font-bold">
              {confidenceScore}
              <span className="text-lg text-slate-500">
                /100
              </span>
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{
                  width: `${confidenceScore}%`,
                }}
              />
            </div>
          </div>

        </section>

        {/* Strengths & Improvements */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Strengths */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              ✅ Your Strengths
            </h2>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>• Clear and structured answers</li>
              <li>• Good understanding of technical concepts</li>
              <li>• Strong communication</li>
              <li>• Good confidence while answering</li>
            </ul>
          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              💡 Areas to Improve
            </h2>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>• Give more real-world examples</li>
              <li>• Avoid unnecessary pauses</li>
              <li>• Explain technical answers more deeply</li>
              <li>• Practice system design questions</li>
            </ul>
          </div>

        </section>

        {/* Question Analysis */}
        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Question-by-Question Analysis
          </h2>

          <div className="mt-5 space-y-4">

            {result.questions.map((question, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-sm text-blue-400">
                      Question {index + 1}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      {question}
                    </h3>
                  </div>

                  <div className="rounded-lg bg-green-950 px-3 py-2 text-sm font-semibold text-green-400">
                    {80 + index}/100
                  </div>

                </div>

                {/* Answer */}
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-300">
                    Your Answer
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                    {result.answers[index] ||
                      "No answer provided."}
                  </p>
                </div>

                {/* AI Feedback */}
                <div className="mt-5 rounded-lg bg-slate-800 p-4">

                  <p className="text-sm font-medium text-blue-400">
                    💡 AI Feedback
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Your answer shows a good understanding of
                    the topic. Try adding a specific example
                    to make your response stronger.
                  </p>

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* Bottom Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/interview/setup"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            🚀 Practice Again
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>

        </div>

      </main>
    </div>
  );
}

export default ResultsPage;