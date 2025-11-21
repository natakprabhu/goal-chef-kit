import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Set Your Goal",
    description: "Tell us whether you want to cut, maintain, or bulk. We calculate your precise calorie needs based on your metrics."
  },
  {
    number: "02",
    title: "Get Your Plan",
    description: "Our AI generates a weekly meal plan with recipes that hit your exact targets. Every meal is calculated to the calorie."
  },
  {
    number: "03",
    title: "Cook & Track",
    description: "Follow the recipes, adjust portions as needed, and watch your progress. Our smart substitutions keep you on track."
  },
  {
    number: "04",
    title: "Achieve Results",
    description: "Hit your nutrition goals consistently. See real progress with precision nutrition that actually works."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Path to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Precision Nutrition
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From sign-up to results in four simple steps
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary-light hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-8 items-start">
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[var(--shadow-glow)]">
                    <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card border border-border rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-[var(--transition-smooth)]">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <h3 className="text-2xl font-bold text-card-foreground">{step.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed ml-9">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
