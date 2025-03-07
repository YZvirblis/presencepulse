import { FaChartBar, FaBolt, FaUserCheck } from "react-icons/fa";

export function Features() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-primary">Why Choose PresencePulse?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
        <FeatureCard icon={<FaChartBar className="text-primary text-4xl" />} title="Multi-Platform Analytics" description="Track YouTube, Instagram, Twitter, and Reddit engagement in one place." />
        <FeatureCard icon={<FaBolt className="text-secondary text-4xl" />} title="Real-Time Insights" description="Get up-to-date stats on your digital presence with a single click." />
        <FeatureCard icon={<FaUserCheck className="text-accent text-4xl" />} title="Easy to Use" description="Designed for businesses, influencers, and digital marketers." />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-100 shadow-md p-6 rounded-lg flex flex-col items-center">
      {icon}
      <h3 className="text-xl font-bold mt-3">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
