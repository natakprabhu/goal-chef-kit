import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Eye } from "lucide-react";
import { useMilestones } from "@/hooks/useMilestones";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Complete meal data for all 7 days with 5 meals each
const allMeals: any = {
  Monday: {
    breakfast: { 
      id: "1",
      name: "Greek Yogurt Parfait", 
      description: "Creamy Greek yogurt layered with fresh berries and crunchy granola",
      calories: 310, 
      protein: 24, 
      carbs: 35,
      fats: 8,
      type: "veg",
      prep_time: 5,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["200g Greek yogurt", "50g mixed berries", "30g granola", "1 tbsp honey"],
      instructions: ["Layer Greek yogurt in a glass", "Add mixed berries", "Top with granola", "Drizzle honey on top"]
    },
    snack: { 
      id: "1a",
      name: "Protein Smoothie", 
      description: "Quick energy boost with banana and protein powder",
      calories: 200, 
      protein: 20, 
      carbs: 25,
      fats: 3,
      type: "veg",
      prep_time: 5,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["1 banana", "1 scoop protein powder", "200ml almond milk", "Ice"],
      instructions: ["Blend all ingredients until smooth", "Serve immediately"]
    },
    lunch: { 
      id: "2",
      name: "Grilled Chicken Bowl", 
      description: "Tender grilled chicken with quinoa and roasted vegetables",
      calories: 485, 
      protein: 42, 
      carbs: 45,
      fats: 12,
      type: "non_veg",
      prep_time: 15,
      cook_time: 20,
      difficulty: "medium",
      ingredients: ["150g chicken breast", "100g quinoa", "100g broccoli", "50g bell peppers", "2 tbsp olive oil", "Spices"],
      instructions: ["Season and grill chicken breast", "Cook quinoa according to package", "Roast vegetables with olive oil", "Combine all in a bowl"]
    },
    snack2: { 
      id: "2a",
      name: "Almonds & Apple", 
      description: "Perfect afternoon snack with healthy fats and natural sugar",
      calories: 180, 
      protein: 6, 
      carbs: 20,
      fats: 9,
      type: "veg",
      prep_time: 2,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["1 medium apple", "30g almonds"],
      instructions: ["Slice apple", "Portion almonds", "Enjoy together"]
    },
    dinner: { 
      id: "3",
      name: "Salmon with Vegetables", 
      description: "Oven-baked salmon with seasonal roasted vegetables",
      calories: 520, 
      protein: 38, 
      carbs: 28,
      fats: 26,
      type: "non_veg",
      prep_time: 10,
      cook_time: 25,
      difficulty: "medium",
      ingredients: ["180g salmon fillet", "150g asparagus", "100g sweet potato", "2 tbsp olive oil", "Lemon", "Herbs"],
      instructions: ["Preheat oven to 200°C", "Season salmon with herbs and lemon", "Chop vegetables and toss with olive oil", "Bake for 20-25 minutes"]
    },
  },
  Tuesday: {
    breakfast: { 
      id: "4",
      name: "Avocado Toast with Eggs", 
      description: "Whole grain toast topped with mashed avocado and poached eggs",
      calories: 380, 
      protein: 18, 
      carbs: 32,
      fats: 20,
      type: "veg",
      prep_time: 10,
      cook_time: 5,
      difficulty: "easy",
      ingredients: ["2 slices whole grain bread", "1 ripe avocado", "2 eggs", "Cherry tomatoes", "Salt, pepper", "Red pepper flakes"],
      instructions: ["Toast bread until golden", "Mash avocado with salt and pepper", "Poach eggs in simmering water", "Spread avocado on toast, top with eggs"]
    },
    snack: { 
      id: "4a",
      name: "Energy Balls", 
      description: "No-bake protein balls with dates and nuts",
      calories: 150, 
      protein: 5, 
      carbs: 22,
      fats: 6,
      type: "veg",
      prep_time: 10,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["4 dates", "20g oats", "10g peanut butter", "Cocoa powder"],
      instructions: ["Blend all ingredients", "Roll into balls", "Refrigerate"]
    },
    lunch: { 
      id: "5",
      name: "Turkey Wrap", 
      description: "Whole wheat wrap filled with lean turkey and fresh vegetables",
      calories: 420, 
      protein: 32, 
      carbs: 38,
      fats: 14,
      type: "non_veg",
      prep_time: 10,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["1 whole wheat tortilla", "120g sliced turkey", "Lettuce", "Tomato", "Cucumber", "2 tbsp hummus"],
      instructions: ["Spread hummus on tortilla", "Layer turkey slices", "Add fresh vegetables", "Roll tightly and cut in half"]
    },
    snack2: { 
      id: "5a",
      name: "Greek Yogurt with Honey", 
      description: "Simple protein-rich afternoon snack",
      calories: 140, 
      protein: 15, 
      carbs: 18,
      fats: 2,
      type: "veg",
      prep_time: 2,
      cook_time: 0,
      difficulty: "easy",
      ingredients: ["150g Greek yogurt", "1 tbsp honey"],
      instructions: ["Drizzle honey over yogurt", "Mix and enjoy"]
    },
    dinner: { 
      id: "6",
      name: "Vegetarian Stir-Fry", 
      description: "Colorful vegetable stir-fry with tofu in savory sauce",
      calories: 395, 
      protein: 22, 
      carbs: 48,
      fats: 14,
      type: "veg",
      prep_time: 15,
      cook_time: 15,
      difficulty: "medium",
      ingredients: ["200g firm tofu", "100g broccoli", "50g carrots", "50g bell peppers", "2 tbsp soy sauce", "1 tbsp sesame oil", "Ginger, garlic"],
      instructions: ["Press and cube tofu", "Heat oil in wok", "Stir-fry tofu until golden", "Add vegetables and sauce", "Cook until tender-crisp"]
    },
  },
  Wednesday: {
    breakfast: { id: "7", name: "Protein Pancakes", description: "Fluffy pancakes made with protein powder and bananas", calories: 340, protein: 28, carbs: 42, fats: 6, type: "veg", prep_time: 10, cook_time: 10, difficulty: "easy", ingredients: ["1 scoop protein powder", "2 eggs", "1 banana", "50g oats", "1 tsp baking powder", "Maple syrup"], instructions: ["Blend all ingredients except syrup", "Heat non-stick pan", "Pour batter to form pancakes", "Flip when bubbles form", "Serve with syrup"] },
    snack: { id: "7a", name: "Cottage Cheese with Berries", description: "High-protein snack with antioxidants", calories: 160, protein: 18, carbs: 15, fats: 3, type: "veg", prep_time: 2, cook_time: 0, difficulty: "easy", ingredients: ["150g cottage cheese", "50g mixed berries"], instructions: ["Top cottage cheese with berries", "Enjoy"] },
    lunch: { id: "8", name: "Chicken Caesar Salad", description: "Classic Caesar salad with grilled chicken and parmesan", calories: 445, protein: 38, carbs: 22, fats: 24, type: "non_veg", prep_time: 15, cook_time: 10, difficulty: "easy", ingredients: ["150g chicken breast", "2 cups romaine lettuce", "30g parmesan cheese", "Croutons", "Caesar dressing"], instructions: ["Grill and slice chicken", "Chop romaine lettuce", "Toss with dressing", "Top with chicken, parmesan, and croutons"] },
    snack2: { id: "8a", name: "Hummus & Veggies", description: "Crunchy vegetables with protein-rich hummus", calories: 130, protein: 5, carbs: 18, fats: 5, type: "veg", prep_time: 5, cook_time: 0, difficulty: "easy", ingredients: ["50g hummus", "Carrots", "Celery", "Bell peppers"], instructions: ["Cut vegetables into sticks", "Serve with hummus"] },
    dinner: { id: "9", name: "Lentil Curry", description: "Hearty red lentil curry with aromatic spices", calories: 385, protein: 18, carbs: 58, fats: 10, type: "veg", prep_time: 10, cook_time: 30, difficulty: "medium", ingredients: ["200g red lentils", "1 can coconut milk", "1 onion", "2 tomatoes", "Curry spices", "Garlic, ginger"], instructions: ["Sauté onion, garlic, and ginger", "Add curry spices", "Add lentils and tomatoes", "Pour coconut milk", "Simmer until lentils are tender"] },
  },
  Thursday: {
    breakfast: { id: "10", name: "Oatmeal with Berries", description: "Warm oatmeal topped with fresh berries and nuts", calories: 320, protein: 12, carbs: 52, fats: 8, type: "veg", prep_time: 5, cook_time: 10, difficulty: "easy", ingredients: ["60g oats", "250ml almond milk", "50g mixed berries", "1 tbsp almond butter", "1 tsp honey", "Cinnamon"], instructions: ["Cook oats with almond milk", "Stir occasionally until creamy", "Top with berries and almond butter", "Drizzle with honey and sprinkle cinnamon"] },
    snack: { id: "10a", name: "Banana & Peanut Butter", description: "Classic combo for sustained energy", calories: 200, protein: 7, carbs: 30, fats: 8, type: "veg", prep_time: 2, cook_time: 0, difficulty: "easy", ingredients: ["1 banana", "1 tbsp peanut butter"], instructions: ["Slice banana", "Spread or dip in peanut butter"] },
    lunch: { id: "11", name: "Tuna Salad Bowl", description: "Fresh tuna salad with mixed greens and vegetables", calories: 410, protein: 36, carbs: 24, fats: 18, type: "non_veg", prep_time: 15, cook_time: 0, difficulty: "easy", ingredients: ["150g canned tuna", "Mixed salad greens", "Cherry tomatoes", "Cucumber", "Olives", "2 tbsp olive oil", "Lemon juice"], instructions: ["Drain tuna", "Arrange greens in bowl", "Add chopped vegetables", "Top with tuna", "Dress with olive oil and lemon"] },
    snack2: { id: "11a", name: "Trail Mix", description: "Nutrient-dense mix of nuts and dried fruit", calories: 170, protein: 5, carbs: 20, fats: 9, type: "veg", prep_time: 0, cook_time: 0, difficulty: "easy", ingredients: ["20g almonds", "10g walnuts", "20g raisins"], instructions: ["Mix together", "Portion and enjoy"] },
    dinner: { id: "12", name: "Baked Chicken Thighs", description: "Juicy herb-marinated chicken thighs with sweet potatoes", calories: 495, protein: 42, carbs: 35, fats: 18, type: "non_veg", prep_time: 15, cook_time: 35, difficulty: "medium", ingredients: ["2 chicken thighs", "2 medium sweet potatoes", "Fresh herbs", "3 tbsp olive oil", "Garlic", "Paprika"], instructions: ["Marinate chicken with herbs and spices", "Cut sweet potatoes into wedges", "Arrange in baking dish", "Bake at 200°C for 35 minutes"] },
  },
  Friday: {
    breakfast: { id: "13", name: "Smoothie Bowl", description: "Thick berry smoothie bowl topped with granola and fruits", calories: 350, protein: 15, carbs: 58, fats: 8, type: "veg", prep_time: 10, cook_time: 0, difficulty: "easy", ingredients: ["1 frozen banana", "100g mixed frozen berries", "100ml almond milk", "1 scoop protein powder", "Granola", "Fresh fruits for topping"], instructions: ["Blend frozen fruits with milk and protein powder", "Pour into bowl", "Top with granola", "Arrange fresh fruits on top"] },
    snack: { id: "13a", name: "Protein Bar", description: "Convenient high-protein snack", calories: 180, protein: 15, carbs: 20, fats: 6, type: "veg", prep_time: 0, cook_time: 0, difficulty: "easy", ingredients: ["1 protein bar"], instructions: ["Unwrap and enjoy"] },
    lunch: { id: "14", name: "Veggie Buddha Bowl", description: "Nourishing bowl with quinoa, chickpeas, and roasted vegetables", calories: 425, protein: 16, carbs: 62, fats: 14, type: "veg", prep_time: 15, cook_time: 25, difficulty: "medium", ingredients: ["80g quinoa", "150g chickpeas", "100g sweet potato", "50g kale", "2 tbsp tahini", "Lemon juice"], instructions: ["Cook quinoa", "Roast chickpeas and sweet potato", "Massage kale with lemon", "Arrange all in bowl", "Drizzle with tahini dressing"] },
    snack2: { id: "14a", name: "Edamame", description: "Steamed soybeans for plant-based protein", calories: 120, protein: 12, carbs: 10, fats: 5, type: "veg", prep_time: 5, cook_time: 5, difficulty: "easy", ingredients: ["100g edamame", "Sea salt"], instructions: ["Steam edamame", "Sprinkle with salt"] },
    dinner: { id: "15", name: "Shrimp Pasta", description: "Garlic shrimp with whole wheat pasta in light sauce", calories: 480, protein: 32, carbs: 52, fats: 16, type: "non_veg", prep_time: 10, cook_time: 15, difficulty: "medium", ingredients: ["200g shrimp", "100g whole wheat pasta", "4 cloves garlic", "Cherry tomatoes", "2 tbsp olive oil", "Fresh basil", "White wine"], instructions: ["Cook pasta al dente", "Sauté garlic in olive oil", "Add shrimp and cook until pink", "Toss with pasta and tomatoes", "Finish with basil and wine"] },
  },
  Saturday: {
    breakfast: { id: "16", name: "Veggie Omelet", description: "Fluffy omelet filled with colorful vegetables and cheese", calories: 365, protein: 26, carbs: 12, fats: 24, type: "veg", prep_time: 10, cook_time: 10, difficulty: "easy", ingredients: ["3 eggs", "50g bell peppers", "30g mushrooms", "30g spinach", "40g cheese", "1 tbsp butter"], instructions: ["Beat eggs with salt and pepper", "Sauté vegetables", "Pour eggs into pan", "Add vegetables and cheese", "Fold omelet when set"] },
    snack: { id: "16a", name: "Rice Cakes with Almond Butter", description: "Light and crunchy snack with protein", calories: 150, protein: 6, carbs: 18, fats: 7, type: "veg", prep_time: 2, cook_time: 0, difficulty: "easy", ingredients: ["2 rice cakes", "1 tbsp almond butter"], instructions: ["Spread almond butter on rice cakes"] },
    lunch: { id: "17", name: "Grilled Fish Tacos", description: "Light fish tacos with cabbage slaw and lime crema", calories: 440, protein: 34, carbs: 42, fats: 14, type: "non_veg", prep_time: 15, cook_time: 10, difficulty: "medium", ingredients: ["150g white fish", "2 corn tortillas", "100g cabbage", "Greek yogurt", "Lime", "Cilantro", "Spices"], instructions: ["Season and grill fish", "Make slaw with cabbage and lime", "Prepare yogurt crema", "Warm tortillas", "Assemble tacos with all components"] },
    snack2: { id: "17a", name: "Mixed Berries", description: "Antioxidant-rich fruit snack", calories: 80, protein: 1, carbs: 20, fats: 1, type: "veg", prep_time: 0, cook_time: 0, difficulty: "easy", ingredients: ["150g mixed berries"], instructions: ["Wash and enjoy"] },
    dinner: { id: "18", name: "Paneer Tikka", description: "Marinated paneer cubes grilled to perfection with spices", calories: 425, protein: 24, carbs: 22, fats: 26, type: "veg", prep_time: 30, cook_time: 15, difficulty: "medium", ingredients: ["200g paneer", "100g yogurt", "Bell peppers", "Onion", "Tikka spices", "Kasuri methi"], instructions: ["Marinate paneer in spiced yogurt for 30 min", "Thread on skewers with vegetables", "Grill or bake until charred", "Serve with mint chutney"] },
  },
  Sunday: {
    breakfast: { id: "19", name: "French Toast", description: "Classic French toast with cinnamon and maple syrup", calories: 385, protein: 16, carbs: 52, fats: 12, type: "veg", prep_time: 5, cook_time: 10, difficulty: "easy", ingredients: ["2 slices bread", "2 eggs", "50ml milk", "Cinnamon", "Vanilla extract", "Maple syrup", "Butter"], instructions: ["Whisk eggs, milk, cinnamon, and vanilla", "Dip bread in mixture", "Cook in buttered pan until golden", "Serve with maple syrup"] },
    snack: { id: "19a", name: "Protein Shake", description: "Quick liquid nutrition", calories: 190, protein: 25, carbs: 15, fats: 4, type: "veg", prep_time: 3, cook_time: 0, difficulty: "easy", ingredients: ["1 scoop protein powder", "300ml water", "Ice"], instructions: ["Shake or blend with ice"] },
    lunch: { id: "20", name: "Chicken Biryani Bowl", description: "Aromatic basmati rice with spiced chicken and herbs", calories: 510, protein: 36, carbs: 62, fats: 12, type: "non_veg", prep_time: 20, cook_time: 30, difficulty: "hard", ingredients: ["150g chicken", "100g basmati rice", "Onions", "Yogurt", "Biryani spices", "Mint", "Saffron"], instructions: ["Marinate chicken in yogurt and spices", "Cook rice until 70% done", "Layer chicken and rice", "Dum cook covered for 20 minutes", "Serve with raita"] },
    snack2: { id: "20a", name: "Dark Chocolate & Nuts", description: "Satisfying treat with healthy fats", calories: 160, protein: 4, carbs: 15, fats: 11, type: "veg", prep_time: 0, cook_time: 0, difficulty: "easy", ingredients: ["20g dark chocolate", "15g mixed nuts"], instructions: ["Enjoy together"] },
    dinner: { id: "21", name: "Mushroom Risotto", description: "Creamy Italian risotto with wild mushrooms", calories: 445, protein: 14, carbs: 58, fats: 18, type: "veg", prep_time: 10, cook_time: 30, difficulty: "hard", ingredients: ["150g arborio rice", "200g mixed mushrooms", "500ml vegetable stock", "50g parmesan", "White wine", "Butter", "Onion", "Garlic"], instructions: ["Sauté onion and garlic", "Add rice and toast", "Gradually add warm stock while stirring", "Sauté mushrooms separately", "Stir in mushrooms, butter, and parmesan"] },
  },
};

