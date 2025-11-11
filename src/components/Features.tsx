import { Card } from "@/components/ui/card";
import progressImage from "@/assets/1.png";
import personalizedImage from "@/assets/2.png";
import achievementImage from "@/assets/3.png";
import communityImage from "@/assets/4.png";

const features = [
  {
    title: "Track Your Progress",
    description:
      "Monitor your calorie, macro, and meal trends in real-time. Stay consistent and visualize your growth with clear weekly insights.",
    image: progressImage,
  },
  {
    title: "Personalized Dashboard",
    description:
      "Access a nutrition dashboard tailored just for you — updated daily with goals, progress, and recommendations.",
    image: personalizedImage,
  },
  {
    title: "Goal Milestones & Rewards",
    description:
      "Celebrate every achievement — earn milestones, track streaks, and stay motivated through your transformation journey.",
    image: achievementImage,
  },
  {
    title: "Community & Challenges",
    description:
      "Be part of a growing community. Join challenges, share progress, and stay inspired with people chasing the same goals.",
    image: communityImage,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Explore What You Get with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GoalChef Membership
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one space for personalized nutrition, progress tracking, and lasting motivation.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-border shadow-[var(--shadow-card)] hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.15)] transition-all duration-500 overflow-hidden bg-card"
            >
              {/* Title Section */}
              <div className="border-b border-border bg-background/60 px-4 py-3 text-center">
                <h3 className="text-lg lg:text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
              </div>

              {/* Image Section */}
              <div className="flex justify-center items-center bg-background">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-h-72 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Description Section */}
              <div className="border-t border-border bg-background/50 px-5 py-4 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
