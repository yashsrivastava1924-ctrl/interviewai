import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;