const Planner = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<{ date: string; mealType?: string; mealName?: string }>();
  const [dayFilters, setDayFilters] = useState<{ [key: string]: { veg: boolean; nonVeg: boolean } }>({
    Monday: { veg: true, nonVeg: true },
    Tuesday: { veg: true, nonVeg: true },
    Wednesday: { veg: true, nonVeg: true },
    Thursday: { veg: true, nonVeg: true },
    Friday: { veg: true, nonVeg: true },
    Saturday: { veg: true, nonVeg: true },
    Sunday: { veg: true, nonVeg: true },
  });
  
  const { addMilestone, hasMilestone } = useMilestones();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const day = daysOfWeek[currentDayIndex];
  const dayDate = format(addDays(currentWeek, currentDayIndex), "yyyy-MM-dd");
  const meals = allMeals[day] || {};
  
  const filteredMeals = Object.entries(meals).reduce((acc: any, [mealType, meal]: any) => {
    const filters = dayFilters[day];
    if ((filters.veg && meal.type === "veg") || (filters.nonVeg && meal.type === "non_veg")) {
      acc[mealType] = meal;
    }
    return acc;
  }, {});

  const toggleDayFilter = (day: string, filterType: 'veg' | 'nonVeg') => {
    setDayFilters(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [filterType]: !prev[day][filterType]
      }
    }));
  };

  // Calculate daily totals
  const dailyTotals = Object.values(filteredMeals).reduce((acc: { calories: number; protein: number; carbs: number; fats: number }, meal: any) => ({
    calories: acc.calories + (meal?.calories || 0),
    protein: acc.protein + (meal?.protein || 0),
    carbs: acc.carbs + (meal?.carbs || 0),
    fats: acc.fats + (meal?.fats || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Weekly Meal Planner
              </h1>
              <p className="text-muted-foreground mt-2">5 meals per day for optimal nutrition</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-sm mb-2">
                <Calendar className="h-3 w-3 mr-1" />
                {format(addDays(currentWeek, currentDayIndex), "MMM d, yyyy")}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Daily Total: <span className="font-bold text-primary">{dailyTotals?.calories || 0} cal</span>
              </div>
            </div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="relative mb-8 overflow-hidden">
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentDayIndex(Math.max(0, currentDayIndex - 1))}
                disabled={currentDayIndex === 0}
                className="z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
                {daysOfWeek.map((d, i) => {
                  const isActive = i === currentDayIndex;
                  const isPast = i < currentDayIndex;
                  const isFuture = i > currentDayIndex;
                  
                  return (
                    <button
                      key={d}
                      onClick={() => setCurrentDayIndex(i)}
                      className={`
                        min-w-[120px] px-6 py-3 rounded-xl font-medium transition-all duration-300
                        ${isActive 
                          ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                          : isPast
                          ? "bg-muted/50 text-muted-foreground scale-95 opacity-60"
                          : "bg-card border border-border hover:border-primary/50 scale-95 opacity-80"
                        }
                      `}
                    >
                      <div className="text-sm">{d}</div>
                      <div className="text-xs mt-1 opacity-75">
                        {format(addDays(currentWeek, i), "MMM d")}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentDayIndex(Math.min(6, currentDayIndex + 1))}
                disabled={currentDayIndex === 6}
                className="z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Day Meal Card */}
          <Card className="shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  {day}'s Meals (5 Meals)
                </CardTitle>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleDayFilter(day, 'veg')}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                      ${dayFilters[day].veg 
                        ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300" 
                        : "bg-muted border-border opacity-50"
                      }
                    `}
                  >
                    <span className="text-xl">🥗</span>
                    <span className="font-medium">Veg</span>
                  </button>
                  <button
                    onClick={() => toggleDayFilter(day, 'nonVeg')}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                      ${dayFilters[day].nonVeg 
                        ? "bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-300" 
                        : "bg-muted border-border opacity-50"
                      }
                    `}
                  >
                    <span className="text-xl">🍗</span>
                    <span className="font-medium">Non-Veg</span>
                  </button>
                </div>
              </div>
              <CardDescription className="text-base mt-2">
                Nutritionally balanced 5-meal plan for {dailyTotals?.calories || 0} calories daily
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {Object.keys(filteredMeals).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No meals match your current filters</p>
                  <p className="text-sm mt-2">Try enabling veg or non-veg options</p>
                </div>
              ) : (
                Object.entries(filteredMeals).map(([mealType, meal]: any) => {
                  const isCompleted = hasMilestone(dayDate, mealType);
                  
                  return (
                    <Card key={mealType} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className={`w-2 ${meal.type === 'veg' ? 'bg-green-500' : 'bg-orange-500'}`} />
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="capitalize">
                                  {mealType === 'snack2' ? 'Snack 2' : mealType}
                                </Badge>
                                <Badge variant={meal.type === 'veg' ? 'secondary' : 'default'}>
                                  {meal.type === 'veg' ? '🥗 Vegetarian' : '🍗 Non-Veg'}
                                </Badge>
                                {isCompleted && (
                                  <Badge className="bg-green-500">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-bold mb-1">{meal.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold text-primary">{meal.calories}</span>
                                  <span className="text-muted-foreground">cal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold">{meal.protein}g</span>
                                  <span className="text-muted-foreground">protein</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold">{meal.carbs}g</span>
                                  <span className="text-muted-foreground">carbs</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold">{meal.fats}g</span>
                                  <span className="text-muted-foreground">fats</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <span>⏱️ {meal.prep_time + meal.cook_time} min</span>
                                  <span>•</span>
                                  <span className="capitalize">{meal.difficulty}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Link to={`/recipe/${meal.id}`} className="flex-1">
                              <Button size="sm" variant="default" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                View Full Recipe
                              </Button>
                            </Link>
                            {!isCompleted && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedMilestone({ date: dayDate, mealType: mealType as "breakfast" | "lunch" | "dinner" | "snack", mealName: meal.name });
                                  setMilestoneDialogOpen(true);
                                }}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <MilestoneDialog 
        open={milestoneDialogOpen} 
        onOpenChange={setMilestoneDialogOpen} 
        onConfirm={async (notes) => {
          if (selectedMilestone && selectedMilestone.mealType) {
            await addMilestone(
              selectedMilestone.date,
              selectedMilestone.mealType as "breakfast" | "lunch" | "dinner" | "snack",
              notes
            );
            setMilestoneDialogOpen(false);
          }
        }} 
      />
    </div>
  );
};

export default Planner;
