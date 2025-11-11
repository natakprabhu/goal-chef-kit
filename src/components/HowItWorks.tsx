import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Set Your Goal",
    description:
      "Choose whether you want to cut, maintain, or bulk. We calculate your exact calorie and macro needs based on your body metrics.",
  },
  {
    number: "02",
    title: "Get Your Plan",
    description:
      "Our AI generates a weekly meal plan with calorie-precise recipes tailored to your goals and preferences.",
  },
  {
    number: "03",
    title: "Cook & Track",
    description:
      "Follow simple recipes, adjust portions, and log your meals easily. Stay perfectly aligned with your daily nutrition target.",
  },
  {
    number: "04",
    title: "Achieve Results",
    description:
      "Stay consistent and watch your progress unfold with data-driven insights and visible results.",
  },
];

export const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // ⏱️ Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Your Path to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Precision Nutrition
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Watch how GoalChef guides you from setup to success — one smart step at a time.
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* LEFT SIDE: GIF */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent rounded-3xl blur-3xl -z-10" />
            <img
              src="/how-it-works.gif" // 👈 your GIF in /public
              alt="How GoalChef Works"
              className="rounded-3xl border border-border shadow-2xl w-full max-w-md object-cover"
            />
          </div>

          {/* RIGHT SIDE: Auto-changing step card */}
          <div className="w-full lg:w-1/2 text-center lg:text-left transition-all duration-700 ease-in-out">
            <div
              key={currentStep}
              className="bg-card/80 backdrop-blur-md border border-border/60 rounded-2xl p-8 shadow-lg animate-fade-in"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold shadow-md">
                  {steps[currentStep].number}
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground">
                  {steps[currentStep].title}
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed mt-2">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center lg:justify-start gap-2 mt-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "bg-primary scale-125"
                      : "bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fade animation keyframes */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
};
