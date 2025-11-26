import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO, generateRecipeSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Clock, Flame, Users, ArrowLeft, RefreshCw } from "lucide-react";
import { useRecipe } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [servings, setServings] = useState(1);
  const { recipe, loading } = useRecipe(recipeId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">Loading recipe...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">Recipe not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const baseServings = 1;
  
  // Check if ingredients are strings or objects
  const isStringIngredients = typeof recipe.ingredients[0] === 'string';
  
  const adjustedIngredients = (recipe.ingredients as any[]).map((ing: any) => {
    if (isStringIngredients) {
      // For string ingredients, return as-is (can't adjust amounts easily)
      return ing;
    }
    // For object ingredients, adjust amounts
    return {
      ...ing,
      amount: (ing.amount * servings) / baseServings
    };
  });

  const adjustedNutrition = {
    calories: Math.round((recipe.calories * servings) / baseServings),
    protein: Math.round((Number(recipe.protein) * servings) / baseServings),
    carbs: Math.round((Number(recipe.carbs) * servings) / baseServings),
    fats: Math.round((Number(recipe.fats) * servings) / baseServings)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title={`${recipe.title} - GoalChef`}
        description={recipe.description || `Healthy ${recipe.diet_type === 'veg' ? 'vegetarian' : 'non-vegetarian'} recipe with ${recipe.calories} calories, ${recipe.protein}g protein. Perfect for ${recipe.meal_type}.`}
        image={recipe.image_url || "https://goalchef.vercel.app/og-image.jpg"}
        url={`https://goalchef.vercel.app/recipe/${recipe.id}`}
        type="article"
        keywords={[
          recipe.title,
          recipe.diet_type === 'veg' ? 'vegetarian recipe' : 'non-vegetarian recipe',
          `${recipe.meal_type} recipe`,
          'healthy recipe',
          'Indian recipe',
          ...(recipe.tags || [])
        ]}
        schema={generateRecipeSchema({
          name: recipe.title,
          description: recipe.description || `Delicious ${recipe.meal_type} recipe`,
          image: recipe.image_url || "https://goalchef.vercel.app/og-image.jpg",
          prepTime: recipe.prep_time,
          cookTime: recipe.cook_time,
          calories: recipe.calories,
          protein: recipe.protein,
          carbs: recipe.carbs,
          fats: recipe.fats,
          ingredients: (recipe.ingredients as any[]).map((ing: any) => 
            typeof ing === 'string' ? ing : `${ing.amount || ''} ${ing.name || ing}`.trim()
          ),
          instructions: (recipe.instructions as any[]).map((inst: any) => 
            typeof inst === 'string' ? inst : inst.text || inst
          ),
        })}
      />
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link to="/recipes">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>

          {/* Hero Image & Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden">
              <img 
                src={recipe.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop"} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {recipe.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {recipe.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                  {recipe.tags && recipe.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                    <p className="font-semibold">{(recipe.cook_time || 0) + (recipe.prep_time || 0)} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{recipe.difficulty || "Medium"}</p>
                  </div>
                </div>
              </div>

              <Button 
                variant={isFavorite(recipe.id) ? "default" : "outline"}
                className="w-full"
                onClick={() => toggleFavorite(recipe.id)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
                {isFavorite(recipe.id) ? 'Saved to Favorites' : 'Save to Favorites'}
              </Button>
            </div>
          </div>

          {/* Nutrition & Portions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Nutrition Card */}
            <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle>Precision Nutrition</CardTitle>
                <CardDescription>Per serving nutritional breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{adjustedNutrition.calories}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">{adjustedNutrition.protein}g</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">{adjustedNutrition.carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-light">{adjustedNutrition.fats}g</div>
                    <div className="text-sm text-muted-foreground">Fats</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portion Adjuster */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Adjust Servings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setServings(Math.max(1, servings - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center text-2xl font-bold"
                    min="1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setServings(servings + 1)}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  {isStringIngredients 
                    ? "Nutrition adjusts for servings" 
                    : "Ingredients adjust automatically"
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ingredients & Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>For {servings} serving{servings !== 1 ? 's' : ''}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {adjustedIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="flex-1">
                        {isStringIngredients 
                          ? ingredient 
                          : `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
                        }
                      </span>
                      {!isStringIngredients && ingredient.substitutable && (
                        <Button variant="ghost" size="sm" className="text-primary">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Swap
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Step-by-step cooking guide</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
