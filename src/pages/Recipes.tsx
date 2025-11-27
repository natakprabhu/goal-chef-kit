import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter, Clock, Flame, Heart, Lock, TrendingUp, Target, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useRecommendations } from "@/hooks/useRecommendations";

const RECIPES_PER_PAGE = 12;

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dietType, setDietType] = useState<"veg" | "non_veg" | undefined>(undefined);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | undefined>(undefined);
  const [goalCategory, setGoalCategory] = useState<"weight_gain" | "weight_loss" | "maintenance" | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const { recipes, loading } = useRecipes(dietType, mealType);
  const { recommendations, loading: recLoading, userGoalCategory } = useRecommendations();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const { isSubscribed } = useSubscription();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGoal = !goalCategory || (recipe as any).goal_category === goalCategory;
    
    return matchesSearch && matchesGoal;
  });

  // Reset to page 1 when filters change
  const resetPage = () => setCurrentPage(1);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canAccessRecipe = (accessLevel: string) => {
    if (accessLevel === "guest") return true;
    if (accessLevel === "logged_in") return !!user;
    if (accessLevel === "subscribed") return isSubscribed;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <SEO 
        title="Healthy Indian Recipes - GoalChef"
        description="Discover 300+ healthy Indian recipes for weight loss, muscle gain, and maintenance. Vegetarian and non-vegetarian options with detailed nutrition info."
        keywords={['Indian recipes', 'healthy recipes', 'weight loss recipes', 'muscle gain recipes', 'vegetarian recipes', 'high protein meals', 'low calorie Indian food']}
        url="https://goalchef.in/recipes"
        type="website"
      />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "Recipes" }]} />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Recipe Discovery
            </h1>
            <p className="text-muted-foreground">Find the perfect meal to hit your nutrition goals</p>
            {filteredRecipes.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
                </span>
              </div>
            )}
          </div>

          {/* Personalized Recommendations */}
          {user && recommendations.length > 0 && !goalCategory && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">
                  Recommended For Your Goal
                </h2>
                <Badge variant="secondary" className="ml-2">
                  {userGoalCategory?.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {recommendations.slice(0, 4).map((recipe) => (
                  <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-primary/30 h-full group">
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
                            toggleFavorite(recipe.id);
                          }}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">{recipe.title}</CardTitle>
                        <CardDescription className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-primary" />
                            {recipe.calories} kcal
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-secondary" />
                            {recipe.cook_time} min
                          </span>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Goal:
                </Label>
                <Button
                  variant={goalCategory === undefined ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setGoalCategory(undefined); resetPage(); }}
                >
                  All
                </Button>
                <Button
                  variant={goalCategory === "weight_gain" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setGoalCategory("weight_gain"); resetPage(); }}
                >
                  💪 Gain
                </Button>
                <Button
                  variant={goalCategory === "weight_loss" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setGoalCategory("weight_loss"); resetPage(); }}
                >
                  🔥 Loss
                </Button>
                <Button
                  variant={goalCategory === "maintenance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setGoalCategory("maintenance"); resetPage(); }}
                >
                  ⚖️ Maintain
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-muted-foreground">Diet:</Label>
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
              
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-muted-foreground">Meal:</Label>
                <Button
                  variant={mealType === undefined ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealType(undefined)}
                >
                  All
                </Button>
                <Button
                  variant={mealType === "breakfast" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealType("breakfast")}
                >
                  🌅 Breakfast
                </Button>
                <Button
                  variant={mealType === "lunch" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealType("lunch")}
                >
                  ☀️ Lunch
                </Button>
                <Button
                  variant={mealType === "dinner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealType("dinner")}
                >
                  🌙 Dinner
                </Button>
                <Button
                  variant={mealType === "snack" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMealType("snack")}
                >
                  🍿 Snacks
                </Button>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedRecipes.map((recipe) => (
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
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.diet_type === "veg" ? "🥗 Vegetarian" : "🍗 Non-Veg"}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {recipe.meal_type}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">{recipe.title}</CardTitle>
                    {recipe.description && (
                      <CardDescription className="line-clamp-2 text-xs mt-1">
                        {recipe.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{recipe.calories}</span> kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-secondary" />
                        {recipe.cook_time || recipe.prep_time || 30} min
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        P: {recipe.protein}g
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        C: {recipe.carbs}g
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        F: {recipe.fats}g
                      </Badge>
                    </div>
                    {(recipe as any).goal_category && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {(recipe as any).goal_category.replace('_', ' ')}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
              ))}
            </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;
