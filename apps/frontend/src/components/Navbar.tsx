import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6">
      <Link
        to="/"
        className="text-2xl font-bold text-white"
      >
        InterviewAI 🚀
      </Link>

      <div className="space-x-6">
        <Link
          to="/login"
          className="text-gray-300 hover:text-white"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;