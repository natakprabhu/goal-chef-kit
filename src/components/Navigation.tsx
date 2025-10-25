import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-primary to-primary-light p-2 rounded-lg">
            <ChefHat className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GoalChef
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition-[var(--transition-smooth)] font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-[var(--transition-smooth)] font-medium">
            How It Works
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-[var(--transition-smooth)] font-medium">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">Log In</Button>
          <Button variant="hero">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};
