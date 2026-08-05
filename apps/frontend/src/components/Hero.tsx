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

      <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg">
        Start Interview
      </button>

    </section>
  )
}

export default Hero