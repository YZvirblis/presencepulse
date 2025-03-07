import Link from "next/link";
import { FaChartLine, FaSearch } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="text-center py-24 bg-gradient-to-br from-primary to-indigo-700 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold flex justify-center items-center gap-3">
          <FaChartLine className="text-accent" /> PresencePulse
        </h1>
        <p className="text-xl mt-4 text-white/90">
          The smartest way to analyze your digital presence across multiple platforms.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 cursor-pointer bg-accent text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all">
            <FaSearch className="inline-block mr-2" /> Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
