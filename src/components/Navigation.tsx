import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Crown, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { isSubscribed } = useSubscription();

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GoalChef
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/recipes">
            <Button variant="ghost">Recipes</Button>
          </Link>
          <Link to="/planner">
            <Button variant="ghost">Planner</Button>
          </Link>
          {user && (
            <Link to="/my-progress">
              <Button variant="ghost">My Progress</Button>
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              {isSubscribed && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 gap-1">
                  <Crown className="h-3 w-3" />
                  Premium
                </Badge>
              )}
              <Button variant="outline" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/get-started">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
