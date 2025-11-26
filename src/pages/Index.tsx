import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import { CTA } from "@/components/CTA";
import Footer from "@/components/Footer";
import YouTubeModal from "@/components/YouTubeModal";
import { SEO } from "@/components/SEO";

const Index = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SEO 
        title="GoalChef - AI-Powered Meal Planning for Your Fitness Goals"
        description="Achieve your fitness goals with personalized meal plans, Indian recipes, and nutrition tracking. Perfect for weight loss, muscle gain, or maintenance."
        keywords={['meal planning', 'nutrition tracking', 'Indian recipes', 'fitness goals', 'weight loss', 'muscle gain', 'healthy eating', 'diet planning']}
        url="https://goalchef.vercel.app"
        type="website"
      />
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
