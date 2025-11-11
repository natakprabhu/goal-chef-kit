import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Play } from "lucide-react";

const Navigation = () => {
  // State to control modal open/close
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left side: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GoalChef
            </span>
          </Link>

          {/* Right side: Navigation links */}
          <div className="flex items-center gap-4">
            <Link to="/homepage">
              <Button variant="ghost">Homepage</Button>
            </Link>
            <Link to="/recipes">
              <Button variant="ghost">Recipes</Button>
            </Link>
            <Link to="/planner">
              <Button variant="ghost">Planner</Button>
            </Link>
            <Link to="/my-progress">
              <Button variant="ghost">My Progress</Button>
            </Link>

            <Link to="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/get-started">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navigation;
