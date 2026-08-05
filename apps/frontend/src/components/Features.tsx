import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="py-24 px-10 bg-slate-900">
      <div className="grid md:grid-cols-3 gap-8">

        <FeatureCard
          icon="🎤"
          title="AI Mock Interviews"
          description="Practice interviews powered by AI with realistic questions."
        />

        <FeatureCard
          icon="📊"
          title="Instant Feedback"
          description="Receive detailed feedback on your answers immediately."
        />

        <FeatureCard
          icon="📈"
          title="Progress Tracking"
          description="Track your improvement and become interview ready."
        />

      </div>
    </section>
  );
}

export default Features;