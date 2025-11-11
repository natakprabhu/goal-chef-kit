import { Card } from "@/components/ui/card";
import { Brain, Calculator, RefreshCw } from "lucide-react";
import aiPlannerImage from "@/assets/feature-ai-planner.png";
import precisionImage from "@/assets/feature-precision.png";
import substitutionImage from "@/assets/feature-substitution.png";

const features = [
  {
    icon: Brain,
    title: "AI Meal Planner",
    description: "Let AI build your perfect week. Our smart planner creates meal plans that hit your exact calorie and macro targets, automatically adapting to your goals.",
    image: aiPlannerImage,
    color: "from-secondary to-secondary-light"
  },
  {
    icon: Calculator,
    title: "Precision Nutrition",
    description: "Every recipe includes exact calorie breakdowns and macro ratios. Adjust portions dynamically and watch the numbers update in real-time.",
    image: precisionImage,
    color: "from-primary to-primary-light"
  },
  {
    icon: RefreshCw,
    title: "Smart Substitutions",
    description: "Swap ingredients while maintaining your nutrition targets. Our AI suggests alternatives that keep you on track with your goals.",
    image: substitutionImage,
    color: "from-accent to-primary-light"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Crush Your Goals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop guessing with generic recipes. Get precision nutrition designed for your specific targets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] border-border bg-card group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-[var(--transition-smooth)]`}>
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="rounded-xl overflow-hidden border border-border">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-[var(--transition-smooth)]"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
