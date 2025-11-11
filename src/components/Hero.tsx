import { Button } from "@/components/ui/button";
import { ArrowRight, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter/20 via-background to-secondary-lighter/20 -z-10" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full border border-accent">
              <Target className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">Precision Nutrition for Your Goals</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Hit Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Exact Calorie
              </span>{" "}
              Target, Every Meal
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stop guessing with your nutrition. GoalChef combines AI-powered meal planning 
              with calorie-precise recipes to help you cut, maintain, or bulk with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <TrendingUp className="h-6 w-6" />
                  50K+
                </div>
                <p className="text-sm text-muted-foreground mt-1">Active Users</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">10M+</div>
                <p className="text-sm text-muted-foreground mt-1">Meals Planned</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99%</div>
                <p className="text-sm text-muted-foreground mt-1">Goal Success</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage}
              alt="Healthy meal with precise nutrition data"
              className="relative rounded-3xl shadow-[var(--shadow-card)] border border-border"
            />
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-card)] backdrop-blur-sm">
              <div className="text-sm text-muted-foreground mb-2">Daily Target</div>
              <div className="text-3xl font-bold text-primary">2,200</div>
              <div className="text-sm text-muted-foreground">calories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
