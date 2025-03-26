import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div className="bg-background text-text h-full">
      <HeroSection />
      <Features />
    </div>
  );
}
