function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6">
      <h1 className="text-2xl font-bold text-white">
        InterviewAI 🚀
      </h1>

      <div className="space-x-6">
        <button className="text-gray-300 hover:text-white">
          Login
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar