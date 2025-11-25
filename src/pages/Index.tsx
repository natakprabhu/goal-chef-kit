import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import { CTA } from "@/components/CTA";
import Footer from "@/components/Footer";
import YouTubeModal from "@/components/YouTubeModal";

const Index = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero onSeeHowItWorks={() => setVideoOpen(true)} />
        <Features />
        <HowItWorks />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <YouTubeModal open={videoOpen} onOpenChange={setVideoOpen} />
    </div>
  );
};

export default Index;
