import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function InterviewSetupPage() {
  const navigate = useNavigate();

  const [interviewType, setInterviewType] =
    useState("Frontend Developer");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [experience, setExperience] =
    useState("Fresher");

  const handleStartInterview = () => {
    navigate("/interview", {
      state: {
        interviewType,
        difficulty,
        experience,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          InterviewAI 🚀
        </Link>

        <Link
          to="/dashboard"
          className="text-slate-400 transition hover:text-white"
        >
          ← Dashboard
        </Link>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-medium text-blue-400">
            AI Mock Interview
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Set Up Your Interview
          </h1>

          <p className="mt-3 text-slate-400">
            Customize your interview before
            you begin.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          {/* Interview Type */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Interview Type
            </label>

            <select
              value={interviewType}
              onChange={(event) =>
                setInterviewType(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option>
                Frontend Developer
              </option>

              <option>
                Backend Developer
              </option>

              <option>
                Full Stack Developer
              </option>

              <option>
                Java Developer
              </option>

              <option>
                Python Developer
              </option>

              <option>
                Data Structures & Algorithms
              </option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="mt-7">
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Difficulty
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                "Easy",
                "Medium",
                "Hard",
              ].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setDifficulty(level)
                  }
                  className={`rounded-lg border px-4 py-3 font-medium transition ${
                    difficulty === level
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-7">
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Experience Level
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                "Fresher",
                "1-3 Years",
                "3+ Years",
              ].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setExperience(level)
                  }
                  className={`rounded-lg border px-4 py-3 font-medium transition ${
                    experience === level
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="font-semibold">
              Interview Summary
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>
                <span className="text-slate-200">
                  Type:
                </span>{" "}
                {interviewType}
              </p>

              <p>
                <span className="text-slate-200">
                  Difficulty:
                </span>{" "}
                {difficulty}
              </p>

              <p>
                <span className="text-slate-200">
                  Experience:
                </span>{" "}
                {experience}
              </p>

              <p>
                <span className="text-slate-200">
                  Questions:
                </span>{" "}
                5
              </p>
            </div>
          </div>

          {/* Start */}
          <button
            type="button"
            onClick={handleStartInterview}
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
          >
            🚀 Start Interview
          </button>
        </div>
      </main>
    </div>
  );
}

export default InterviewSetupPage;