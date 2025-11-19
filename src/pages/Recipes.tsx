import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter, Clock, Flame, Heart, Lock, TrendingUp } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dietType, setDietType] = useState<"veg" | "non_veg" | undefined>(undefined);
  const { recipes, loading } = useRecipes(dietType);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const { isSubscribed } = useSubscription();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort by most liked (using a mock likes count for now)
  const sortedRecipes = [...filteredRecipes].sort(() => Math.random() - 0.5);

  const canAccessRecipe = (accessLevel: string) => {
    if (accessLevel === "guest") return true;
    if (accessLevel === "logged_in") return !!user;
    if (accessLevel === "subscribed") return isSubscribed;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Recipe Discovery
            </h1>
            <p className="text-muted-foreground">Find the perfect meal to hit your nutrition goals</p>
            {sortedRecipes.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Showing {sortedRecipes.length} popular recipes</span>
              </div>
            )}
          </div>

          {/* Search & Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search recipes by name, ingredient, or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={dietType === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => setDietType(undefined)}
              >
                All
              </Button>
              <Button
                variant={dietType === "veg" ? "default" : "outline"}
                size="sm"
                onClick={() => setDietType("veg")}
              >
                🥗 Veg
              </Button>
              <Button
                variant={dietType === "non_veg" ? "default" : "outline"}
                size="sm"
                onClick={() => setDietType("non_veg")}
              >
                🍗 Non-Veg
              </Button>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 h-full group">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={recipe.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop"} 
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
                      onClick={(e) => {
                        e.preventDefault();
                        if (user) {
                          toggleFavorite(recipe.id);
                        }
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-primary text-primary' : ''}`} />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-primary" />
                        {recipe.calories} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-secondary" />
                        {recipe.cook_time} min
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.protein}g protein
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;
