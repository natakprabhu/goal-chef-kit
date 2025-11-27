import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Flame, Trash2 } from "lucide-react";

const Favorites = () => {
  // Mock favorite recipes
  const favorites = [
    {
      id: "1",
      title: "Grilled Chicken & Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
      calories: 485,
      protein: 42,
      cookTime: 25,
      tags: ["High Protein", "Gluten-Free"],
      savedDate: "2025-01-20"
    },
    {
      id: "3",
      title: "Vegan Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
      calories: 420,
      protein: 18,
      cookTime: 20,
      tags: ["Vegan", "High Fiber"],
      savedDate: "2025-01-18"
    },
    {
      id: "5",
      title: "Greek Yogurt Parfait",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
      calories: 310,
      protein: 24,
      cookTime: 5,
      tags: ["Breakfast", "Quick"],
      savedDate: "2025-01-15"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <SEO 
        title="My Favorite Recipes - GoalChef"
        description="Access your saved favorite recipes. Quick access to the meals you love for easy meal planning."
        url="https://goalchef.in/favorites"
        noindex={true}
      />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              My Favorites
            </h1>
            <p className="text-muted-foreground">Your personal cookbook of saved recipes</p>
          </div>

          {favorites.length > 0 ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardDescription>Total Favorites</CardDescription>
                    <CardTitle className="text-4xl">{favorites.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-secondary/20">
                  <CardHeader>
                    <CardDescription>Avg. Calories</CardDescription>
                    <CardTitle className="text-4xl">
                      {Math.round(favorites.reduce((sum, r) => sum + r.calories, 0) / favorites.length)}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-accent/20">
                  <CardHeader>
                    <CardDescription>Avg. Protein</CardDescription>
                    <CardTitle className="text-4xl">
                      {Math.round(favorites.reduce((sum, r) => sum + r.protein, 0) / favorites.length)}g
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Recipe Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 group">
                    <Link to={`/recipe/${recipe.id}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-background/90 rounded-full p-2">
                          <Heart className="h-4 w-4 text-primary fill-primary" />
                        </div>
                      </div>
                    </Link>
                    <CardHeader>
                      <Link to={`/recipe/${recipe.id}`}>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          {recipe.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-primary" />
                          {recipe.calories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-secondary" />
                          {recipe.cookTime} min
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {recipe.protein}g protein
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          // Handle remove from favorites
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <Card className="border-dashed border-primary/30">
              <CardContent className="py-16 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring recipes and save your favorites for quick access
                </p>
                <Link to="/recipes">
                  <Button size="lg">
                    Browse Recipes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
