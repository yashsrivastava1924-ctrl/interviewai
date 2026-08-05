type FeatureCardProps = {
  icon: string
  title: string
  description: string
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 text-center hover:bg-slate-700 transition">

      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-white text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  )
}

export default FeatureCard