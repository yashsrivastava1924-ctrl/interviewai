import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default HomePage;