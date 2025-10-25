import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Flame, Heart } from "lucide-react";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock recipe data
  const recipes = [
    {
      id: "1",
      title: "Grilled Chicken & Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
      calories: 485,
      protein: 42,
      cookTime: 25,
      tags: ["High Protein", "Gluten-Free"]
    },
    {
      id: "2",
      title: "Salmon with Roasted Vegetables",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop",
      calories: 520,
      protein: 38,
      cookTime: 30,
      tags: ["Omega-3", "Low Carb"]
    },
    {
      id: "3",
      title: "Vegan Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
      calories: 420,
      protein: 18,
      cookTime: 20,
      tags: ["Vegan", "High Fiber"]
    },
    {
      id: "4",
      title: "Turkey & Sweet Potato Hash",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
      calories: 450,
      protein: 35,
      cookTime: 35,
      tags: ["High Protein", "Whole30"]
    },
    {
      id: "5",
      title: "Greek Yogurt Parfait",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
      calories: 310,
      protein: 24,
      cookTime: 5,
      tags: ["Breakfast", "Quick"]
    },
    {
      id: "6",
      title: "Beef Stir-Fry with Broccoli",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop",
      calories: 495,
      protein: 40,
      cookTime: 20,
      tags: ["High Protein", "Low Carb"]
    }
  ];

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
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 h-full group">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle favorite toggle
                      }}
                    >
                      <Heart className="h-4 w-4" />
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
