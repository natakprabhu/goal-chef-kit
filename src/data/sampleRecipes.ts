// 100+ Indian Recipes for Weight Gain, Cutting, and Maintenance
// All measurements in Indian units (kg, gm, ml, tablespoon)
// No beef, no pork - only chicken, mutton, eggs for non-veg

export const sampleRecipes = [
  // WEIGHT GAIN - BREAKFAST (VEG)
  {
    title: "Banana Oats Smoothie Bowl",
    description: "High-calorie smoothie bowl with oats, banana, and nuts for muscle building",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 0,
    calories: 520,
    protein: 18,
    carbs: 75,
    fats: 18,
    fiber: 8,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "quick", "muscle building"],
    ingredients: [
      "2 ripe bananas",
      "60 gm rolled oats",
      "250 ml full-fat milk",
      "2 tablespoon peanut butter",
      "1 tablespoon honey",
      "20 gm almonds, chopped",
      "1 tablespoon chia seeds"
    ],
    instructions: [
      "Blend bananas, oats, milk, and peanut butter until smooth",
      "Pour into a bowl",
      "Top with chopped almonds, chia seeds, and honey",
      "Serve immediately"
    ],
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
  },
  {
    title: "Paneer Paratha with Dahi",
    description: "Stuffed whole wheat paratha with paneer filling and curd",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 20,
    calories: 580,
    protein: 24,
    carbs: 68,
    fats: 22,
    fiber: 6,
    access_level: "guest",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "120 gm whole wheat flour",
      "150 gm paneer, crumbled",
      "1 green chilli, chopped",
      "1 tablespoon coriander leaves",
      "1/2 teaspoon garam masala",
      "2 tablespoon ghee",
      "200 gm curd",
      "Salt to taste"
    ],
    instructions: [
      "Mix paneer, chilli, coriander, garam masala, and salt",
      "Make dough with wheat flour and water",
      "Roll out dough, add paneer filling, seal edges",
      "Cook paratha on tawa with ghee until golden",
      "Serve hot with curd"
    ],
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80"
  },
  {
    title: "Moong Dal Cheela with Chutney",
    description: "Protein-rich moong dal pancakes with green chutney",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 15,
    calories: 450,
    protein: 22,
    carbs: 55,
    fats: 15,
    fiber: 8,
    access_level: "guest",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "150 gm moong dal, soaked",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli",
      "1 tablespoon ginger paste",
      "2 tablespoon oil",
      "Coriander leaves",
      "Salt and spices to taste"
    ],
    instructions: [
      "Grind soaked moong dal with green chilli",
      "Add onion, tomato, ginger paste, and spices",
      "Heat tawa, pour batter like pancake",
      "Cook both sides with oil until golden",
      "Serve with green chutney"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },

  // WEIGHT GAIN - BREAKFAST (NON-VEG)
  {
    title: "Egg Bhurji with Paratha",
    description: "Scrambled eggs with spices served with buttered paratha",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 620,
    protein: 32,
    carbs: 58,
    fats: 28,
    fiber: 4,
    access_level: "guest",
    tags: ["weight gain", "high protein", "quick"],
    ingredients: [
      "4 eggs",
      "1 onion, chopped",
      "1 tomato, chopped",
      "2 green chillies",
      "1 tablespoon butter",
      "2 whole wheat parathas",
      "Coriander leaves",
      "Salt and spices"
    ],
    instructions: [
      "Heat butter, sauté onions and chillies",
      "Add tomatoes and spices, cook until soft",
      "Beat eggs and add to pan",
      "Scramble continuously until cooked",
      "Garnish with coriander, serve with hot parathas"
    ],
    image_url: "https://images.unsplash.com/photo-1545605847-8452f24e81e1?w=800&q=80"
  },
  {
    title: "Chicken Keema Sandwich",
    description: "Spiced minced chicken sandwich with cheese",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 20,
    calories: 680,
    protein: 42,
    carbs: 62,
    fats: 25,
    fiber: 5,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "muscle building"],
    ingredients: [
      "200 gm chicken keema",
      "4 bread slices",
      "2 cheese slices",
      "1 onion, chopped",
      "1 tablespoon ginger-garlic paste",
      "2 tablespoon butter",
      "Spices: turmeric, red chilli, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Sauté onion and ginger-garlic paste in butter",
      "Add chicken keema and spices, cook until done",
      "Toast bread slices with butter",
      "Layer keema and cheese between bread",
      "Grill until cheese melts, serve hot"
    ],
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },

  // WEIGHT LOSS - BREAKFAST (VEG)
  {
    title: "Oats Upma",
    description: "Low-calorie savory oats with vegetables",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 280,
    protein: 10,
    carbs: 42,
    fats: 8,
    fiber: 7,
    access_level: "guest",
    tags: ["weight loss", "low calorie", "fiber rich"],
    ingredients: [
      "60 gm steel-cut oats",
      "1 onion, chopped",
      "1 carrot, chopped",
      "50 gm green peas",
      "1 green chilli",
      "1 teaspoon mustard seeds",
      "1 tablespoon oil",
      "Curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Dry roast oats until aromatic",
      "Heat oil, add mustard seeds and curry leaves",
      "Sauté onions, carrots, peas, and chilli",
      "Add roasted oats and 300 ml water",
      "Cook until water absorbs, serve hot"
    ],
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
  },
  {
    title: "Poha with Vegetables",
    description: "Light flattened rice with mixed vegetables",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 260,
    protein: 8,
    carbs: 45,
    fats: 6,
    fiber: 5,
    access_level: "guest",
    tags: ["weight loss", "low calorie", "traditional"],
    ingredients: [
      "100 gm poha (flattened rice)",
      "1 onion, chopped",
      "1 potato, small, diced",
      "50 gm green peas",
      "1 teaspoon mustard seeds",
      "Curry leaves",
      "1 tablespoon oil",
      "Peanuts for garnish",
      "Lemon juice"
    ],
    instructions: [
      "Rinse poha and drain well",
      "Heat oil, temper mustard seeds and curry leaves",
      "Add onion and potato, cook until soft",
      "Add poha, peas, salt, and turmeric",
      "Mix well, cook for 5 minutes",
      "Garnish with peanuts and lemon juice"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },
  {
    title: "Vegetable Daliya (Broken Wheat)",
    description: "Nutritious broken wheat porridge with vegetables",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 20,
    calories: 290,
    protein: 12,
    carbs: 48,
    fats: 7,
    fiber: 9,
    access_level: "guest",
    tags: ["weight loss", "high fiber", "filling"],
    ingredients: [
      "80 gm broken wheat (daliya)",
      "1 onion, chopped",
      "1 carrot, chopped",
      "1 tomato, chopped",
      "50 gm beans, chopped",
      "1 teaspoon cumin seeds",
      "1 tablespoon oil",
      "Salt and spices"
    ],
    instructions: [
      "Dry roast daliya until aromatic",
      "Heat oil, add cumin seeds",
      "Sauté vegetables until tender",
      "Add roasted daliya and 400 ml water",
      "Cook until soft and water absorbs",
      "Serve hot with curd"
    ],
    image_url: "https://images.unsplash.com/photo-1596040008851-91c06d937e7b?w=800&q=80"
  },

  // WEIGHT LOSS - BREAKFAST (NON-VEG)
  {
    title: "Egg White Omelette with Toast",
    description: "Low-fat egg white omelette with multigrain toast",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 10,
    calories: 240,
    protein: 24,
    carbs: 28,
    fats: 4,
    fiber: 4,
    access_level: "guest",
    tags: ["weight loss", "high protein", "low fat"],
    ingredients: [
      "4 egg whites",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli",
      "1 teaspoon olive oil",
      "2 multigrain bread slices",
      "Coriander leaves",
      "Salt and pepper"
    ],
    instructions: [
      "Beat egg whites with salt and pepper",
      "Heat oil in non-stick pan",
      "Sauté onions, tomatoes, and chilli",
      "Pour egg whites, cook until set",
      "Serve with toasted multigrain bread"
    ],
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
  },
  {
    title: "Chicken Breast with Vegetables",
    description: "Grilled chicken breast with steamed vegetables",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 20,
    calories: 320,
    protein: 42,
    carbs: 18,
    fats: 8,
    fiber: 6,
    access_level: "logged_in",
    tags: ["weight loss", "high protein", "low carb"],
    ingredients: [
      "150 gm chicken breast",
      "100 gm broccoli",
      "1 carrot, sliced",
      "50 gm beans",
      "1 teaspoon olive oil",
      "1 teaspoon lemon juice",
      "Black pepper and salt",
      "Herbs: thyme, rosemary"
    ],
    instructions: [
      "Season chicken with salt, pepper, and herbs",
      "Grill or pan-fry chicken in olive oil",
      "Steam vegetables until tender-crisp",
      "Slice cooked chicken",
      "Serve with vegetables and lemon juice"
    ],
    image_url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80"
  },

  // MAINTENANCE - BREAKFAST (VEG)
  {
    title: "Multigrain Dosa with Sambhar",
    description: "Nutritious multigrain dosa with lentil sambhar",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 20,
    calories: 380,
    protein: 15,
    carbs: 58,
    fats: 10,
    fiber: 8,
    access_level: "guest",
    tags: ["maintenance", "balanced", "traditional"],
    ingredients: [
      "100 gm mixed grains (rice, wheat, oats)",
      "30 gm urad dal",
      "1 tablespoon oil for cooking",
      "For Sambhar: 100 gm mixed vegetables",
      "50 gm toor dal",
      "1 tablespoon sambhar masala",
      "Tamarind pulp"
    ],
    instructions: [
      "Soak grains and dal overnight, grind to batter",
      "Ferment batter for 8 hours",
      "Make dosas on hot tawa with minimal oil",
      "Prepare sambhar with dal, vegetables, and spices",
      "Serve hot dosas with sambhar"
    ],
    image_url: "https://images.unsplash.com/photo-1589301773859-f996f5d51de0?w=800&q=80"
  },
  {
    title: "Aloo Paratha with Curd",
    description: "Whole wheat paratha stuffed with spiced potatoes",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 20,
    calories: 420,
    protein: 12,
    carbs: 62,
    fats: 14,
    fiber: 6,
    access_level: "guest",
    tags: ["maintenance", "traditional", "comfort food"],
    ingredients: [
      "120 gm whole wheat flour",
      "2 medium potatoes, boiled and mashed",
      "1 green chilli, chopped",
      "1 teaspoon cumin seeds",
      "Coriander leaves",
      "1 tablespoon ghee",
      "150 gm curd",
      "Salt and spices"
    ],
    instructions: [
      "Mix mashed potatoes with spices and herbs",
      "Make dough with wheat flour",
      "Roll dough, stuff with potato mixture",
      "Cook on tawa with ghee until golden",
      "Serve with fresh curd"
    ],
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80"
  },

  // WEIGHT GAIN - LUNCH (VEG)
  {
    title: "Dal Makhani with Jeera Rice",
    description: "Creamy black lentils with cumin rice",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 60,
    calories: 620,
    protein: 24,
    carbs: 88,
    fats: 18,
    fiber: 12,
    access_level: "guest",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "150 gm whole black urad dal",
      "30 gm rajma (kidney beans)",
      "100 gm basmati rice",
      "3 tablespoon butter",
      "100 ml cream",
      "2 tomatoes, pureed",
      "1 tablespoon ginger-garlic paste",
      "1 teaspoon cumin seeds",
      "Spices and salt"
    ],
    instructions: [
      "Soak dal and rajma overnight, pressure cook until soft",
      "Prepare tomato-based gravy with butter and spices",
      "Add cooked dal, simmer for 30 minutes",
      "Add cream before serving",
      "Cook rice with cumin seeds",
      "Serve dal with jeera rice"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },
  {
    title: "Paneer Butter Masala with Naan",
    description: "Rich paneer curry with butter naan",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 30,
    calories: 680,
    protein: 28,
    carbs: 72,
    fats: 30,
    fiber: 6,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "rich"],
    ingredients: [
      "200 gm paneer, cubed",
      "3 tomatoes, pureed",
      "100 ml cream",
      "2 tablespoon butter",
      "1 tablespoon kasuri methi",
      "2 naan breads",
      "1 tablespoon ginger-garlic paste",
      "Spices: red chilli, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Sauté ginger-garlic in butter",
      "Add tomato puree and spices, cook well",
      "Add paneer cubes and cream",
      "Simmer for 10 minutes, add kasuri methi",
      "Serve with hot butter naan"
    ],
    image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
  },
  {
    title: "Chole Bhature",
    description: "Spiced chickpeas with deep-fried bread",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Hard",
    prep_time: 30,
    cook_time: 45,
    calories: 720,
    protein: 22,
    carbs: 95,
    fats: 28,
    fiber: 15,
    access_level: "logged_in",
    tags: ["weight gain", "traditional", "high calorie"],
    ingredients: [
      "200 gm chickpeas, soaked",
      "150 gm maida (all-purpose flour)",
      "50 ml curd",
      "2 tomatoes, pureed",
      "1 tablespoon chole masala",
      "Oil for deep frying",
      "1 teaspoon baking soda",
      "Salt and spices"
    ],
    instructions: [
      "Pressure cook chickpeas until soft",
      "Prepare gravy with tomatoes and chole masala",
      "Add chickpeas, cook for 20 minutes",
      "Make dough with maida, curd, and baking soda",
      "Deep fry bhature until puffed and golden",
      "Serve hot chole with bhature"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },

  // WEIGHT GAIN - LUNCH (NON-VEG)
  {
    title: "Butter Chicken with Naan",
    description: "Creamy chicken curry with butter naan",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 40,
    calories: 780,
    protein: 48,
    carbs: 68,
    fats: 35,
    fiber: 4,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "rich"],
    ingredients: [
      "300 gm chicken, boneless",
      "100 ml cream",
      "3 tablespoon butter",
      "3 tomatoes, pureed",
      "1 tablespoon kasuri methi",
      "2 naan breads",
      "1 tablespoon ginger-garlic paste",
      "Spices: red chilli, garam masala, turmeric",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in curd and spices",
      "Grill or pan-fry chicken pieces",
      "Prepare tomato-based gravy with butter",
      "Add grilled chicken and cream",
      "Simmer, add kasuri methi",
      "Serve with butter naan"
    ],
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80"
  },
  {
    title: "Mutton Rogan Josh with Rice",
    description: "Kashmiri mutton curry with basmati rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Hard",
    prep_time: 25,
    cook_time: 90,
    calories: 820,
    protein: 52,
    carbs: 75,
    fats: 38,
    fiber: 5,
    access_level: "subscribed",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "350 gm mutton, with bone",
      "150 gm curd",
      "3 tablespoon ghee",
      "2 onions, fried",
      "150 gm basmati rice",
      "1 tablespoon ginger-garlic paste",
      "Whole spices: bay leaf, cardamom, cinnamon",
      "Kashmiri red chilli powder",
      "Salt to taste"
    ],
    instructions: [
      "Marinate mutton in curd and spices",
      "Heat ghee, add whole spices",
      "Add marinated mutton, cook on high heat",
      "Add fried onion paste and water",
      "Pressure cook until mutton is tender",
      "Cook rice separately, serve together"
    ],
    image_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"
  },
  {
    title: "Chicken Biryani",
    description: "Aromatic layered rice with spiced chicken",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Hard",
    prep_time: 40,
    cook_time: 50,
    calories: 750,
    protein: 45,
    carbs: 88,
    fats: 25,
    fiber: 4,
    access_level: "subscribed",
    tags: ["weight gain", "high protein", "festive"],
    ingredients: [
      "300 gm chicken, cut into pieces",
      "200 gm basmati rice",
      "150 gm curd",
      "2 onions, sliced and fried",
      "3 tablespoon ghee",
      "Whole spices: bay leaf, cardamom, cloves",
      "Biryani masala, saffron",
      "Mint and coriander leaves",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in curd, biryani masala, and fried onions",
      "Partially cook rice with whole spices",
      "Layer marinated chicken and rice in a pot",
      "Add saffron milk, mint, and ghee on top",
      "Cook on dum (sealed pot) for 30 minutes",
      "Serve hot with raita"
    ],
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
  },

  // WEIGHT LOSS - LUNCH (VEG)
  {
    title: "Mixed Dal with Brown Rice",
    description: "Protein-rich mixed lentils with brown rice",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 30,
    calories: 340,
    protein: 16,
    carbs: 58,
    fats: 6,
    fiber: 12,
    access_level: "guest",
    tags: ["weight loss", "high fiber", "protein rich"],
    ingredients: [
      "50 gm moong dal",
      "50 gm toor dal",
      "30 gm masoor dal",
      "100 gm brown rice",
      "1 tomato, chopped",
      "1 teaspoon cumin seeds",
      "1 tablespoon oil",
      "Turmeric, salt",
      "Coriander leaves"
    ],
    instructions: [
      "Wash and pressure cook all dals together",
      "Prepare tempering with cumin and tomatoes",
      "Add cooked dal, simmer for 10 minutes",
      "Cook brown rice separately",
      "Serve dal with brown rice"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },
  {
    title: "Palak Paneer with Roti",
    description: "Low-fat spinach paneer curry with whole wheat roti",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 25,
    calories: 380,
    protein: 22,
    carbs: 45,
    fats: 12,
    fiber: 8,
    access_level: "guest",
    tags: ["weight loss", "high protein", "iron rich"],
    ingredients: [
      "200 gm spinach, blanched",
      "100 gm low-fat paneer",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 tablespoon ginger-garlic paste",
      "1 tablespoon oil",
      "2 whole wheat rotis (80 gm)",
      "Spices: cumin, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Blend blanched spinach to puree",
      "Sauté onions and ginger-garlic in oil",
      "Add tomatoes and spices, cook well",
      "Add spinach puree, bring to boil",
      "Add paneer cubes, simmer for 5 minutes",
      "Serve with whole wheat rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },
  {
    title: "Moong Dal Khichdi",
    description: "Light and digestible rice and lentil porridge",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 25,
    calories: 320,
    protein: 14,
    carbs: 54,
    fats: 6,
    fiber: 8,
    access_level: "guest",
    tags: ["weight loss", "easy to digest", "comfort food"],
    ingredients: [
      "80 gm rice",
      "50 gm moong dal",
      "1 teaspoon cumin seeds",
      "1 teaspoon ghee",
      "Turmeric powder",
      "Ginger, chopped",
      "Salt to taste",
      "Water as needed"
    ],
    instructions: [
      "Wash rice and dal together",
      "Heat ghee, add cumin and ginger",
      "Add rice, dal, turmeric, and water",
      "Pressure cook until soft and mushy",
      "Serve hot with curd or pickle"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },

  // WEIGHT LOSS - LUNCH (NON-VEG)
  {
    title: "Grilled Chicken Salad",
    description: "High-protein grilled chicken with fresh vegetables",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 20,
    calories: 320,
    protein: 42,
    carbs: 20,
    fats: 8,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "high protein", "low carb"],
    ingredients: [
      "150 gm chicken breast",
      "100 gm mixed salad leaves",
      "1 cucumber, sliced",
      "1 tomato, chopped",
      "1 carrot, julienned",
      "1 tablespoon olive oil",
      "Lemon juice",
      "Black pepper and salt",
      "Herbs: oregano, basil"
    ],
    instructions: [
      "Season chicken with salt, pepper, and herbs",
      "Grill chicken until cooked through",
      "Mix all vegetables in a bowl",
      "Slice grilled chicken",
      "Toss salad with olive oil and lemon juice",
      "Top with chicken slices, serve fresh"
    ],
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
  },
  {
    title: "Fish Curry with Brown Rice",
    description: "Light fish curry with brown rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 30,
    calories: 380,
    protein: 35,
    carbs: 42,
    fats: 10,
    fiber: 5,
    access_level: "logged_in",
    tags: ["weight loss", "high protein", "omega-3"],
    ingredients: [
      "200 gm fish (rohu or pomfret)",
      "100 gm brown rice",
      "2 tomatoes, pureed",
      "1 onion, chopped",
      "1 tablespoon coconut oil",
      "Curry leaves",
      "Turmeric, red chilli powder",
      "Tamarind pulp",
      "Salt to taste"
    ],
    instructions: [
      "Marinate fish with turmeric and salt",
      "Prepare tomato-based curry with spices",
      "Add fish pieces, cook gently",
      "Add tamarind for tanginess",
      "Cook brown rice separately",
      "Serve fish curry with brown rice"
    ],
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
  },
  {
    title: "Chicken Soup with Vegetables",
    description: "Clear chicken soup with mixed vegetables",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 35,
    calories: 240,
    protein: 28,
    carbs: 18,
    fats: 6,
    fiber: 4,
    access_level: "guest",
    tags: ["weight loss", "high protein", "low calorie"],
    ingredients: [
      "150 gm chicken breast, shredded",
      "1 carrot, chopped",
      "1 capsicum, chopped",
      "50 gm cabbage, chopped",
      "2 cloves garlic",
      "1 teaspoon ginger, grated",
      "Black pepper",
      "Salt to taste",
      "Coriander leaves"
    ],
    instructions: [
      "Boil chicken with salt until cooked",
      "Shred chicken, keep stock",
      "Add vegetables to chicken stock",
      "Add ginger, garlic, and pepper",
      "Cook until vegetables are tender",
      "Add shredded chicken, garnish with coriander"
    ],
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80"
  },

  // MAINTENANCE - LUNCH (VEG)
  {
    title: "Rajma Chawal",
    description: "Kidney beans curry with steamed rice",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 45,
    calories: 450,
    protein: 18,
    carbs: 72,
    fats: 10,
    fiber: 14,
    access_level: "guest",
    tags: ["maintenance", "protein rich", "traditional"],
    ingredients: [
      "150 gm rajma (kidney beans), soaked",
      "120 gm rice",
      "2 tomatoes, pureed",
      "1 onion, chopped",
      "1 tablespoon ginger-garlic paste",
      "1 tablespoon oil",
      "Spices: cumin, coriander powder, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Pressure cook soaked rajma until soft",
      "Prepare onion-tomato gravy with spices",
      "Add cooked rajma, simmer for 20 minutes",
      "Cook rice separately",
      "Serve rajma with steamed rice"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },
  {
    title: "Aloo Gobi with Roti",
    description: "Potato and cauliflower curry with whole wheat roti",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 25,
    calories: 420,
    protein: 12,
    carbs: 65,
    fats: 12,
    fiber: 8,
    access_level: "guest",
    tags: ["maintenance", "traditional", "comfort food"],
    ingredients: [
      "200 gm cauliflower, florets",
      "1 large potato, cubed",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices: turmeric, cumin, coriander powder",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add cumin seeds",
      "Sauté onions until golden",
      "Add potato and spices, cook for 5 minutes",
      "Add cauliflower, cover and cook until tender",
      "Add tomatoes, cook for 5 more minutes",
      "Serve with whole wheat rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },

  // MAINTENANCE - LUNCH (NON-VEG)
  {
    title: "Chicken Curry with Rice",
    description: "Home-style chicken curry with basmati rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 40,
    calories: 520,
    protein: 38,
    carbs: 58,
    fats: 16,
    fiber: 4,
    access_level: "logged_in",
    tags: ["maintenance", "balanced", "traditional"],
    ingredients: [
      "250 gm chicken, with bone",
      "120 gm basmati rice",
      "2 tomatoes, pureed",
      "1 onion, chopped",
      "1 tablespoon ginger-garlic paste",
      "2 tablespoon oil",
      "Spices: turmeric, red chilli, coriander powder, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Sauté onions and ginger-garlic in oil",
      "Add chicken pieces and spices, brown well",
      "Add tomato puree and water",
      "Pressure cook until chicken is tender",
      "Cook rice separately",
      "Serve curry with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80"
  },

  // WEIGHT GAIN - DINNER (VEG)
  {
    title: "Malai Kofta with Naan",
    description: "Cottage cheese dumplings in rich gravy",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Hard",
    prep_time: 30,
    cook_time: 40,
    calories: 680,
    protein: 24,
    carbs: 72,
    fats: 32,
    fiber: 6,
    access_level: "subscribed",
    tags: ["weight gain", "rich", "festive"],
    ingredients: [
      "200 gm paneer, grated",
      "2 potatoes, boiled and mashed",
      "50 gm cashews, soaked",
      "100 ml cream",
      "3 tomatoes, pureed",
      "2 tablespoon butter",
      "2 naan breads",
      "Spices: garam masala, kasuri methi",
      "Salt to taste"
    ],
    instructions: [
      "Mix paneer and potato, make balls",
      "Deep fry koftas until golden",
      "Prepare rich gravy with cashew paste, tomatoes, cream",
      "Add fried koftas to gravy before serving",
      "Serve with butter naan"
    ],
    image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
  },
  {
    title: "Paneer Tikka Masala with Paratha",
    description: "Grilled paneer in creamy tomato gravy",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 35,
    calories: 640,
    protein: 28,
    carbs: 65,
    fats: 28,
    fiber: 6,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "restaurant style"],
    ingredients: [
      "200 gm paneer, cubed",
      "100 gm curd",
      "1 capsicum, cubed",
      "1 onion, cubed",
      "3 tablespoon butter",
      "100 ml cream",
      "3 tomatoes, pureed",
      "2 parathas",
      "Tikka masala spices",
      "Salt to taste"
    ],
    instructions: [
      "Marinate paneer, capsicum, onion in curd and tikka masala",
      "Grill or pan-fry until charred",
      "Prepare tomato-based gravy with butter and cream",
      "Add grilled paneer and vegetables",
      "Serve with parathas"
    ],
    image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
  },

  // WEIGHT GAIN - DINNER (NON-VEG)
  {
    title: "Mutton Korma with Naan",
    description: "Rich mutton curry with almonds and cream",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Hard",
    prep_time: 30,
    cook_time: 90,
    calories: 820,
    protein: 48,
    carbs: 68,
    fats: 40,
    fiber: 4,
    access_level: "subscribed",
    tags: ["weight gain", "high protein", "rich"],
    ingredients: [
      "300 gm mutton",
      "100 gm curd",
      "50 gm almonds and cashews",
      "100 ml cream",
      "2 onions, fried",
      "3 tablespoon ghee",
      "2 naan breads",
      "Whole spices",
      "Salt and spices"
    ],
    instructions: [
      "Marinate mutton in curd and spices",
      "Make paste of nuts and fried onions",
      "Cook mutton in ghee with whole spices",
      "Add nut paste and cream",
      "Cook until mutton is tender",
      "Serve with naan"
    ],
    image_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"
  },
  {
    title: "Chicken Tikka Masala with Rice",
    description: "Grilled chicken in creamy tomato gravy",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 40,
    calories: 720,
    protein: 45,
    carbs: 72,
    fats: 26,
    fiber: 5,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "popular"],
    ingredients: [
      "300 gm chicken breast, cubed",
      "100 gm curd",
      "150 gm basmati rice",
      "100 ml cream",
      "3 tablespoon butter",
      "3 tomatoes, pureed",
      "Tikka masala spices",
      "Kasuri methi",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in curd and tikka masala",
      "Grill chicken until charred",
      "Prepare creamy tomato gravy",
      "Add grilled chicken, simmer",
      "Cook rice separately",
      "Serve together"
    ],
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80"
  },

  // WEIGHT LOSS - DINNER (VEG)
  {
    title: "Vegetable Clear Soup",
    description: "Light and nutritious vegetable soup",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 20,
    calories: 180,
    protein: 6,
    carbs: 28,
    fats: 4,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "low calorie", "light dinner"],
    ingredients: [
      "1 carrot, chopped",
      "1 capsicum, chopped",
      "50 gm cabbage, chopped",
      "50 gm beans, chopped",
      "2 cloves garlic",
      "1 teaspoon olive oil",
      "Black pepper",
      "Salt to taste",
      "Coriander leaves"
    ],
    instructions: [
      "Heat oil, sauté garlic",
      "Add all vegetables",
      "Add water and bring to boil",
      "Simmer until vegetables are tender",
      "Season with pepper and salt",
      "Garnish with coriander"
    ],
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80"
  },
  {
    title: "Grilled Paneer with Salad",
    description: "Tandoori paneer with fresh vegetable salad",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 20,
    cook_time: 15,
    calories: 320,
    protein: 22,
    carbs: 24,
    fats: 14,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "high protein", "low carb"],
    ingredients: [
      "150 gm paneer, cubed",
      "50 gm hung curd",
      "1 cucumber, sliced",
      "1 tomato, chopped",
      "1 carrot, julienned",
      "Mixed salad leaves",
      "1 tablespoon olive oil",
      "Tandoori masala",
      "Lemon juice"
    ],
    instructions: [
      "Marinate paneer in curd and tandoori masala",
      "Grill paneer until charred",
      "Mix all vegetables for salad",
      "Dress salad with olive oil and lemon",
      "Serve grilled paneer with salad"
    ],
    image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
  },
  {
    title: "Dal with Roti",
    description: "Simple dal with whole wheat roti",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 25,
    calories: 340,
    protein: 15,
    carbs: 52,
    fats: 8,
    fiber: 10,
    access_level: "guest",
    tags: ["weight loss", "protein rich", "traditional"],
    ingredients: [
      "80 gm moong dal",
      "1 tomato, chopped",
      "1 onion, chopped",
      "1 teaspoon cumin seeds",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Turmeric, salt",
      "Coriander leaves"
    ],
    instructions: [
      "Pressure cook dal with turmeric",
      "Prepare tempering with cumin, onion, tomato",
      "Add cooked dal, simmer",
      "Make whole wheat rotis",
      "Serve dal with rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },

  // WEIGHT LOSS - DINNER (NON-VEG)
  {
    title: "Tandoori Chicken with Salad",
    description: "Grilled tandoori chicken with fresh salad",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 30,
    cook_time: 25,
    calories: 340,
    protein: 42,
    carbs: 18,
    fats: 10,
    fiber: 5,
    access_level: "guest",
    tags: ["weight loss", "high protein", "low carb"],
    ingredients: [
      "200 gm chicken breast or legs",
      "100 gm hung curd",
      "1 tablespoon tandoori masala",
      "1 tablespoon lemon juice",
      "Mixed salad vegetables",
      "1 tablespoon olive oil",
      "Black pepper and salt"
    ],
    instructions: [
      "Marinate chicken in curd, tandoori masala, lemon juice",
      "Refrigerate for 2 hours",
      "Grill or bake chicken until cooked",
      "Prepare fresh vegetable salad",
      "Serve tandoori chicken with salad"
    ],
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
  },
  {
    title: "Fish Tikka with Vegetables",
    description: "Grilled fish tikka with steamed vegetables",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 25,
    cook_time: 20,
    calories: 320,
    protein: 38,
    carbs: 16,
    fats: 12,
    fiber: 5,
    access_level: "logged_in",
    tags: ["weight loss", "high protein", "omega-3"],
    ingredients: [
      "200 gm fish (pomfret or rohu)",
      "50 gm hung curd",
      "1 tablespoon tikka masala",
      "100 gm broccoli",
      "1 carrot, sliced",
      "50 gm beans",
      "1 tablespoon olive oil",
      "Lemon juice"
    ],
    instructions: [
      "Marinate fish in curd and tikka masala",
      "Grill fish until cooked",
      "Steam vegetables until tender-crisp",
      "Serve grilled fish with steamed vegetables",
      "Drizzle with lemon juice"
    ],
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
  },

  // MAINTENANCE - DINNER (VEG & NON-VEG)
  {
    title: "Mixed Vegetable Curry with Roti",
    description: "Seasonal vegetables in mild gravy",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 25,
    calories: 400,
    protein: 12,
    carbs: 58,
    fats: 14,
    fiber: 8,
    access_level: "guest",
    tags: ["maintenance", "balanced", "traditional"],
    ingredients: [
      "100 gm mixed vegetables (beans, carrots, peas, cauliflower)",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices: turmeric, cumin, coriander powder",
      "Salt to taste"
    ],
    instructions: [
      "Sauté onions in oil",
      "Add tomatoes and spices",
      "Add all vegetables and water",
      "Cook until vegetables are tender",
      "Serve with whole wheat rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },
  {
    title: "Egg Curry with Rice",
    description: "Boiled eggs in flavorful curry",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 25,
    calories: 460,
    protein: 24,
    carbs: 58,
    fats: 14,
    fiber: 4,
    access_level: "guest",
    tags: ["maintenance", "protein rich", "economical"],
    ingredients: [
      "4 eggs, boiled",
      "120 gm basmati rice",
      "2 tomatoes, pureed",
      "1 onion, chopped",
      "1 tablespoon oil",
      "Spices: turmeric, red chilli, garam masala",
      "Salt to taste"
    ],
    instructions: [
      "Prepare onion-tomato gravy with spices",
      "Cut boiled eggs in half",
      "Add eggs to gravy, simmer",
      "Cook rice separately",
      "Serve egg curry with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1587411768378-51093d0a2c4b?w=800&q=80"
  },

  // SNACKS - WEIGHT GAIN
  {
    title: "Peanut Butter Banana Smoothie",
    description: "High-calorie smoothie for muscle gain",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 0,
    calories: 420,
    protein: 16,
    carbs: 52,
    fats: 18,
    fiber: 6,
    access_level: "guest",
    tags: ["weight gain", "high protein", "quick"],
    ingredients: [
      "2 bananas",
      "2 tablespoon peanut butter",
      "250 ml full-fat milk",
      "1 tablespoon honey",
      "4-5 almonds",
      "1 teaspoon chia seeds"
    ],
    instructions: [
      "Add all ingredients to blender",
      "Blend until smooth and creamy",
      "Pour into glass",
      "Serve immediately"
    ],
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
  },
  {
    title: "Paneer Sandwich",
    description: "Grilled paneer sandwich with vegetables",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 10,
    calories: 380,
    protein: 18,
    carbs: 42,
    fats: 16,
    fiber: 4,
    access_level: "guest",
    tags: ["weight gain", "high protein", "quick"],
    ingredients: [
      "4 bread slices",
      "100 gm paneer, grated",
      "1 onion, chopped",
      "1 capsicum, chopped",
      "2 tablespoon butter",
      "1 cheese slice",
      "Chaat masala",
      "Salt to taste"
    ],
    instructions: [
      "Mix paneer, vegetables, and spices",
      "Apply butter on bread slices",
      "Add paneer mixture and cheese",
      "Grill sandwich until golden",
      "Serve hot with ketchup"
    ],
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    title: "Dry Fruit Ladoo",
    description: "Energy-dense sweet balls with nuts and dates",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 0,
    calories: 320,
    protein: 8,
    carbs: 38,
    fats: 16,
    fiber: 5,
    access_level: "logged_in",
    tags: ["weight gain", "energy dense", "traditional"],
    ingredients: [
      "100 gm dates, deseeded",
      "50 gm almonds",
      "50 gm cashews",
      "30 gm walnuts",
      "20 gm sesame seeds",
      "1 tablespoon ghee",
      "1/2 teaspoon cardamom powder"
    ],
    instructions: [
      "Blend dates, nuts until fine",
      "Add ghee and cardamom",
      "Roll into small balls",
      "Coat with sesame seeds",
      "Store in airtight container"
    ],
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
  },

  // SNACKS - WEIGHT LOSS
  {
    title: "Roasted Chana",
    description: "Protein-rich roasted chickpeas snack",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 0,
    calories: 140,
    protein: 8,
    carbs: 24,
    fats: 2,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "high protein", "crunchy"],
    ingredients: [
      "50 gm roasted chana",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli, chopped",
      "Lemon juice",
      "Chaat masala",
      "Coriander leaves"
    ],
    instructions: [
      "Mix all ingredients in a bowl",
      "Add lemon juice and chaat masala",
      "Toss well",
      "Serve immediately"
    ],
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
  },
  {
    title: "Sprouts Salad",
    description: "Mixed sprouts with vegetables",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 0,
    calories: 120,
    protein: 10,
    carbs: 18,
    fats: 2,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "high protein", "raw"],
    ingredients: [
      "100 gm mixed sprouts",
      "1 cucumber, chopped",
      "1 tomato, chopped",
      "1 onion, chopped",
      "Lemon juice",
      "Black salt",
      "Coriander leaves"
    ],
    instructions: [
      "Mix sprouts and chopped vegetables",
      "Add lemon juice and black salt",
      "Toss well",
      "Garnish with coriander",
      "Serve fresh"
    ],
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
  },
  {
    title: "Cucumber Raita",
    description: "Low-calorie yogurt with cucumber",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 0,
    calories: 80,
    protein: 6,
    carbs: 10,
    fats: 2,
    fiber: 2,
    access_level: "guest",
    tags: ["weight loss", "low calorie", "cooling"],
    ingredients: [
      "150 gm low-fat curd",
      "1 cucumber, grated",
      "1 green chilli, chopped",
      "Roasted cumin powder",
      "Black salt",
      "Coriander leaves"
    ],
    instructions: [
      "Whisk curd until smooth",
      "Add grated cucumber",
      "Add chilli, cumin, salt",
      "Mix well",
      "Garnish with coriander"
    ],
    image_url: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=80"
  },

  // SNACKS - MAINTENANCE
  {
    title: "Vegetable Cutlet",
    description: "Pan-fried vegetable patties",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 15,
    calories: 220,
    protein: 8,
    carbs: 32,
    fats: 8,
    fiber: 6,
    access_level: "guest",
    tags: ["maintenance", "balanced", "traditional"],
    ingredients: [
      "2 potatoes, boiled",
      "50 gm mixed vegetables",
      "2 tablespoon bread crumbs",
      "1 green chilli",
      "1 tablespoon oil",
      "Coriander leaves",
      "Spices and salt"
    ],
    instructions: [
      "Mash potatoes with vegetables and spices",
      "Shape into patties",
      "Coat with bread crumbs",
      "Pan-fry until golden on both sides",
      "Serve with chutney"
    ],
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
  },
  {
    title: "Masala Dosa",
    description: "Crispy rice crepe with potato filling",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 20,
    calories: 320,
    protein: 10,
    carbs: 54,
    fats: 8,
    fiber: 5,
    access_level: "guest",
    tags: ["maintenance", "traditional", "South Indian"],
    ingredients: [
      "100 gm dosa batter",
      "2 potatoes, boiled",
      "1 onion, chopped",
      "1 teaspoon mustard seeds",
      "Curry leaves",
      "1 tablespoon oil",
      "Turmeric, salt"
    ],
    instructions: [
      "Prepare potato masala with spices",
      "Spread dosa batter on hot tawa",
      "Add potato filling",
      "Fold dosa",
      "Serve with sambhar and chutney"
    ],
    image_url: "https://images.unsplash.com/photo-1589301773859-f996f5d51de0?w=800&q=80"
  },
  {
    title: "Chicken Tikka Wrap",
    description: "Grilled chicken in roti wrap",
    meal_type: "snack",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 25,
    cook_time: 20,
    calories: 380,
    protein: 32,
    carbs: 42,
    fats: 10,
    fiber: 4,
    access_level: "logged_in",
    tags: ["maintenance", "high protein", "portable"],
    ingredients: [
      "150 gm chicken breast",
      "1 roti (40 gm)",
      "50 gm hung curd",
      "1 onion, sliced",
      "1 capsicum, sliced",
      "1 tablespoon tikka masala",
      "Mint chutney",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in curd and tikka masala",
      "Grill chicken until cooked",
      "Slice grilled chicken",
      "Layer on roti with vegetables and chutney",
      "Roll into wrap, serve"
    ],
    image_url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80"
  },

  // Additional recipes to reach 100+
  {
    title: "Masala Oats",
    description: "Savory oats with Indian spices",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 10,
    calories: 260,
    protein: 9,
    carbs: 42,
    fats: 7,
    fiber: 7,
    access_level: "guest",
    tags: ["weight loss", "quick", "fiber rich"],
    ingredients: [
      "60 gm rolled oats",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli",
      "1 teaspoon mustard seeds",
      "Curry leaves",
      "1 tablespoon oil",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add mustard and curry leaves",
      "Sauté onions and chilli",
      "Add tomatoes and oats",
      "Add water, cook until soft",
      "Serve hot"
    ],
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
  },
  {
    title: "Besan Chilla",
    description: "Protein-rich gram flour pancakes",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 280,
    protein: 14,
    carbs: 36,
    fats: 9,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "high protein", "traditional"],
    ingredients: [
      "80 gm besan (gram flour)",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli",
      "Coriander leaves",
      "1 tablespoon oil",
      "Turmeric, salt"
    ],
    instructions: [
      "Mix besan with water to make batter",
      "Add vegetables and spices",
      "Pour on hot tawa like pancake",
      "Cook both sides with oil",
      "Serve with chutney"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },
  {
    title: "Rava Upma",
    description: "Semolina porridge with vegetables",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 300,
    protein: 8,
    carbs: 48,
    fats: 9,
    fiber: 4,
    access_level: "guest",
    tags: ["maintenance", "traditional", "South Indian"],
    ingredients: [
      "80 gm rava (semolina)",
      "1 onion, chopped",
      "1 carrot, chopped",
      "50 gm peas",
      "1 teaspoon mustard seeds",
      "Curry leaves",
      "1 tablespoon oil",
      "Salt to taste"
    ],
    instructions: [
      "Roast rava until aromatic",
      "Prepare tempering with mustard",
      "Sauté vegetables",
      "Add roasted rava and water",
      "Cook until water absorbs"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },
  {
    title: "Idli Sambhar",
    description: "Steamed rice cakes with lentil curry",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 40,
    cook_time: 20,
    calories: 280,
    protein: 12,
    carbs: 52,
    fats: 4,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "traditional", "fermented"],
    ingredients: [
      "100 gm idli batter",
      "50 gm toor dal",
      "100 gm mixed vegetables",
      "1 tablespoon sambhar masala",
      "Tamarind pulp",
      "Mustard seeds",
      "Curry leaves"
    ],
    instructions: [
      "Steam idlis in idli maker",
      "Cook dal with vegetables",
      "Prepare sambhar with tamarind and masala",
      "Temper with mustard and curry leaves",
      "Serve idlis with hot sambhar"
    ],
    image_url: "https://images.unsplash.com/photo-1589301773859-f996f5d51de0?w=800&q=80"
  },
  {
    title: "Methi Thepla",
    description: "Fenugreek flatbread",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 20,
    calories: 320,
    protein: 10,
    carbs: 52,
    fats: 9,
    fiber: 7,
    access_level: "guest",
    tags: ["maintenance", "traditional", "Gujarati"],
    ingredients: [
      "120 gm whole wheat flour",
      "50 gm methi leaves, chopped",
      "1 tablespoon curd",
      "1 teaspoon oil",
      "Turmeric, chilli powder",
      "Salt to taste"
    ],
    instructions: [
      "Mix all ingredients to make dough",
      "Roll out thin theplas",
      "Cook on tawa with oil",
      "Serve with pickle or curd"
    ],
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80"
  },
  {
    title: "Sabudana Khichdi",
    description: "Sago pearls with peanuts and potatoes",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 30,
    cook_time: 15,
    calories: 380,
    protein: 8,
    carbs: 65,
    fats: 12,
    fiber: 4,
    access_level: "guest",
    tags: ["maintenance", "fasting food", "traditional"],
    ingredients: [
      "100 gm sabudana, soaked",
      "50 gm peanuts, roasted",
      "1 potato, small, diced",
      "1 green chilli",
      "1 teaspoon cumin seeds",
      "1 tablespoon oil",
      "Lemon juice",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add cumin and chilli",
      "Add potatoes, cook until done",
      "Add soaked sabudana and peanuts",
      "Mix well, cook until translucent",
      "Add lemon juice, serve"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },
  {
    title: "Stuffed Paratha (Mixed Vegetables)",
    description: "Whole wheat paratha with vegetable filling",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 25,
    calories: 420,
    protein: 12,
    carbs: 62,
    fats: 14,
    fiber: 7,
    access_level: "guest",
    tags: ["maintenance", "filling", "traditional"],
    ingredients: [
      "120 gm whole wheat flour",
      "50 gm mixed vegetables, grated",
      "1 tablespoon coriander leaves",
      "1 green chilli",
      "1 tablespoon ghee",
      "Spices and salt"
    ],
    instructions: [
      "Mix vegetables with spices",
      "Make dough with wheat flour",
      "Stuff parathas with vegetable mixture",
      "Cook on tawa with ghee",
      "Serve with curd or pickle"
    ],
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80"
  },
  {
    title: "Wheat Dosa",
    description: "Instant whole wheat crepe",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 260,
    protein: 9,
    carbs: 46,
    fats: 5,
    fiber: 6,
    access_level: "guest",
    tags: ["weight loss", "instant", "fiber rich"],
    ingredients: [
      "100 gm whole wheat flour",
      "1 onion, chopped",
      "1 green chilli",
      "Coriander leaves",
      "1 tablespoon oil",
      "Cumin seeds",
      "Salt to taste"
    ],
    instructions: [
      "Mix flour with water to make thin batter",
      "Add vegetables and spices",
      "Spread on hot tawa like dosa",
      "Cook both sides with oil",
      "Serve with chutney"
    ],
    image_url: "https://images.unsplash.com/photo-1589301773859-f996f5d51de0?w=800&q=80"
  },
  {
    title: "Pongal (Savory)",
    description: "Rice and lentil porridge with spices",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 25,
    calories: 340,
    protein: 12,
    carbs: 56,
    fats: 8,
    fiber: 5,
    access_level: "guest",
    tags: ["maintenance", "traditional", "South Indian"],
    ingredients: [
      "80 gm rice",
      "40 gm moong dal",
      "1 teaspoon cumin seeds",
      "Black pepper, whole",
      "Curry leaves",
      "1 tablespoon ghee",
      "Cashews",
      "Salt to taste"
    ],
    instructions: [
      "Cook rice and dal together until soft",
      "Prepare tempering with cumin, pepper, curry leaves",
      "Mix tempering with rice-dal mixture",
      "Garnish with fried cashews",
      "Serve hot"
    ],
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"
  },
  {
    title: "Boiled Egg Sandwich",
    description: "Protein-rich egg sandwich",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 10,
    calories: 340,
    protein: 18,
    carbs: 38,
    fats: 12,
    fiber: 3,
    access_level: "guest",
    tags: ["weight loss", "high protein", "quick"],
    ingredients: [
      "2 eggs, boiled",
      "4 bread slices",
      "1 onion, sliced",
      "1 cucumber, sliced",
      "1 tomato, sliced",
      "1 tablespoon butter",
      "Black pepper, salt",
      "Green chutney"
    ],
    instructions: [
      "Mash boiled eggs with salt and pepper",
      "Apply butter and chutney on bread",
      "Layer egg mixture and vegetables",
      "Cover with another bread slice",
      "Toast if desired, serve"
    ],
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    title: "Chicken Omelette",
    description: "Protein-packed omelette with shredded chicken",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 420,
    protein: 36,
    carbs: 8,
    fats: 28,
    fiber: 2,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "muscle building"],
    ingredients: [
      "3 eggs",
      "100 gm cooked chicken, shredded",
      "1 onion, chopped",
      "1 green chilli",
      "1 tablespoon butter",
      "Coriander leaves",
      "Salt and pepper"
    ],
    instructions: [
      "Beat eggs with salt and pepper",
      "Heat butter, sauté onions and chilli",
      "Add shredded chicken",
      "Pour beaten eggs",
      "Cook until set, fold and serve"
    ],
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
  },
  {
    title: "Mutton Keema Paratha",
    description: "Stuffed paratha with spiced minced mutton",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Hard",
    prep_time: 25,
    cook_time: 35,
    calories: 580,
    protein: 32,
    carbs: 58,
    fats: 24,
    fiber: 5,
    access_level: "subscribed",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "120 gm whole wheat flour",
      "150 gm mutton keema",
      "1 onion, chopped",
      "1 tablespoon ginger-garlic paste",
      "2 tablespoon ghee",
      "Spices: garam masala, red chilli",
      "Coriander leaves",
      "Salt to taste"
    ],
    instructions: [
      "Cook keema with spices until done",
      "Make dough with wheat flour",
      "Stuff parathas with keema",
      "Cook on tawa with ghee",
      "Serve with curd"
    ],
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80"
  },
  {
    title: "Masoor Dal with Rice",
    description: "Red lentils with steamed rice",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 25,
    calories: 360,
    protein: 16,
    carbs: 64,
    fats: 5,
    fiber: 10,
    access_level: "guest",
    tags: ["weight loss", "high fiber", "protein rich"],
    ingredients: [
      "100 gm masoor dal",
      "120 gm rice",
      "1 tomato, chopped",
      "1 teaspoon cumin seeds",
      "1 tablespoon oil",
      "Turmeric, salt",
      "Coriander leaves"
    ],
    instructions: [
      "Pressure cook dal with turmeric",
      "Prepare tempering with cumin and tomato",
      "Add cooked dal, simmer",
      "Cook rice separately",
      "Serve dal with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },
  {
    title: "Kadhi Pakora",
    description: "Yogurt curry with gram flour fritters",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 35,
    calories: 420,
    protein: 14,
    carbs: 58,
    fats: 16,
    fiber: 5,
    access_level: "guest",
    tags: ["maintenance", "traditional", "comfort food"],
    ingredients: [
      "150 gm curd",
      "40 gm besan",
      "120 gm rice",
      "1 onion, sliced",
      "Oil for frying",
      "Turmeric, red chilli",
      "Tempering: mustard, cumin, fenugreek seeds"
    ],
    instructions: [
      "Make pakoras by frying besan-onion mixture",
      "Prepare kadhi with curd and besan",
      "Add pakoras to kadhi",
      "Temper with spices",
      "Serve with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },
  {
    title: "Sambhar Rice",
    description: "Mixed rice with lentil curry",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 35,
    calories: 380,
    protein: 14,
    carbs: 68,
    fats: 7,
    fiber: 9,
    access_level: "guest",
    tags: ["maintenance", "traditional", "South Indian"],
    ingredients: [
      "120 gm rice",
      "50 gm toor dal",
      "100 gm mixed vegetables",
      "1 tablespoon sambhar masala",
      "Tamarind pulp",
      "1 tablespoon oil",
      "Tempering spices"
    ],
    instructions: [
      "Cook rice and dal separately",
      "Prepare sambhar with vegetables",
      "Mix rice with sambhar",
      "Add tempering",
      "Serve hot"
    ],
    image_url: "https://images.unsplash.com/photo-1589301773859-f996f5d51de0?w=800&q=80"
  },
  {
    title: "Baingan Bharta with Roti",
    description: "Roasted eggplant curry with whole wheat roti",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 30,
    calories: 340,
    protein: 10,
    carbs: 54,
    fats: 11,
    fiber: 9,
    access_level: "guest",
    tags: ["weight loss", "fiber rich", "traditional"],
    ingredients: [
      "1 large baingan (eggplant)",
      "2 tomatoes, chopped",
      "1 onion, chopped",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices: turmeric, red chilli, coriander powder",
      "Coriander leaves"
    ],
    instructions: [
      "Roast baingan until skin chars",
      "Peel and mash roasted baingan",
      "Sauté onions and tomatoes",
      "Add mashed baingan and spices",
      "Cook for 10 minutes, serve with rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },
  {
    title: "Bhindi Masala with Roti",
    description: "Stir-fried okra with spices",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 20,
    calories: 320,
    protein: 10,
    carbs: 52,
    fats: 10,
    fiber: 8,
    access_level: "guest",
    tags: ["weight loss", "fiber rich", "traditional"],
    ingredients: [
      "200 gm bhindi (okra), cut",
      "1 onion, sliced",
      "1 tomato, chopped",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices: turmeric, coriander powder, amchur",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, fry bhindi until crisp",
      "Add onions and tomatoes",
      "Add spices, cook well",
      "Serve with whole wheat rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },
  {
    title: "Pav Bhaji",
    description: "Mixed vegetable curry with buttered buns",
    meal_type: "lunch",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 30,
    calories: 520,
    protein: 14,
    carbs: 78,
    fats: 18,
    fiber: 8,
    access_level: "logged_in",
    tags: ["maintenance", "street food", "Mumbai special"],
    ingredients: [
      "200 gm mixed vegetables (potato, cauliflower, peas, capsicum)",
      "4 pav buns",
      "3 tablespoon butter",
      "2 tomatoes, pureed",
      "1 onion, chopped",
      "2 tablespoon pav bhaji masala",
      "Lemon wedges",
      "Coriander leaves"
    ],
    instructions: [
      "Boil and mash all vegetables",
      "Prepare tomato-onion base with pav bhaji masala",
      "Add mashed vegetables, cook well",
      "Toast pav with butter",
      "Serve bhaji with pav, onions, and lemon"
    ],
    image_url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80"
  },
  {
    title: "Fish Fry with Rice",
    description: "Crispy fried fish with steamed rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 25,
    calories: 480,
    protein: 38,
    carbs: 52,
    fats: 14,
    fiber: 3,
    access_level: "logged_in",
    tags: ["maintenance", "high protein", "coastal"],
    ingredients: [
      "200 gm fish (pomfret or kingfish)",
      "120 gm rice",
      "2 tablespoon ginger-garlic paste",
      "1 tablespoon red chilli powder",
      "1 tablespoon lemon juice",
      "Oil for frying",
      "Salt to taste"
    ],
    instructions: [
      "Marinate fish with spices and lemon juice",
      "Shallow fry fish until crispy",
      "Cook rice separately",
      "Serve fried fish with rice and salad"
    ],
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
  },
  {
    title: "Chicken Fried Rice",
    description: "Indo-Chinese style fried rice with chicken",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 25,
    calories: 520,
    protein: 32,
    carbs: 68,
    fats: 14,
    fiber: 4,
    access_level: "logged_in",
    tags: ["maintenance", "fusion", "Indo-Chinese"],
    ingredients: [
      "150 gm chicken, diced",
      "150 gm rice, cooked",
      "1 egg",
      "Mixed vegetables (carrot, beans, cabbage)",
      "2 tablespoon oil",
      "Soy sauce, vinegar",
      "Spring onions",
      "Salt and pepper"
    ],
    instructions: [
      "Stir-fry chicken until cooked",
      "Add vegetables, stir-fry",
      "Add cooked rice and scrambled egg",
      "Season with soy sauce and vinegar",
      "Garnish with spring onions"
    ],
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80"
  },
  {
    title: "Mutton Curry with Rice",
    description: "Spiced mutton curry with basmati rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 25,
    cook_time: 60,
    calories: 620,
    protein: 42,
    carbs: 58,
    fats: 24,
    fiber: 4,
    access_level: "logged_in",
    tags: ["weight gain", "high protein", "traditional"],
    ingredients: [
      "250 gm mutton, with bone",
      "120 gm basmati rice",
      "2 onions, chopped",
      "2 tomatoes, pureed",
      "1 tablespoon ginger-garlic paste",
      "2 tablespoon oil",
      "Whole spices, curry masala",
      "Salt to taste"
    ],
    instructions: [
      "Brown mutton with onions and spices",
      "Add tomatoes and water",
      "Pressure cook until tender",
      "Cook rice separately",
      "Serve curry with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"
  },
  {
    title: "Prawn Curry with Rice",
    description: "Coconut-based prawn curry with rice",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 30,
    calories: 440,
    protein: 36,
    carbs: 52,
    fats: 12,
    fiber: 3,
    access_level: "subscribed",
    tags: ["maintenance", "high protein", "coastal"],
    ingredients: [
      "200 gm prawns, cleaned",
      "120 gm rice",
      "100 ml coconut milk",
      "2 tomatoes, chopped",
      "1 onion, chopped",
      "1 tablespoon coconut oil",
      "Curry leaves",
      "Spices and salt"
    ],
    instructions: [
      "Sauté onions and tomatoes",
      "Add prawns and spices",
      "Add coconut milk, simmer",
      "Cook rice separately",
      "Serve prawn curry with rice"
    ],
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80"
  },
  {
    title: "Vegetable Pulao",
    description: "Aromatic rice with mixed vegetables",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 30,
    calories: 380,
    protein: 10,
    carbs: 68,
    fats: 9,
    fiber: 6,
    access_level: "guest",
    tags: ["maintenance", "one pot", "aromatic"],
    ingredients: [
      "150 gm basmati rice",
      "100 gm mixed vegetables",
      "1 onion, sliced",
      "Whole spices (bay leaf, cinnamon, cardamom)",
      "2 tablespoon ghee",
      "Mint and coriander leaves",
      "Salt to taste"
    ],
    instructions: [
      "Sauté whole spices and onions in ghee",
      "Add vegetables and rice",
      "Add water, cook until rice is done",
      "Garnish with herbs",
      "Serve with raita"
    ],
    image_url: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&q=80"
  },
  {
    title: "Jeera Aloo with Roti",
    description: "Cumin-flavored potatoes with whole wheat roti",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 20,
    calories: 360,
    protein: 9,
    carbs: 62,
    fats: 10,
    fiber: 6,
    access_level: "guest",
    tags: ["maintenance", "simple", "traditional"],
    ingredients: [
      "2 large potatoes, cubed",
      "1 teaspoon cumin seeds",
      "1 green chilli",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Turmeric, coriander powder",
      "Coriander leaves",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add cumin seeds",
      "Add potatoes and spices",
      "Cook until potatoes are tender",
      "Garnish with coriander",
      "Serve with rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },
  {
    title: "Paneer Bhurji with Roti",
    description: "Scrambled paneer with spices",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 420,
    protein: 24,
    carbs: 42,
    fats: 18,
    fiber: 5,
    access_level: "guest",
    tags: ["weight gain", "high protein", "quick"],
    ingredients: [
      "150 gm paneer, crumbled",
      "1 onion, chopped",
      "1 tomato, chopped",
      "1 green chilli",
      "1 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices and salt"
    ],
    instructions: [
      "Sauté onions and chilli",
      "Add tomatoes and spices",
      "Add crumbled paneer",
      "Cook for 5 minutes",
      "Serve with rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
  },
  {
    title: "Methi Chicken with Roti",
    description: "Fenugreek chicken curry with whole wheat roti",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 35,
    calories: 480,
    protein: 38,
    carbs: 42,
    fats: 18,
    fiber: 6,
    access_level: "logged_in",
    tags: ["maintenance", "high protein", "traditional"],
    ingredients: [
      "250 gm chicken",
      "50 gm methi leaves",
      "2 onions, chopped",
      "2 tomatoes, pureed",
      "1 tablespoon ginger-garlic paste",
      "2 tablespoon oil",
      "2 rotis (80 gm)",
      "Spices and salt"
    ],
    instructions: [
      "Sauté onions and ginger-garlic",
      "Add chicken and spices",
      "Add tomatoes, cook well",
      "Add methi leaves, simmer",
      "Serve with rotis"
    ],
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80"
  },
  {
    title: "Dal Tadka with Jeera Rice",
    description: "Yellow lentils with cumin rice",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 30,
    calories: 380,
    protein: 16,
    carbs: 64,
    fats: 8,
    fiber: 10,
    access_level: "guest",
    tags: ["maintenance", "protein rich", "comfort food"],
    ingredients: [
      "100 gm toor dal",
      "120 gm basmati rice",
      "1 tomato, chopped",
      "1 teaspoon cumin seeds",
      "2 tablespoon ghee",
      "Red chilli, turmeric",
      "Curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Pressure cook dal with turmeric",
      "Prepare tadka with ghee, cumin, curry leaves",
      "Add to dal",
      "Cook rice with cumin seeds",
      "Serve together"
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },

  // ADDITIONAL 100 DETAILED RECIPES - WEIGHT GAIN
  {
    title: "Masala Besan Cheela with Paneer Filling",
    description: "High-protein savory pancake stuffed with spiced cottage cheese",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 20,
    calories: 480,
    protein: 28,
    carbs: 45,
    fats: 22,
    fiber: 6,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "filling", "Indian breakfast"],
    ingredients: [
      "150 gm besan (chickpea flour)",
      "200 gm paneer, crumbled",
      "2 medium onions, finely chopped",
      "2 green chillies, finely chopped",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chilli powder",
      "1 teaspoon cumin powder",
      "1/2 teaspoon garam masala",
      "Fresh coriander leaves, 2 tablespoon chopped",
      "3 tablespoon oil for cooking",
      "Salt to taste",
      "300 ml water"
    ],
    instructions: [
      "STEP 1 - PREPARE BATTER: In a large mixing bowl, add 150 gm besan (chickpea flour). Gradually add 300 ml water while whisking continuously with a whisk or fork to avoid lumps. The batter should have a flowing consistency like thin pancake batter - when you lift the whisk, it should fall in a steady stream, not in thick drops. Add 1/4 teaspoon turmeric, 1/2 teaspoon red chilli powder, half of the chopped onions (1 onion), 1 green chilli, 1 tablespoon coriander leaves, and salt to taste. Mix well and let it rest for 10 minutes. This resting time allows the besan to absorb water properly and reduces the raw flour smell.",
      
      "STEP 2 - PREPARE FILLING: While batter rests, take a medium bowl and add 200 gm crumbled paneer. Add the remaining chopped onion, 1 green chilli, 1/2 teaspoon red chilli powder, 1 teaspoon cumin powder, 1/2 teaspoon garam masala, remaining coriander leaves, and salt to taste. Mix everything thoroughly with your hands until all ingredients are evenly distributed. The paneer should look uniformly coated with spices. Set aside.",
      
      "STEP 3 - HEAT PAN: Place a non-stick tawa or pan on medium heat (setting 5-6 out of 10 on your gas stove). Let it heat for 2-3 minutes. To test if it's ready, sprinkle a few drops of water - they should sizzle and evaporate within 3-4 seconds. If they sit there, the pan isn't hot enough. Add 1/2 teaspoon oil and spread it all over the pan using a brush or half onion.",
      
      "STEP 4 - POUR BATTER: Give the batter a quick stir. Pour one ladle (about 80-100 ml) of batter into the center of the hot pan. Immediately start spreading it in circular motions from center outward using the back of the ladle, making concentric circles. The cheela should be about 6-7 inches in diameter and should look like a thin, round pancake. If you see holes forming, the batter is too thick - add 1-2 tablespoon water and mix. Drizzle 1/2 teaspoon oil around the edges of the cheela.",
      
      "STEP 5 - FIRST SIDE COOKING: Let the cheela cook undisturbed for 2-3 minutes on medium heat. You'll notice the edges starting to lift up slightly from the pan, and the top surface will change from wet and glossy to matte and slightly dry. Small bubbles might form on the surface. The bottom should turn golden brown with some darker spots. Use a flat spatula to gently lift one edge and check - if it releases easily and looks golden, it's ready to flip.",
      
      "STEP 6 - ADD FILLING: Once the first side is cooked, add 2-3 tablespoon of prepared paneer filling in a line across the center of the cheela (like you're making a wrap). Spread it evenly but leave 1 inch space from the edges. Don't overfill or it will be difficult to fold.",
      
      "STEP 7 - FOLD AND COOK: Using your spatula, fold the cheela from both sides over the filling, creating a rectangular packet. Press gently with the spatula. Drizzle 1/4 teaspoon oil on top. Cook for 1 minute, then carefully flip the entire folded cheela using two spatulas if needed. Cook the other side for another 1-2 minutes until golden brown spots appear and you can see the edges getting crispy.",
      
      "STEP 8 - SERVE: Transfer to a plate. The cheela should be golden brown on both sides with crispy edges and soft center. The filling should be warm but not oozing out. Repeat the process with remaining batter and filling. Serve hot with green chutney or tomato ketchup. Best consumed immediately for maximum crispiness."
    ],
    image_url: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80"
  },

  {
    title: "Chicken Keema Pulao",
    description: "Flavorful minced chicken rice with whole spices",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 35,
    calories: 620,
    protein: 38,
    carbs: 68,
    fats: 20,
    fiber: 4,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "one pot meal", "chicken"],
    ingredients: [
      "400 gm chicken keema (minced chicken)",
      "300 gm basmati rice",
      "2 medium onions, thinly sliced",
      "2 medium tomatoes, finely chopped",
      "1 tablespoon ginger-garlic paste",
      "2 green chillies, slit lengthwise",
      "4-5 whole cloves",
      "2 bay leaves",
      "1 inch cinnamon stick",
      "4-5 black peppercorns",
      "2 green cardamom pods",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chilli powder",
      "1 teaspoon garam masala",
      "3 tablespoon oil or ghee",
      "Fresh coriander and mint leaves, handful each",
      "Salt to taste",
      "600 ml water"
    ],
    instructions: [
      "STEP 1 - WASH RICE: Measure 300 gm basmati rice in a bowl. Fill with water and gently rub the rice between your palms. The water will turn cloudy with starch. Drain this water. Repeat this washing process 3-4 times until the water runs almost clear. This removes excess starch and prevents the rice from becoming sticky. After final wash, soak the rice in fresh water for 20 minutes. This soaking helps the rice cook evenly and become longer when cooked.",
      
      "STEP 2 - PREPARE CHICKEN KEEMA: Take 400 gm chicken keema in a colander and rinse under cold running water for 30 seconds. Let excess water drain completely - this removes any small bone pieces and blood. Pat dry with paper towels. The keema should look pink and feel slightly moist but not dripping wet. Keep aside.",
      
      "STEP 3 - HEAT OIL AND TEMPER SPICES: Place a heavy-bottomed pressure cooker or deep pot on medium-high heat. Add 3 tablespoon oil or ghee. Let it heat for 1 minute until you see slight ripples on the surface. Add all whole spices at once: 1 teaspoon cumin seeds, 4-5 cloves, 2 bay leaves, 1 inch cinnamon stick, 4-5 black peppercorns, and 2 cardamom pods. Within 10-15 seconds, you should hear a sizzling sound and smell the aromatic spices. The cumin seeds will turn slightly darker and the bay leaves might curl up a bit. This is called tempering or tadka.",
      
      "STEP 4 - FRY ONIONS: Immediately add 2 thinly sliced onions to the hot oil. Increase heat to high. Stir continuously with a wooden spoon or spatula for 6-8 minutes. The onions will first become translucent (you can see through them), then turn golden, and finally light brown at the edges. This caramelization process is crucial for the pulao's color and flavor. Don't rush this step - properly fried onions add sweetness and rich color. If onions are burning too quickly, reduce heat to medium-high. The onions should look evenly golden brown and smell sweet.",
      
      "STEP 5 - ADD AROMATICS: Once onions are golden, add 1 tablespoon ginger-garlic paste and 2 slit green chillies. Stir continuously for 1 minute. You'll smell the raw pungent garlic aroma transforming into a pleasant cooked smell. The paste should not stick to the bottom - if it does, add 1 tablespoon water. Now add 2 finely chopped tomatoes. Cook for 3-4 minutes, stirring occasionally, until tomatoes become soft and mushy. They will break down and the oil will start to separate and come to the surface - you'll see small oil pools around the edges. This indicates the masala base is ready.",
      
      "STEP 6 - COOK KEEMA: Add the cleaned chicken keema to the pot. Spread it out with your spatula and let it cook undisturbed for 2 minutes on high heat. You'll hear it sizzle as the moisture evaporates. Then break up any large clumps with your spatula and stir well. Add 1/2 teaspoon turmeric powder, 1 teaspoon red chilli powder, and salt to taste. Mix thoroughly so every piece of keema is coated with spices - the keema should turn yellowish from the turmeric. Cook on medium-high heat for 8-10 minutes, stirring every 2 minutes. The keema is ready when it changes from pink to light brown color, all moisture has evaporated, and it starts to look slightly dry and separated. You should not see any pink or raw chicken pieces.",
      
      "STEP 7 - ADD RICE: Drain the soaked rice completely in a colander - shake it gently to remove all water. Add the drained rice to the pot with cooked keema. Use a gentle folding motion to mix rice with the masala - don't stir vigorously or the rice grains will break. Mix just until the rice is evenly coated with the keema masala and looks slightly yellow. This should take about 1 minute. Add finely chopped coriander and mint leaves (1 handful each) and mix gently.",
      
      "STEP 8 - ADD WATER AND COOK: Add 600 ml water (the ratio is 1:2, rice to water). Increase heat to high and bring to a rolling boil - you'll see large bubbles breaking on the surface. This should take 3-4 minutes. Taste the water and adjust salt if needed - it should taste slightly salty. Add 1 teaspoon garam masala and give one gentle stir. If using pressure cooker: Close the lid, place the weight/whistle on top. Once you hear the first whistle (this will take 4-5 minutes), reduce heat to low and cook for exactly 5 minutes. Then turn off the heat. Let the pressure release naturally for 10 minutes - don't open immediately. If using regular pot: After water boils, reduce heat to low, cover with a tight-fitting lid, and cook for 15-18 minutes without opening the lid.",
      
      "STEP 9 - REST AND FLUFF: After cooking, let the pulao rest covered for 5 minutes. This allows the steam to settle and rice to firm up. Open the lid - you should see fluffy, separate rice grains with no water visible at the bottom. Using a fork (not spoon), gently fluff the rice from bottom to top, lifting and separating the grains. The rice should be long, separate, and each grain should be distinct - not mushy or sticky. Serve hot garnished with fried onions and fresh coriander if desired."
    ],
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
  },

  {
    title: "Moong Dal Halwa",
    description: "Rich and indulgent lentil-based dessert cooked in ghee",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Hard",
    prep_time: 240,
    cook_time: 45,
    calories: 580,
    protein: 12,
    carbs: 72,
    fats: 28,
    fiber: 5,
    access_level: "logged_in",
    goal_category: "weight_gain",
    tags: ["weight gain", "high calorie", "traditional", "dessert"],
    ingredients: [
      "200 gm split yellow moong dal (dhuli moong dal)",
      "200 gm pure ghee (clarified butter)",
      "180 gm sugar",
      "600 ml full-fat milk",
      "1/2 teaspoon green cardamom powder",
      "15-20 cashew nuts",
      "15-20 almonds, sliced",
      "1 tablespoon raisins",
      "A pinch of saffron strands",
      "1/4 teaspoon nutmeg powder (optional)"
    ],
    instructions: [
      "STEP 1 - SOAK DAL: Take 200 gm split yellow moong dal in a large bowl. Remove any black or discolored lentils and small stones by spreading dal on a plate and checking carefully. Wash the dal 3-4 times in water until water runs clear. Now soak the dal in 500 ml water for 4 hours minimum or overnight. The dal will absorb water and almost double in size - each lentil will be plump and soft. You should be able to easily mash a soaked dal grain between your fingers. This soaking is crucial as it helps the dal grind smoothly and reduces cooking time significantly.",
      
      "STEP 2 - GRIND DAL: After soaking, drain all the water completely using a fine-mesh strainer. Transfer the soaked dal to a mixer grinder jar. Add only 3-4 tablespoon water (just enough to help the blades move). Grind on high speed for 2-3 minutes until you get a smooth, thick paste. Stop 2-3 times and scrape down the sides with a spatula. The paste should be smooth like pancake batter without any whole lentil pieces. Test by rubbing a bit of paste between your fingers - it should feel smooth, not grainy. If you find whole lentils, grind for another minute. The consistency should be thick but pourable - if you tilt the jar, it should flow slowly like honey.",
      
      "STEP 3 - HEAT GHEE: Place a heavy-bottomed kadhai (wok) or deep pan on medium heat. Add 200 gm ghee - yes, this seems like a lot, but it's essential for authentic halwa. The ghee should completely melt in 2-3 minutes. You'll know it's ready when it becomes completely clear and liquid with no solid white bits floating. If you drop a tiny bit of dal paste in the ghee, it should sizzle gently. If it doesn't sizzle, the ghee isn't hot enough. If it sizzles violently and turns brown immediately, reduce the heat.",
      
      "STEP 4 - ROAST DAL PASTE (MOST CRUCIAL STEP): Pour all the ground dal paste into the hot ghee. You'll hear an immediate loud sizzling sound - this is normal. Using a sturdy wooden spoon or steel kadchi, start stirring continuously. This step requires constant attention and cannot be left even for 10 seconds or the dal will stick and burn. Keep the heat on medium. For the first 10 minutes: The paste will bubble vigorously and release lots of steam. It will look very watery and thin. The color will be pale yellow. Keep stirring in one direction making sure to scrape the bottom and sides. After 10-15 minutes: The vigorous bubbling will reduce. The paste will start to thicken slightly. You'll notice the raw dal smell slowly disappearing. After 20-25 minutes: The color will start changing from pale yellow to light golden. The paste will thicken more and start leaving the sides of the kadhai slightly. Your arm will be tired - take turns if someone can help. After 30-35 minutes: The color will turn to a rich golden brown (like caramel). The ghee will start separating and you'll see pools of ghee around the dal paste. The paste will clump together more. The aroma will be nutty and roasted, not raw. After 40 minutes: The dal paste will become a cohesive mass, pulling away from the sides completely. It will have a glossy sheen from the ghee. The color will be deep golden brown. This is when your halwa base is perfectly roasted. Total roasting time: 40-45 minutes of continuous stirring.",
      
      "STEP 5 - PREPARE MILK: While roasting dal (maybe after 30 minutes when you can take a 2-minute break), heat 600 ml full-fat milk in a separate saucepan on medium heat until it's hot but not boiling - you should see steam rising but no bubbles. Keep it warm on low heat. In another small pan, warm 2 tablespoon milk and soak a pinch of saffron strands in it - they will release a beautiful yellow color.",
      
      "STEP 6 - ADD MILK (BE CAREFUL): Once dal is perfectly roasted (after 40-45 minutes), reduce heat to low. Very carefully, pour the hot milk into the roasted dal in a slow, steady stream while stirring continuously with your other hand. WARNING: The mixture will splutter and bubble violently, so stand back slightly and pour from the side, not directly over the kadhai. Keep stirring vigorously - the mixture will look very liquidy at first. Cook on medium heat for 5-7 minutes while stirring continuously. The milk will gradually get absorbed into the dal, and the mixture will thicken. You'll notice the halwa coming together and the liquid reducing.",
      
      "STEP 7 - ADD SUGAR: Add 180 gm sugar all at once. Stir immediately - the sugar will melt and release water, making the mixture thin again (don't worry, this is normal). Keep stirring and cooking on medium heat for 8-10 minutes. As the sugar water evaporates, the halwa will start to thicken again. The color will darken to a rich brownish-orange. Add the saffron-infused milk and 1/2 teaspoon cardamom powder. Mix well. The halwa is ready when it starts leaving the sides of the pan again, has a thick pudding-like consistency, and the ghee begins to separate and pool around it.",
      
      "STEP 8 - FRY NUTS: In a small pan, heat 1 tablespoon ghee on medium heat. Add 15-20 cashew nuts and fry for 1 minute until light golden, stirring constantly. Add 15-20 sliced almonds and fry for another 30 seconds until golden. Finally add 1 tablespoon raisins and turn off heat immediately (raisins cook very fast and will puff up). They should puff up and look plump. Pour this entire mixture including the ghee into the halwa and mix well.",
      
      "STEP 9 - FINAL COOKING: Cook the halwa for another 2-3 minutes on low heat while stirring. The final consistency should be thick enough that when you press the spatula through the halwa, it should briefly create a clear line before the halwa flows back together (this should take 2-3 seconds). If you lift the spatula, the halwa should fall in thick ribbons, not drips. Turn off the heat.",
      
      "STEP 10 - SERVE: Serve the halwa hot in small bowls or katoris. Garnish with a few saffron strands on top. Moong dal halwa is very rich, so serve small portions (about 100 gm per person). It can be stored in the refrigerator for 4-5 days in an airtight container. Reheat with a splash of milk before serving."
    ],
    image_url: "https://images.unsplash.com/photo-1589564125171-b2c1819c4be5?w=800&q=80"
  },

  // WEIGHT LOSS DETAILED RECIPES
  {
    title: "Ragi Dosa with Coconut Chutney",
    description: "Nutritious finger millet crepes with protein-rich lentils",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 480,
    cook_time: 20,
    calories: 280,
    protein: 12,
    carbs: 48,
    fats: 6,
    fiber: 8,
    access_level: "guest",
    goal_category: "weight_loss",
    tags: ["weight loss", "high fiber", "gluten free", "South Indian"],
    ingredients: [
      "100 gm ragi (finger millet) flour",
      "50 gm urad dal (split black gram)",
      "30 gm poha (flattened rice)",
      "1/4 teaspoon fenugreek seeds",
      "Salt to taste",
      "1 teaspoon oil per dosa",
      "For chutney: 100 gm fresh coconut, grated",
      "2 green chillies",
      "1 tablespoon roasted chana dal",
      "Small piece of tamarind",
      "Curry leaves, few",
      "1/4 teaspoon mustard seeds for tempering"
    ],
    instructions: [
      "STEP 1 - SOAK INGREDIENTS (DO THIS 8 HOURS BEFORE): In the evening before you want to make dosas, wash 50 gm urad dal and 30 gm poha separately under running water 3-4 times. In one bowl, soak the urad dal with 1/4 teaspoon fenugreek seeds in enough water to cover them by 2 inches. In another bowl, soak the poha in 100 ml water. Cover both bowls and let them soak overnight (8 hours minimum). The dal will puff up and double in size. The fenugreek seeds help in fermentation.",
      
      "STEP 2 - GRIND BATTER (NEXT MORNING): Drain the urad dal and fenugreek seeds completely. Transfer to a wet grinder or high-power mixer grinder. Add the soaked poha without draining. Add water gradually - start with 50 ml, then add more only if needed (total water should be about 150-180 ml for smooth grinding). Grind on high speed for 10-12 minutes, stopping every 3 minutes to scrape sides. The batter should be fluffy, smooth, and airy - almost like whipped cream. Test by dropping a small amount in water - it should float if properly ground. Transfer this to a large vessel (the batter will rise during fermentation, so use a container that's only half full). Add 100 gm ragi flour and salt to taste. Mix gently with your hand in one direction for 2 minutes. The final batter should be thick like pancake batter - it should coat your finger but drip off slowly.",
      
      "STEP 3 - FERMENTATION: Cover the vessel with a cloth or loose lid (don't seal airtight as fermentation needs some air). Place in a warm spot in your kitchen. In warm weather (above 25°C), fermentation takes 8-10 hours. In cold weather, place the vessel inside an oven with the light on (not heat, just the light bulb provides enough warmth), or wrap in a thick towel. The batter is perfectly fermented when: it doubles in volume, has tiny bubbles throughout, smells slightly sour and tangy (not spoiled), and when you touch it gently, it should feel springy and spongy. In the morning, you'll see it has risen up. Don't stir vigorously - just give it a gentle mix.",
      
      "STEP 4 - PREPARE CHUTNEY: While dosa griddle is heating, make the chutney. In a mixer jar, add 100 gm fresh grated coconut, 2 green chillies (adjust to taste), 1 tablespoon roasted chana dal (this gives body to chutney), small piece of tamarind (size of a marble), a few curry leaves, and salt. Add 100-150 ml water and grind to a smooth paste. Transfer to a bowl. For tempering: Heat 1 teaspoon oil in a small tadka pan on medium heat for 30 seconds. Add 1/4 teaspoon mustard seeds. When they start spluttering (5-10 seconds), add a few curry leaves. They will crackle. Immediately pour this over the chutney and mix. Keep aside.",
      
      "STEP 5 - HEAT THE GRIDDLE: Place a cast iron or non-stick dosa tawa on medium-high heat. Let it heat for 3-4 minutes. To test if it's ready: sprinkle few water drops on the tawa. If they immediately sizzle and evaporate within 2-3 seconds forming small balls that dance around, the tawa is perfect. If water just sits there, it's not hot enough - heat for another minute. If water evaporates instantly without sizzling, it's too hot - reduce heat and wait 1 minute. For first dosa, rub half a cut onion or potato dipped in oil all over the tawa surface. This creates a non-stick layer.",
      
      "STEP 6 - CHECK BATTER CONSISTENCY: Gently stir the fermented batter. It should pour like slightly thick buttermilk. If too thick, add water 1-2 tablespoon at a time and mix gently. If too thin (which is rare), add 1 tablespoon rice flour. The right consistency is crucial: when you pour from a ladle, it should form a continuous stream, not break into drops.",
      
      "STEP 7 - POUR DOSA: Take one full ladle (about 80 ml) of batter. Hold the ladle about 3-4 inches above the center of the hot tawa. Pour the batter in the center while moving the ladle in quick spiral motion outward, like drawing a spiral from center to edge. Alternatively, pour in center and quickly use the back of the ladle to spread in circular motions, starting from center and moving outward in one continuous spiral. The dosa should be thin enough that you can almost see through it - about 7-8 inches in diameter. Don't go back and forth or it will break. If you see holes, that's perfectly fine - ragi dosas typically have a rustic look with small holes. Reduce heat to medium after pouring.",
      
      "STEP 8 - COOK FIRST SIDE: Drizzle 1 teaspoon oil around the edges of the dosa in a circle. Let it cook undisturbed for 2-3 minutes. Watch the transformation: First 30 seconds: Surface will look wet and glossy. After 1 minute: The glossy look will disappear and surface becomes matte. After 2 minutes: Edges will start to lift up slightly from the tawa and turn light brown. The underside will turn golden brown with darker spots - you can gently lift one edge with spatula to check. The dosa should release easily from the tawa without sticking. If it sticks, it needs more cooking time.",
      
      "STEP 9 - FLIP AND FINAL COOK: Using a wide flat spatula, gently slide it under the dosa from one edge and flip it over carefully. Cook the second side for just 1 minute. This side will get light brown spots but won't crisp up as much as the first side - this is normal. The dosa should now be cooked through, crispy on edges and soft in the middle.",
      
      "STEP 10 - FOLD AND SERVE: Using your spatula, fold the dosa in half, then fold again to make a triangle (like folding a circle into semi-circle, then into a quarter). Transfer to a plate immediately. Ragi dosas are best enjoyed fresh and hot - they lose their texture if kept for long. Serve with the coconut chutney prepared earlier. The dosa should be crispy on the outside, soft inside, with a slightly nutty flavor from ragi. Repeat the process with remaining batter, re-greasing the tawa with onion/oil before each dosa if needed."
    ],
    image_url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80"
  },

  {
    title: "Grilled Tandoori Chicken Salad Bowl",
    description: "Protein-packed spiced chicken with fresh vegetables and yogurt dressing",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 125,
    cook_time: 25,
    calories: 320,
    protein: 42,
    carbs: 18,
    fats: 10,
    fiber: 6,
    access_level: "guest",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "low carb", "grilled"],
    ingredients: [
      "400 gm boneless chicken breast, cut into 1-inch cubes",
      "For marinade: 150 gm hung curd (Greek yogurt)",
      "1 tablespoon ginger-garlic paste",
      "1 tablespoon lemon juice",
      "1 teaspoon Kashmiri red chilli powder",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon garam masala",
      "1 teaspoon kasuri methi (dried fenugreek leaves)",
      "1 tablespoon mustard oil",
      "Salt to taste",
      "For salad: 150 gm mixed lettuce leaves",
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1 red onion, sliced thin",
      "1 carrot, julienned",
      "For dressing: 100 gm hung curd",
      "1 tablespoon lemon juice",
      "1/4 teaspoon roasted cumin powder",
      "Fresh mint leaves, chopped",
      "Salt and black pepper"
    ],
    instructions: [
      "STEP 1 - PREPARE HUNG CURD: This needs to be done 2 hours before marination. Take 250 gm thick curd (yogurt) in a clean muslin cloth or cheesecloth. Gather the edges and tie it tightly. Hang this bundle over your kitchen sink or a bowl (use a ladle placed across a bowl to hang it). Let all the water drip out for 2 hours. After 2 hours, open the cloth - you should have about 150 gm of thick, creamy hung curd that's the consistency of cream cheese. If you don't have time, use thick Greek yogurt instead.",
      
      "STEP 2 - PREPARE CHICKEN: Wash 400 gm boneless chicken breast under cold running water and pat completely dry with paper towels. This is important - wet chicken won't absorb marinade well. Cut the chicken into even 1-inch cubes. Even sizes ensure uniform cooking. Using a fork, prick each piece all over 8-10 times. These tiny holes help the marinade penetrate deep into the meat. Place all chicken pieces in a wide bowl or zip-lock bag.",
      
      "STEP 3 - MAKE TANDOORI MARINADE: In a separate bowl, add 150 gm hung curd. Add 1 tablespoon ginger-garlic paste (fresh is best), 1 tablespoon fresh lemon juice, 1 teaspoon Kashmiri red chilli powder (this gives color without too much heat), 1/2 teaspoon turmeric powder, 1 teaspoon garam masala, 1 teaspoon kasuri methi (crush it between your palms while adding - this releases the aroma), 1 tablespoon mustard oil (this is traditional for tandoori flavor, but you can use regular oil), and salt to taste. Mix all ingredients thoroughly using a whisk or spoon until you have a smooth, thick, bright red-orange paste. The marinade should be thick enough to coat the back of a spoon. Taste it - it should be tangy from lemon, slightly salty, and flavorful. Adjust seasoning if needed (but remember it will taste less salty once cooked).",
      
      "STEP 4 - MARINATE CHICKEN: Pour the entire marinade over the chicken pieces. Using your clean hands (or wear disposable gloves), massage the marinade into each piece thoroughly, ensuring every piece is completely coated on all sides. There should be no white chicken visible - everything should be covered in the red-orange marinade. Cover the bowl tightly with cling film or seal the zip-lock bag. Refrigerate for at least 2 hours, ideally 4-6 hours. For best results, marinate overnight. During marination, the acids in yogurt and lemon will tenderize the chicken, and the spices will penetrate the meat. Remove from refrigerator 30 minutes before cooking to bring to room temperature - this ensures even cooking.",
      
      "STEP 5 - PREPARE VEGETABLES: While chicken marinates, prepare your salad vegetables. Wash 150 gm mixed lettuce leaves (iceberg, romaine, or any leafy greens) in cold water. Drain completely and pat dry with a clean kitchen towel or salad spinner. Wet lettuce will make the salad soggy. Tear large leaves into bite-sized pieces by hand (don't cut with knife as it causes browning). Keep refrigerated. Dice 1 cucumber into small 1/2 inch cubes - remove the soft seedy center if cucumber is too watery. Dice 2 tomatoes similarly. Slice 1 red onion into very thin rings (soak in cold water for 10 minutes if you don't like strong onion flavor, then drain). Julienne 1 carrot into thin matchstick-sized strips. Keep all vegetables separate in the refrigerator.",
      
      "STEP 6 - MAKE YOGURT DRESSING: In a small bowl, add 100 gm hung curd. Add 1 tablespoon fresh lemon juice, 1/4 teaspoon roasted cumin powder, 2 tablespoon finely chopped fresh mint leaves, salt to taste, and a pinch of black pepper. Whisk vigorously until smooth and slightly fluffy. Taste and adjust - it should be tangy, slightly salty, and herby. If too thick, add 1-2 teaspoon water. Keep refrigerated until serving.",
      
      "STEP 7 - PREHEAT GRILL/PAN: If using an oven with grill function: Preheat to 200°C (390°F) for 10 minutes. Line a baking tray with aluminum foil and place a wire rack on top (chicken will be placed on this rack - it allows heat to circulate and excess marinade to drip off). If using a grill pan or regular pan: Place it on high heat and let it get very hot for 5 minutes. You'll know it's ready when you hover your palm 6 inches above the pan and feel strong heat. If using metal skewers, soak wooden skewers in water for 30 minutes to prevent burning.",
      
      "STEP 8 - SKEWER CHICKEN (OPTIONAL): Thread 4-5 marinated chicken pieces onto each skewer, leaving small gaps between pieces for even heat circulation. Don't pack them tightly. If not using skewers, you can cook pieces directly on the grill rack or in the pan. Shake off excess marinade from each piece - there should be a coating but it shouldn't be dripping. A little marinade is good but too much will burn.",
      
      "STEP 9 - GRILL CHICKEN: For oven method: Place skewered chicken or individual pieces on the wire rack in the preheated oven. Grill for 12-15 minutes, turning once halfway through (at 6-7 minute mark) using tongs. The chicken should develop charred dark brown/black spots (this is the characteristic tandoori look). To check doneness, insert a knife in the thickest piece - juices should run clear, not pink. Or use meat thermometer - internal temperature should reach 75°C (165°F). For stovetop grill pan method: Brush pan lightly with oil. Place chicken pieces with some space between them. Don't overcrowd. Cook on high heat for 4-5 minutes without moving - this creates grill marks. Flip using tongs and cook another 4-5 minutes. Then reduce heat to medium and cook for another 8-10 minutes total, turning every 2-3 minutes for even cooking. The chicken should be cooked through with nice char marks.",
      
      "STEP 10 - REST CHICKEN: Once cooked, transfer chicken to a plate and cover loosely with aluminum foil. Let it rest for 5 minutes. This allows the juices to redistribute throughout the meat, making it juicier. If you cut immediately, all juices will run out and chicken will be dry.",
      
      "STEP 11 - ASSEMBLE BOWL: Take a large serving bowl (or individual bowls). Start with a bed of mixed lettuce leaves at the bottom. Arrange cucumber, tomatoes, carrots, and onion rings on top in sections or mix them together. Place the grilled tandoori chicken pieces (remove from skewers if used) on top of the vegetables. The chicken should still be warm. Drizzle the prepared yogurt dressing all over or serve it on the side. Garnish with fresh mint leaves and a wedge of lemon. Optionally sprinkle some chaat masala for extra tang.",
      
      "STEP 12 - SERVE: Serve immediately while chicken is still warm. The contrast of warm spiced chicken with cool, crisp vegetables and creamy dressing is what makes this dish perfect. Toss everything together just before eating. This meal is high in protein, low in carbs, filling due to fiber from vegetables, and perfect for weight loss as it keeps you satisfied for hours."
    ],
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80"
  },

  // ADDITIONAL WEIGHT GAIN RECIPES (4 more)
  {
    title: "Mutton Keema Paratha",
    description: "Whole wheat flatbread stuffed with spiced minced mutton",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Hard",
    prep_time: 30,
    cook_time: 45,
    calories: 680,
    protein: 32,
    carbs: 72,
    fats: 28,
    fiber: 8,
    access_level: "logged_in",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "filling", "mutton"],
    ingredients: [
      "300 gm whole wheat flour (atta)",
      "300 gm mutton keema (minced mutton)",
      "2 large onions, finely chopped",
      "2 medium tomatoes, finely chopped",
      "1 tablespoon ginger-garlic paste",
      "2 green chillies, finely chopped",
      "1 teaspoon cumin seeds",
      "1 teaspoon coriander powder",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chilli powder",
      "1 teaspoon garam masala",
      "Fresh coriander leaves, 3 tablespoon chopped",
      "Fresh mint leaves, 2 tablespoon chopped",
      "3 tablespoon oil for cooking filling",
      "Ghee for roasting parathas (about 4 tablespoon total)",
      "Salt to taste",
      "Water as needed for dough (about 150-180 ml)"
    ],
    instructions: [
      "STEP 1 - PREPARE DOUGH: In a large wide bowl (parat), add 300 gm whole wheat flour. Make a well in the center. Add 1/2 teaspoon salt and 1 tablespoon oil. Mix the salt and oil into the flour using your fingertips, rubbing the flour between your palms. The flour will look slightly moist and crumbly. Now add water little by little - start with 100 ml. Mix with your fingers and keep adding water 2 tablespoon at a time. The amount of water needed depends on the flour quality, so don't add all at once. Knead for 8-10 minutes, pushing the dough away with your palm heel, folding it back, and repeating. The dough is ready when: it doesn't stick to your hands, it's smooth and elastic, when you press it with a finger, it bounces back slowly, and if you poke a hole, it should not remain sticky inside. The texture should be softer than regular roti dough but firmer than pizza dough. Cover with a damp cloth and let it rest for 20 minutes minimum. This resting time allows the gluten to relax, making parathas easier to roll.",
      
      "STEP 2 - PREPARE MUTTON KEEMA: While dough rests, rinse 300 gm mutton keema under cold water in a colander to remove any bone pieces. Let it drain completely and pat dry with paper towels. Place a heavy-bottomed kadhai or deep pan on high heat. Add 3 tablespoon oil. When oil is hot (after 1 minute - test by adding one cumin seed, it should sizzle immediately), add 1 teaspoon cumin seeds. They will crackle and turn slightly darker in 5-10 seconds. Immediately add 2 finely chopped onions. Reduce heat to medium-high and fry the onions, stirring frequently, for 8-10 minutes until they turn golden brown at the edges. Don't rush this - the sweetness of caramelized onions is crucial for the filling's flavor. The onions should reduce in volume by half and look translucent with brown edges.",
      
      "STEP 3 - COOK KEEMA BASE: Add 1 tablespoon ginger-garlic paste and 2 chopped green chillies to the fried onions. Stir for 1 minute until the raw smell disappears - you'll notice the pungent garlic aroma becoming milder and more fragrant. Add 2 finely chopped tomatoes. Cook for 4-5 minutes, pressing them with the back of your spatula to help them break down faster. The tomatoes are ready when they become completely mushy, the oil starts separating and pooling at the sides, and the mixture looks like a thick paste rather than distinct tomato pieces. This is your masala base.",
      
      "STEP 4 - ADD AND COOK MUTTON: Add the drained mutton keema to the masala base. Increase heat to high. Spread the keema evenly and let it cook undisturbed for 2 minutes - you'll hear it sizzle as moisture evaporates. Then add all spices at once: 1 teaspoon coriander powder, 1/2 teaspoon turmeric, 1 teaspoon red chilli powder, and salt to taste. Mix thoroughly, breaking up any large clumps with your spatula. The keema should be evenly coated with spices and turn yellowish from the turmeric. Cook on high heat for 5 minutes, stirring every minute. Raw mutton is reddish-brown; as it cooks, it will gradually turn light brown then dark brown. After 5 minutes, reduce heat to medium and add 100 ml water. Cover and cook for 20 minutes, stirring every 5 minutes. Mutton takes longer to cook than chicken. After 20 minutes, remove lid - most water should be evaporated. If there's still liquid, cook uncovered for 5 more minutes on high heat. The keema is perfectly cooked when: all pieces are dark brown, no pink/red color remains, it looks slightly dry and grainy (not wet), the oil is visible around the mixture, and most importantly, when you bite a piece, it should be tender and not chewy. If still chewy, add 50 ml water and cook covered for another 10 minutes.",
      
      "STEP 5 - FINISH FILLING: Once keema is perfectly cooked and tender, add 1 teaspoon garam masala, 3 tablespoon chopped fresh coriander, and 2 tablespoon chopped mint. Mix well and cook for 1 more minute to let the herbs wilt and release their aroma. Turn off heat. Taste the filling - it should be well-spiced, slightly salty (remember it's going inside bland dough, so filling needs more seasoning than you think), and completely dry with no liquid. If there's any liquid, the parathas will become soggy. Transfer to a plate and spread it out so it cools faster. Let it cool to room temperature - this is crucial because hot filling will make the dough wet and difficult to handle. This takes about 20-30 minutes. You can prepare filling in advance and refrigerate.",
      
      "STEP 6 - PORTION DOUGH AND FILLING: Once both dough and filling are ready and filling is cooled, knead the dough once more for 1 minute and divide into 8 equal portions (each about 50 gm). Roll each portion into a smooth ball between your palms - no cracks on the surface. Divide the keema filling also into 8 equal portions (about 3 tablespoon each). This ensures each paratha has equal filling.",
      
      "STEP 7 - STUFF PARATHA (CRITICAL STEP): Dust your work surface (chakla) lightly with dry flour. Take one dough ball, flatten it between your palms into a thick disc. Using a rolling pin (belan), roll it into a 4-inch diameter circle, about 1/4 inch thick. The edges can be slightly thinner but the center should be thick enough to hold filling. Place one portion of cooled keema filling in the center of this circle, leaving 1 inch border all around. Don't overfill or it will leak out during rolling. Now bring all the edges of the dough towards the center, covering the filling completely, like making a money bag or potli. Pinch all the edges together at the top to seal completely - there should be no gaps or the filling will come out. Press gently to flatten this stuffed ball slightly. Dust both sides with dry flour.",
      
      "STEP 8 - ROLL STUFFED PARATHA: This is the trickiest part. Place the stuffed ball seam-side down on your floured surface. Using very gentle pressure (unlike regular roti where you apply pressure, here you barely press), start rolling from the center outward. Roll in one direction, lift the pin, rotate the paratha 45 degrees, roll again. Keep rotating and rolling gently. If you press too hard, the filling will break through the dough. If you see a piece of keema poking through, immediately sprinkle dry flour on that spot and avoid rolling over it. The goal is to get a 6-7 inch diameter paratha, about 1/4 inch thick. It will be much thicker than regular roti. Some small cracks or visible filling is fine - just dust with flour. Don't aim for perfection on your first few parathas; you'll get better with practice. If the paratha breaks too much, gather the dough and filling, make a ball again, and re-roll.",
      
      "STEP 9 - COOK PARATHA: Heat a heavy tawa or griddle on medium-high heat for 3-4 minutes. Place the rolled paratha on the hot tawa. Within 10-15 seconds, you'll see tiny bubbles forming on the surface. Let it cook for 1 minute - the bottom side will get light brown spots. Flip the paratha using a flat spatula. Now add 1/2 tablespoon ghee around the edges of the paratha, letting it flow underneath. Cook for 1.5-2 minutes. You'll see the paratha puffing up in places - this is good. Press gently with the spatula on the puffed areas to help it cook evenly. Flip again and add another 1/2 tablespoon ghee. Press the edges and center with your spatula - this helps develop crispy layers. Cook for another 1-2 minutes until both sides have golden brown and some dark brown spots. The paratha should look crispy on the outside. Total cooking time is about 4-5 minutes per paratha. If it's cooking too fast and burning, reduce heat slightly. If it's taking too long and not getting brown, increase heat.",
      
      "STEP 10 - SERVE: Transfer to a plate lined with paper towel (this absorbs excess ghee). Serve immediately while hot. Keema paratha is a complete meal in itself - the stuffing provides protein, the whole wheat provides complex carbs and fiber, and the ghee provides healthy fats. Serve with a side of fresh mint chutney, sliced onions, and a glass of buttermilk. These parathas stay good for 4-5 hours at room temperature or can be refrigerated for 2 days. Reheat on tawa with a little ghee before serving."
    ],
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
  },

  {
    title: "Dry Fruit and Nut Ladoo",
    description: "Energy-dense sweet balls made with dates, nuts, and seeds",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 20,
    cook_time: 15,
    calories: 420,
    protein: 12,
    carbs: 48,
    fats: 22,
    fiber: 6,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "energy booster", "no sugar", "healthy snack"],
    ingredients: [
      "200 gm seedless dates (khajoor)",
      "100 gm almonds",
      "100 gm cashew nuts",
      "50 gm walnuts",
      "50 gm pistachios",
      "30 gm pumpkin seeds",
      "30 gm sunflower seeds",
      "2 tablespoon sesame seeds (til)",
      "2 tablespoon desiccated coconut",
      "1/2 teaspoon green cardamom powder",
      "2 tablespoon ghee (for binding, if needed)",
      "Pinch of nutmeg powder (optional)"
    ],
    instructions: [
      "STEP 1 - DRY ROAST NUTS (DO THIS FIRST): Heat a heavy-bottomed pan on low heat for 1 minute. Add 100 gm almonds and dry roast them, stirring constantly with a wooden spatula. The key is low heat and constant stirring. After 4-5 minutes, you'll start smelling a pleasant nutty aroma - this means the oils in almonds are being released. The almonds will turn from pale cream to light golden, and you might hear some crackling sounds. They're ready when they turn very slightly darker and when you rub one between your fingers, the skin comes off easily. This takes 6-7 minutes total. Transfer immediately to a plate (if you leave them in the hot pan, they'll continue cooking and might burn). Repeat the same process separately for: 100 gm cashews (these roast faster, only 4-5 minutes - they should turn light golden with some brown spots), 50 gm walnuts (5 minutes - they turn slightly darker), and 50 gm pistachios (4 minutes - they develop a deeper green color and nutty smell). Let all roasted nuts cool completely on separate plates for 10-15 minutes. Roasting is crucial - it removes moisture, enhances flavor, and makes them easier to grind.",
      
      "STEP 2 - ROAST SEEDS: In the same pan on low heat, add 30 gm pumpkin seeds. Stir continuously for 3-4 minutes. They're done when they puff up slightly, make popping sounds, and some turn light golden. Transfer to a plate. Add 30 gm sunflower seeds and roast for 2-3 minutes until they turn golden and smell toasted. Transfer to plate. Finally, add 2 tablespoon sesame seeds and roast for 2 minutes, stirring constantly - they're tiny and burn quickly. They're ready when they turn golden and start jumping in the pan. All seeds should smell nutty and toasted, not burnt. Let them cool completely.",
      
      "STEP 3 - PREPARE DATES: Take 200 gm seedless dates. If your dates have seeds, you need to remove them - slit each date lengthwise with a knife and pull out the seed. Even seedless dates sometimes have seed fragments, so check each one by pressing with your fingers. Roughly chop the dates into small pieces (each date into 4-6 pieces). This makes them easier to process. If dates are too dry and hard, soak them in warm water for 10 minutes, then drain completely and pat dry with a cloth. Dates should be soft and sticky, not hard. The stickiness of dates acts as a natural binder for the ladoos.",
      
      "STEP 4 - GRIND NUTS AND SEEDS: Once all nuts and seeds are completely cooled (this is important - if even slightly warm, they'll release oils and turn into paste instead of powder), transfer them all to a mixer grinder or food processor jar. Grind in short 3-4 second pulses, stopping after each pulse to check consistency. DO NOT run the grinder continuously or you'll make nut butter instead of coarse powder. After 5-6 pulses (about 15-20 seconds total grinding), open and check. The mixture should be a coarse powder with some small chunks visible - like breadcrumbs or coarse sand texture. Some bigger nut pieces (1-2 mm) are fine and actually good - they give a nice crunch. If you grind too fine into powder, the ladoos won't have texture. Once you get coarse powder consistency, transfer to a large mixing bowl.",
      
      "STEP 5 - PROCESS DATES: Without washing the mixer jar (some nut powder stuck to the sides will help), add all the chopped dates. Process for 20-30 seconds continuously until the dates form a sticky ball or paste. Stop and scrape down the sides with a spatula, then pulse 3-4 more times. The dates should become a smooth, sticky paste that clumps together. If dates are too dry to form a paste, add 1 teaspoon warm water and process again. The paste should be sticky like chewing gum but not wet or watery.",
      
      "STEP 6 - MIX EVERYTHING: Add the date paste to the bowl with ground nuts and seeds. Add 2 tablespoon desiccated coconut (this absorbs any extra moisture and adds texture), 1/2 teaspoon cardamom powder (for flavor), and a tiny pinch of nutmeg powder if using (optional - gives a warm spice note). Now comes the mixing - this requires elbow grease! Using your clean hands, mix everything together vigorously. Initially it will seem like the dry nuts won't combine with the sticky dates, but keep mixing. Press the mixture against the sides of the bowl, gather it together, and knead it like dough. After 3-4 minutes of thorough mixing, the sticky dates will bind all the nuts and seeds together, and you should be able to form a ball that holds its shape. The mixture should be moist enough to stick together when pressed but not overly sticky or wet. Test: take a small handful and press it tightly in your fist. When you open your palm, it should hold its shape as a lump. If it crumbles, it's too dry - add 1 tablespoon melted ghee and mix again. If it's too sticky and sticking to your hands, add 1-2 tablespoon more desiccated coconut.",
      
      "STEP 7 - SHAPE LADOOS: Grease your palms very lightly with ghee (just a few drops). Take about 30-35 gm of mixture (roughly 1.5 tablespoon) and place it in your palm. Press it tightly first - this is crucial for ladoos to hold shape. Then roll between both palms applying firm, constant pressure in circular motion to form a smooth, compact ball. The more pressure you apply while rolling, the better the ladoo will hold together. If you roll too gently, the ladoo will be fragile and break apart. Each ladoo should be about the size of a small lemon or golf ball (roughly 3-4 cm diameter). Place shaped ladoos on a plate or tray lined with parchment paper, leaving space between them as they might be slightly sticky.",
      
      "STEP 8 - SET LADOOS: Once all ladoos are shaped, refrigerate them for 1-2 hours. The cold temperature helps them firm up and hold their shape better. After chilling, they'll be much firmer and easier to handle. If you try to eat immediately, they might be too soft and sticky.",
      
      "STEP 9 - STORAGE: These ladoos can be stored in an airtight container at room temperature for 1 week, or refrigerated for up to 3 weeks. Some people prefer them chilled (firmer texture) while others like room temperature (softer, more chewy). Before serving, you can roll each ladoo in desiccated coconut or crushed pistachios for a decorative finish.",
      
      "STEP 10 - SERVING: Serve 1-2 ladoos as an energy-boosting snack. They're perfect as a pre-workout or post-workout snack, or when you need quick energy. Each ladoo provides sustained energy from dates (natural sugars), protein from nuts, and healthy fats. They're also great for kids' lunch boxes or travel snacks as they don't require refrigeration."
    ],
    image_url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80"
  },

  {
    title: "Egg Bhurji Sandwich",
    description: "Spiced scrambled eggs with vegetables in whole wheat bread",
    meal_type: "breakfast",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 520,
    protein: 28,
    carbs: 52,
    fats: 20,
    fiber: 6,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "quick breakfast", "eggs"],
    ingredients: [
      "4 large eggs",
      "8 slices whole wheat bread",
      "1 large onion, finely chopped",
      "2 medium tomatoes, finely chopped",
      "2 green chillies, finely chopped",
      "1/2 teaspoon turmeric powder",
      "1/2 teaspoon red chilli powder",
      "1/2 teaspoon cumin powder",
      "Fresh coriander leaves, 2 tablespoon chopped",
      "2 tablespoon butter for sandwich",
      "2 tablespoon oil for bhurji",
      "Salt to taste",
      "Black pepper powder to taste"
    ],
    instructions: [
      "STEP 1 - PREPARE VEGETABLES: Peel and finely chop 1 large onion - the pieces should be small, about 2-3 mm size. If pieces are too big, the bhurji won't mix well and will be chunky. Wash and finely chop 2 medium tomatoes into small pieces, removing the hard core area. Finely chop 2 green chillies (remove seeds if you want less heat). Chop 2 tablespoon fresh coriander leaves. Keep all vegetables in separate small bowls - this makes cooking faster as you can add them quickly when needed.",
      
      "STEP 2 - BEAT EGGS: Crack 4 large eggs into a bowl. Check each egg as you crack it - if you see any blood spots or the yolk is broken and spreading (sign of old egg), discard it. Add a pinch of salt and black pepper. Using a fork or whisk, beat the eggs vigorously for 30-45 seconds. Beat in one direction in circular motions, lifting the fork/whisk up occasionally to incorporate air. The eggs are properly beaten when the whites and yolks are completely combined with no streaks of white visible, and the mixture is uniform yellow color. The more you beat, the fluffier your bhurji will be. If you want extra fluffy bhurji, add 1 tablespoon milk while beating.",
      
      "STEP 3 - COOK ONIONS: Place a wide non-stick pan or kadhai on medium-high heat. Let it heat for 1 minute - test by sprinkling few water drops; they should sizzle and evaporate. Add 2 tablespoon oil, swirl it around to coat the pan. After 20 seconds, add the chopped onions. Stir immediately - you should hear a sizzling sound. Cook the onions, stirring frequently, for 4-5 minutes. In the first 2 minutes, onions will release water and become translucent (you can see through them). After 3-4 minutes, the water will evaporate and onions will start turning golden at the edges. Add chopped green chillies and stir for 30 seconds. The raw smell of chillies will reduce and they'll soften.",
      
      "STEP 4 - ADD TOMATOES AND SPICES: Add chopped tomatoes to the onions. Mix well and cook for 3-4 minutes, stirring occasionally. Press the tomatoes with the back of your spatula to help them break down faster. The tomatoes are ready when they become soft and mushy, releasing their juice, and starting to break down into a paste-like consistency. You'll see the oil separating and pooling at the edges - this is your indicator that the base is ready. Now add all spices: 1/2 teaspoon turmeric powder, 1/2 teaspoon red chilli powder, 1/2 teaspoon cumin powder, and salt to taste. Mix thoroughly for 30 seconds. The mixture should turn bright yellow-orange from turmeric and smell fragrant from the spices.",
      
      "STEP 5 - ADD EGGS AND SCRAMBLE: Give the beaten eggs one final quick stir, then pour them all at once into the hot onion-tomato masala. Don't stir immediately! Let the eggs sit undisturbed for 20-30 seconds. You'll see the edges starting to set and turn opaque while the center is still liquid. Now using a wooden spatula or turner, start scrambling - make large sweeping strokes from the outside edges toward the center, folding the cooked eggs over the liquid parts. Don't stir frantically in small motions (that makes very tiny curds); instead use broad strokes to create larger, softer curds. Keep folding and turning every 15-20 seconds. After 2-3 minutes, the eggs will go from completely liquid to soft, creamy, large curds with no liquid visible. This is the perfect stage - the eggs should still look slightly wet and glossy, not dry. They will continue cooking from residual heat even after you turn off the flame, so it's better to undercook slightly than overcook. Overcooked eggs become rubbery and dry.",
      
      "STEP 6 - FINISH BHURJI: Once eggs are softly scrambled (they should be in large, moist curds), immediately reduce heat to low. Add chopped coriander leaves and give one final gentle mix. Taste and adjust salt if needed. Turn off the heat. The bhurji should look creamy, yellow-orange in color from the turmeric, with visible pieces of onion and tomato throughout, and have a slightly glossy appearance from the oil. Let it sit for 1 minute - the eggs will firm up slightly but remain soft.",
      
      "STEP 7 - PREPARE BREAD: While bhurji is resting, take 8 slices of whole wheat bread. You can use them as is, or for extra flavor and texture, lightly toast them. To toast: Heat a griddle or tawa on medium heat. Place 2-3 bread slices on the dry griddle (no oil/butter yet). Toast for 1 minute per side until they turn light golden and slightly crisp but not hard. They should still be soft enough to bite easily. Toasted bread holds up better with the moist bhurji filling and adds a nice contrast in texture.",
      
      "STEP 8 - BUTTER BREAD: Take 2 tablespoon butter (salted or unsalted, your choice) and keep it at room temperature for 5 minutes so it's spreadable. Using a butter knife, spread a thin, even layer of butter on one side of each bread slice. Don't use too much butter - just enough to add flavor without making the bread soggy. The butter also acts as a moisture barrier, preventing the egg filling from making the bread wet and mushy.",
      
      "STEP 9 - ASSEMBLE SANDWICH: Lay 4 bread slices on your work surface, buttered side up. Divide the egg bhurji into 4 equal portions (each portion will be about 3-4 heaped tablespoons). Place one portion in the center of each bread slice, spreading it evenly almost to the edges but leaving a 1 cm border (the filling tends to squeeze out to the edges when you close the sandwich, so don't go all the way to the edge). Top with another bread slice, buttered side facing down (so butter touches the bhurji). Press down gently but firmly with your palm to seal the sandwich together.",
      
      "STEP 10 - SERVE OR GRILL (OPTIONAL): You can serve the sandwiches as is, or for a special touch, grill them: Heat the same griddle/tawa on medium heat. Brush with 1/2 teaspoon butter. Place the sandwich on the griddle and cook for 1-2 minutes until the bottom turns golden brown with grill marks (press gently with a spatula to get even browning). Brush the top side with butter, flip, and cook the other side for 1-2 minutes. The sandwich should be golden brown on both sides, warm throughout, and slightly crispy outside while soft inside. Cut diagonally into triangles for better presentation. Serve immediately while hot. Egg bhurji sandwich pairs perfectly with tomato ketchup, green chutney, or a cup of masala chai."
    ],
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },

  {
    title: "Whole Wheat Pasta in Creamy Mushroom Sauce",
    description: "Healthy pasta with button mushrooms in white sauce with paneer",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 25,
    calories: 550,
    protein: 22,
    carbs: 68,
    fats: 20,
    fiber: 9,
    access_level: "logged_in",
    goal_category: "weight_gain",
    tags: ["weight gain", "Italian", "creamy", "mushrooms"],
    ingredients: [
      "200 gm whole wheat penne pasta",
      "200 gm button mushrooms, sliced",
      "100 gm paneer, cubed small",
      "2 tablespoon butter",
      "2 tablespoon all-purpose flour (maida)",
      "300 ml milk",
      "2 cloves garlic, minced",
      "1/2 teaspoon oregano",
      "1/2 teaspoon mixed herbs",
      "1/4 teaspoon black pepper powder",
      "2 tablespoon olive oil",
      "2 tablespoon grated cheese (optional)",
      "Salt to taste",
      "Fresh basil or parsley for garnish"
    ],
    instructions: [
      "STEP 1 - BOIL PASTA WATER: Fill a large pot (at least 3-liter capacity) with 2 liters of water. Add 1 tablespoon salt - this seems like a lot but pasta water should taste like seawater for properly seasoned pasta. Place the pot on high heat, cover with a lid to boil faster. It will take 8-10 minutes to reach a rolling boil. You'll know it's ready when you see large, rapid bubbles breaking on the surface continuously. If you add pasta before water is fully boiling, it will become mushy.",
      
      "STEP 2 - COOK PASTA: Once water is at a rolling boil, remove lid and add 200 gm whole wheat penne pasta all at once. Stir immediately with a long spoon to prevent pasta from sticking to the bottom or to each other. The water will stop boiling when you add pasta - this is normal. Keep the heat on high. Within 1-2 minutes, the water will come back to a boil. Once it's boiling again, reduce heat to medium-high (the water should still be actively bubbling but not overflowing). Set a timer for 9 minutes (or check the package instructions - usually whole wheat pasta takes 9-11 minutes). Stir the pasta every 2-3 minutes to ensure even cooking. To test doneness: After 8 minutes, remove one piece of pasta with a spoon, let it cool for 10 seconds, then bite into it. It should be al dente - meaning cooked through but still have a slight firmness in the center when you bite, not mushy or soft. If the center is still hard and white, cook for another 1-2 minutes. Once done, place a colander in the sink and pour the pasta into it to drain. Give the colander a few good shakes to remove excess water. DO NOT rinse the pasta with water (this removes the starch that helps sauce stick). Set aside.",
      
      "STEP 3 - PREPARE MUSHROOMS: While pasta is cooking, prepare mushrooms. Wipe 200 gm button mushrooms with a damp cloth or paper towel to remove any dirt - don't wash them under water as they absorb water like a sponge and become soggy. Cut off the very end of each stem (about 2mm). Slice the mushrooms vertically into 3-4mm thick slices. Heat 1 tablespoon olive oil in a wide pan on high heat for 30 seconds. Add sliced mushrooms. Don't stir immediately! Let them sit for 1-2 minutes - this helps them develop a golden crust. Then stir and cook for 4-5 minutes, stirring every minute. Initially mushrooms will release water - keep cooking until all that water evaporates and mushrooms start to turn golden brown at the edges. They should reduce in size by half and smell earthy and fragrant. Add a pinch of salt and black pepper. Transfer to a plate.",
      
      "STEP 4 - MAKE WHITE SAUCE (BÉCHAMEL): In the same pan (no need to wash), reduce heat to medium. Add 2 tablespoon butter and let it melt completely - this takes 30-40 seconds. Add 2 minced garlic cloves and sauté for 20 seconds until fragrant but not brown. Now add 2 tablespoon all-purpose flour (maida) all at once. Immediately start stirring with a wooden spoon or whisk. This mixture of flour and butter is called a 'roux' and is the base of white sauce. Cook the roux, stirring constantly without stopping, for 2 minutes. It will look like wet sand first, then smooth paste. The color will change from white to very light beige. You must cook it for the full 2 minutes or your sauce will have a raw flour taste. Keep stirring to prevent lumps and burning.",
      
      "STEP 5 - ADD MILK: Warm 300 ml milk in microwave for 1 minute or in a separate pan until it's hot but not boiling - hot milk prevents lumps. Now, very slowly, add the hot milk to the roux while whisking continuously. Add milk in four parts: first add about 75 ml, whisk vigorously until smooth and no lumps remain. Add another 75 ml, whisk again. Keep adding remaining milk in two more additions, whisking after each addition. Once all milk is added and the mixture is smooth, increase heat to medium-high. Keep whisking frequently. The sauce will start to thicken in 3-4 minutes. You'll notice it coating the back of your spoon. Keep cooking until it reaches a consistency where it coats the spoon and drips off in ribbons (not thin streams). If it's too thick, add a splash of milk. If too thin, cook for another 2-3 minutes while whisking.",
      
      "STEP 6 - SEASON SAUCE: Once white sauce has the right consistency, reduce heat to low. Add salt to taste (remember pasta was boiled in salted water, so don't over-salt), 1/4 teaspoon black pepper powder, 1/2 teaspoon oregano, and 1/2 teaspoon mixed herbs. Stir well and let it simmer on low heat for 1-2 minutes so flavors infuse. Taste and adjust seasoning. The sauce should be creamy, smooth, and flavorful.",
      
      "STEP 7 - COMBINE EVERYTHING: Add the cooked mushrooms back to the white sauce. Add 100 gm small-cubed paneer. Add the drained pasta. Using a large spoon or pasta fork, gently fold everything together, coating the pasta evenly with sauce. Cook on low heat for 2-3 minutes, stirring gently, until everything is heated through and well combined. The pasta should be completely coated in the creamy sauce. If the sauce seems too thick, add 2-3 tablespoon of milk or pasta cooking water (if you saved some) to loosen it.",
      
      "STEP 8 - FINAL TOUCH: Turn off heat. If using cheese, sprinkle 2 tablespoon grated cheese on top and let it melt from the residual heat. Give one final gentle mix.",
      
      "STEP 9 - SERVE: Transfer to serving plates or bowls immediately while hot. Garnish with fresh basil or parsley leaves. Optionally sprinkle more black pepper or red chilli flakes on top. Serve with garlic bread or a side salad. This pasta is filling, protein-rich from paneer, high in fiber from whole wheat pasta, and the creamy sauce adds calories - perfect for weight gain."
    ],
    image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80"
  },

  {
    title: "Sattu Protein Shake",
    description: "Traditional roasted gram flour drink with banana and honey",
    meal_type: "snack2",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 0,
    calories: 380,
    protein: 18,
    carbs: 58,
    fats: 8,
    fiber: 7,
    access_level: "guest",
    goal_category: "weight_gain",
    tags: ["weight gain", "high protein", "traditional", "instant energy"],
    ingredients: [
      "4 tablespoon sattu (roasted gram flour)",
      "1 large ripe banana",
      "300 ml chilled milk",
      "2 tablespoon honey or jaggery powder",
      "1/4 teaspoon green cardamom powder",
      "1 tablespoon chopped almonds",
      "1 tablespoon chopped dates",
      "4-5 ice cubes",
      "Pinch of black salt (optional)"
    ],
    instructions: [
      "STEP 1 - CHECK SATTU QUALITY: Use good quality sattu (roasted black chana flour) - it should be fine powder, light brown color, and smell nutty and roasted, not raw or musty. If your sattu has lumps, sift it through a fine strainer to get smooth powder. Fresh sattu makes a huge difference in taste.",
      
      "STEP 2 - PREPARE BANANA: Peel 1 large ripe banana - it should have brown spots on the skin which indicates it's perfectly ripe and sweet. If banana is not ripe enough (all yellow with no brown spots), the shake won't be sweet. Cut the banana into 4-5 pieces for easier blending.",
      
      "STEP 3 - BLEND INGREDIENTS: In a blender jar, add 4 tablespoon sattu flour first (adding dry ingredients first prevents them from sticking to the bottom). Add banana pieces, 2 tablespoon honey or jaggery powder (jaggery gives a more traditional taste, honey is sweeter), 1/4 teaspoon cardamom powder, 1 tablespoon chopped almonds, 1 tablespoon chopped dates, and a tiny pinch of black salt if using (this enhances flavors). Pour 300 ml chilled milk. If you want thicker shake, use 250 ml milk; for thinner consistency, use 350 ml. Add 4-5 ice cubes.",
      
      "STEP 4 - BLEND PROPERLY: Close the blender lid tightly. Start blending on low speed for 10 seconds to break up the banana and sattu. Then increase to high speed and blend for 45-60 seconds continuously. Stop and check - there should be no lumps of sattu visible, no date or almond chunks, and the shake should be smooth and frothy on top. If you see sattu lumps or chunks, blend for another 15-20 seconds. The shake should be completely smooth with a thick, creamy consistency. The sattu naturally thickens the shake, giving it a protein shake-like texture.",
      
      "STEP 5 - CHECK CONSISTENCY AND TASTE: Pour a little shake in a glass to check. The consistency should be thick like a milkshake - it should coat the back of a spoon and drip off slowly, not pour off in a stream. Taste it - it should be naturally sweet from banana and honey, with a nutty flavor from sattu, and aromatic from cardamom. Adjust sweetness by adding more honey if needed. If too thick, add 2-3 tablespoon more milk and blend for 10 seconds. If too thin, add 1 more tablespoon sattu and blend.",
      
      "STEP 6 - SERVE: Pour into tall glasses immediately. The shake will have a natural foam on top. Optionally garnish with a sprinkle of chopped almonds, a pinch of cardamom powder, or a few saffron strands on top. Serve immediately while cold. Sattu shakes are best consumed fresh as the sattu continues to absorb liquid and thickens if left standing.",
      
      "STEP 7 - CONSUMPTION TIPS: Drink this shake slowly, don't gulp it down. Sattu is very filling and protein-rich, so one glass (300-350 ml) keeps you full for 3-4 hours. Best consumed as a mid-morning snack (around 11 AM) or post-workout. Don't drink this late at night as it's quite filling. For weight gain, have this daily as an additional snack between meals."
    ],
    image_url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },

  // WEIGHT LOSS DETAILED RECIPES (4 more)
  {
    title: "Palak Tofu Scramble",
    description: "Low-calorie protein-rich scrambled tofu with spinach and spices",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 220,
    protein: 18,
    carbs: 12,
    fats: 12,
    fiber: 6,
    access_level: "guest",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "low carb", "vegan friendly"],
    ingredients: [
      "200 gm firm tofu (paneer alternative)",
      "200 gm fresh spinach (palak), chopped",
      "1 medium onion, finely chopped",
      "2 medium tomatoes, finely chopped",
      "1 teaspoon ginger paste",
      "2 green chillies, slit",
      "1/2 teaspoon turmeric powder",
      "1/2 teaspoon cumin seeds",
      "1/2 teaspoon garam masala",
      "1 tablespoon olive oil",
      "Salt to taste",
      "1/4 teaspoon black pepper",
      "Lemon juice, 1 teaspoon"
    ],
    instructions: [
      "STEP 1 - PREPARE TOFU: Remove 200 gm firm tofu from its package. Tofu comes packed in water, so drain all the water out. Pat the tofu block completely dry using paper towels or a clean kitchen cloth - press gently but firmly to absorb as much moisture as possible. The drier your tofu, the better it will crumble and absorb flavors. Place the dried tofu block on a cutting board. Using your clean hands, crumble the tofu into small pieces, roughly the size of scrambled eggs (about pea-sized crumbs). Don't mash it into paste; you want distinct, small crumbles. Some bigger chunks (5-7mm) are fine and give nice texture. Set aside in a bowl.",
      
      "STEP 2 - PREPARE SPINACH: Wash 200 gm fresh spinach leaves thoroughly under running water at least 3-4 times - spinach tends to have soil and grit. Fill a large bowl with water, add spinach and swish around, drain, repeat until water is clear. Remove any thick stems and discolored yellow leaves. Stack several leaves together, roll them tightly like a cigar, and slice across the roll to create thin ribbons (this technique is called chiffonade). This makes the spinach easier to eat and cooks faster. Alternatively, roughly chop into 1-inch pieces. Keep in a colander to drain any excess water.",
      
      "STEP 3 - COOK ONIONS: Heat 1 tablespoon olive oil in a wide non-stick pan or kadhai on medium heat for 30 seconds. Add 1/2 teaspoon cumin seeds. They will sizzle and splutter within 5-10 seconds, releasing a nutty aroma. Immediately add finely chopped onions and 2 slit green chillies. Increase heat to medium-high. Sauté the onions, stirring frequently, for 5-6 minutes. The onions will first release water and become soft and translucent. Continue cooking until the water evaporates and onions turn light golden brown at the edges. This browning adds sweetness and depth to the dish.",
      
      "STEP 4 - ADD AROMATICS AND TOMATOES: Add 1 teaspoon ginger paste to the onions. Stir for 30 seconds - the raw smell will disappear and it will become fragrant. Add finely chopped tomatoes and 1/2 teaspoon turmeric powder. Mix well. Cook for 4-5 minutes, stirring occasionally and pressing the tomatoes with your spatula to help them break down. The tomatoes are ready when they become completely soft and mushy, their skins separate, and the mixture starts to come together as a thick paste. You should see tiny oil droplets separating at the edges. Add salt to taste and mix.",
      
      "STEP 5 - ADD SPINACH: Add all the chopped spinach to the pan at once. Don't worry if it looks like too much - spinach reduces dramatically when cooked, to about 1/4 of its raw volume. Initially the pan will be very full. Stir well to mix spinach with the tomato-onion masala. Cover the pan with a lid and let it cook on medium heat for 3 minutes. The steam will wilt the spinach. After 3 minutes, remove lid - you'll see the spinach has wilted and reduced significantly. Stir well, breaking up any clumps. The spinach should be soft and bright green. Cook uncovered for another 2 minutes to evaporate any water released by the spinach. The mixture should look like a thick spinach masala, not watery.",
      
      "STEP 6 - ADD CRUMBLED TOFU: Add all the crumbled tofu to the spinach mixture. Mix gently but thoroughly, ensuring the tofu crumbles get coated with the green spinach masala. The tofu will absorb the colors and flavors - you'll see it turning yellow-green from the turmeric and spinach. Add 1/2 teaspoon garam masala and 1/4 teaspoon black pepper. Mix well. Cook on medium heat for 5-6 minutes, stirring every minute. The tofu needs this time to absorb all the flavors. As it cooks, the tofu will firm up slightly and develop more texture. Taste a piece - it should be flavorful and slightly firm, not bland or mushy.",
      
      "STEP 7 - FINAL SEASONING: Turn off the heat. Taste and adjust salt if needed. Squeeze 1 teaspoon fresh lemon juice over the scramble and give one final gentle mix. The lemon juice brightens all the flavors and cuts through the richness. The final dish should look like scrambled eggs but green from the spinach, with visible tofu crumbles mixed throughout.",
      
      "STEP 8 - SERVE: Serve hot immediately. This dish pairs perfectly with 1-2 slices of whole wheat toast (or multigrain bread) for a complete, filling breakfast. You can also serve it with roti or as a side dish. One serving (half the recipe) gives you about 18g protein, keeps you full for hours, but is only 220 calories - perfect for weight loss. The high protein and fiber content helps control hunger throughout the morning."
    ],
    image_url: "https://images.unsplash.com/photo-1628095936007-9eb0b2e3cd01?w=800&q=80"
  },

  {
    title: "Grilled Fish Tikka with Mint Chutney",
    description: "Tandoori-style grilled fish with herbs and yogurt marinade",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 130,
    cook_time: 20,
    calories: 280,
    protein: 38,
    carbs: 8,
    fats: 10,
    fiber: 2,
    access_level: "logged_in",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "low carb", "fish"],
    ingredients: [
      "500 gm boneless fish fillets (basa, pomfret, or salmon)",
      "For marinade: 100 gm hung curd",
      "1 tablespoon ginger-garlic paste",
      "1 tablespoon lemon juice",
      "1 teaspoon Kashmiri red chilli powder",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon garam masala",
      "1 teaspoon kasuri methi, crushed",
      "1 teaspoon carom seeds (ajwain)",
      "1 tablespoon mustard oil",
      "Salt to taste",
      "For mint chutney: 1 cup fresh mint leaves",
      "1/2 cup fresh coriander leaves",
      "2 green chillies",
      "1 tablespoon lemon juice",
      "1/4 teaspoon black salt",
      "1 teaspoon roasted cumin powder"
    ],
    instructions: [
      "STEP 1 - PREPARE HUNG CURD (2 HOURS BEFORE): Take 150 gm plain thick curd in a clean muslin cloth or thin kitchen towel. Gather all corners and tie tightly. Hang this over a bowl using a wooden spoon placed across the bowl rim. Let it hang for 2 hours in a cool place (not in direct sun). Water will drip out leaving thick, creamy hung curd - about 100 gm. This thick consistency is important for the marinade to stick to fish.",
      
      "STEP 2 - SELECT AND CLEAN FISH: Choose fresh fish fillets - they should smell like the ocean (fresh, slightly salty), not fishy or sour. The flesh should be firm and spring back when pressed, not mushy. Eyes (if whole fish) should be clear, not cloudy. For this recipe, boneless fillets work best - basa (mild taste, affordable), pomfret (traditional choice, flavorful), or salmon (rich, high in omega-3). You need 500 gm total. Rinse the fish fillets gently under cold running water for 20-30 seconds to remove any scales or residue. Pat completely dry with paper towels - this is crucial. Wet fish won't absorb marinade properly and will steam instead of grill. Cut fillets into 2-inch square pieces or 3-inch long strips. Uniform size ensures even cooking.",
      
      "STEP 3 - APPLY LEMON-SALT TREATMENT: This step reduces the fishy smell. Place fish pieces in a wide bowl. Squeeze juice of half a lemon over all pieces. Sprinkle 1/2 teaspoon salt. Using your hands, gently rub the lemon and salt into each piece. Let it sit for 10 minutes. The acid in lemon starts breaking down any fishy odors. After 10 minutes, rinse quickly under cold water and pat dry again thoroughly with paper towels.",
      
      "STEP 4 - PREPARE MARINADE: In a mixing bowl, add 100 gm hung curd. Add 1 tablespoon fresh ginger-garlic paste (fresh is much better than packaged), 1 tablespoon lemon juice, 1 teaspoon Kashmiri red chilli powder (for color without too much heat - if you like spicy, use regular chilli powder), 1/2 teaspoon turmeric powder, 1 teaspoon garam masala, 1 teaspoon kasuri methi (crush it between your palms while adding - this releases its aroma), 1 teaspoon carom seeds (ajwain - these aid digestion and reduce fishiness), 1 tablespoon mustard oil (traditional for tandoori dishes - it has a pungent flavor when raw but becomes mild when cooked), and salt to taste. Whisk everything together vigorously for 1-2 minutes until you get a smooth, thick, bright orange-red paste. The marinade should be thick enough to coat a spoon. Taste it - it should be tangy, salty, and spicy. Remember fish is delicate, so the marinade should be well-seasoned.",
      
      "STEP 5 - MARINATE FISH: Add fish pieces to the marinade. Using very gentle hands (fish is delicate and can break), coat each piece thoroughly on all sides. Make sure every piece is completely covered with the red marinade - no white fish should be visible. Fish doesn't need as long marination as chicken. Cover the bowl with cling film and refrigerate for minimum 1 hour, maximum 2 hours. If you marinate too long (over 3 hours), the acid in yogurt and lemon will start 'cooking' the fish and make it mushy. Remove from refrigerator 15 minutes before cooking to bring to room temperature.",
      
      "STEP 6 - PREPARE MINT CHUTNEY: While fish marinates, make the chutney. Wash 1 cup fresh mint leaves and 1/2 cup fresh coriander leaves in cold water. Remove thick stems. Add to a mixer grinder jar along with 2 green chillies (adjust to taste), 1 tablespoon lemon juice, 1/4 teaspoon black salt, 1 teaspoon roasted cumin powder, and 2-3 tablespoon water. Grind to a smooth paste. Transfer to a bowl and refrigerate until serving. The chutney should be smooth, bright green, and have a balance of tangy, spicy, and herby flavors.",
      
      "STEP 7 - PREHEAT GRILL: If using oven grill: Preheat to 220°C (425°F) for 10 minutes. Line a baking tray with aluminum foil and lightly grease the foil with oil. Place a wire rack on the tray if you have one (this allows heat circulation). If using stovetop grill pan: Heat the grill pan on high heat for 5 minutes until very hot. Brush lightly with oil. If using outdoor grill or tandoor: Heat until medium-hot (you should be able to hold your hand 6 inches above for only 3-4 seconds).",
      
      "STEP 8 - GRILL FISH (MOST CRUCIAL STEP): Remove excess marinade from fish pieces by gently scraping with a spoon - there should be a coating but not dripping wet (excess marinade will burn and smoke). Place fish pieces on the greased foil/grill with some space between them. Don't overcrowd. For oven: Grill for 10-12 minutes, flipping once halfway through (at 5-6 minute mark). Fish is done when it flakes easily with a fork and internal temperature reaches 63°C. For stovetop grill pan: Cook for 4-5 minutes on high heat without moving (to get grill marks), then flip carefully using a flat spatula and cook 3-4 more minutes. IMPORTANT: Fish cooks much faster than chicken. Overcooking makes it dry and rubbery. Look for these signs: fish turns opaque (not translucent anymore), develops charred spots on edges, flakes easily when tested with a fork, juices run clear not milky. If using a meat thermometer, internal temp should be 63-65°C (145°F).",
      
      "STEP 9 - REST: Once cooked, transfer fish tikka pieces to a serving plate. Cover loosely with foil and let rest for 2-3 minutes. This allows juices to redistribute. The fish will firm up slightly and become easier to handle.",
      
      "STEP 10 - SERVE: Arrange fish tikka on a serving platter. Garnish with onion rings, lemon wedges, and fresh mint sprigs. Serve hot with the mint chutney on the side. This is a complete meal - high in protein (38g per serving), very low in carbs (only 8g), moderate in healthy fats (10g from fish omega-3 and minimal oil), and only 280 calories. The fish protein keeps you full for hours, perfect for weight loss. Serve with a side salad or grilled vegetables for extra fiber."
    ],
    image_url: "https://images.unsplash.com/photo-1580959375944-356f47bf14c5?w=800&q=80"
  },

  {
    title: "Quinoa Vegetable Upma",
    description: "Protein-rich quinoa cooked South Indian style with vegetables",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 20,
    calories: 260,
    protein: 10,
    carbs: 42,
    fats: 6,
    fiber: 7,
    access_level: "guest",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "gluten free", "filling"],
    ingredients: [
      "150 gm quinoa (white or mixed)",
      "1 medium carrot, diced small",
      "100 gm green beans, chopped",
      "1/2 cup green peas (frozen or fresh)",
      "1 medium onion, chopped",
      "2 green chillies, slit",
      "1 teaspoon mustard seeds",
      "1 teaspoon urad dal",
      "1 teaspoon chana dal",
      "8-10 curry leaves",
      "1/2 teaspoon turmeric powder",
      "1 tablespoon oil",
      "Fresh coriander leaves, chopped",
      "Lemon juice, 1 tablespoon",
      "Salt to taste",
      "350 ml water"
    ],
    instructions: [
      "STEP 1 - RINSE QUINOA THOROUGHLY: This is the most important step. Place 150 gm quinoa in a fine-mesh strainer. Run cold water over it while rubbing the grains gently between your palms. Continue rinsing for 2-3 minutes. Quinoa has a natural coating called saponin which tastes bitter and soapy if not washed off properly. The water will be cloudy and slightly foamy at first. Keep rinsing until the water runs absolutely clear with no foam - this usually takes 2-3 minutes of continuous rinsing. Shake the strainer to drain all water. Let quinoa sit in the strainer for 5 minutes to drain completely. Properly washed and drained quinoa will cook fluffy, not mushy.",
      
      "STEP 2 - PREPARE VEGETABLES: Peel and dice 1 medium carrot into very small cubes (about 5mm size - tiny cubes cook faster and distribute evenly). Wash and chop 100 gm green beans into small pieces (each bean into 4-5 pieces). If using fresh green peas, shell them. If using frozen, no prep needed - just keep them ready. Chop 1 medium onion into small pieces. Having everything chopped and ready (mise en place) makes cooking faster and easier.",
      
      "STEP 3 - TEMPER SPICES: Heat 1 tablespoon oil in a wide, heavy-bottomed pan or kadhai on medium heat. After 30 seconds, add 1 teaspoon mustard seeds. They will start popping and crackling within 5-10 seconds - partially cover with a lid to prevent them from flying everywhere. Once the popping slows down (after 15-20 seconds), add 1 teaspoon urad dal and 1 teaspoon chana dal. Stir continuously. The dals will turn golden brown in 30-40 seconds and smell nutty. Immediately add 8-10 curry leaves - they will crackle and splutter (be careful, step back slightly). This tempering is the foundation of South Indian flavor.",
      
      "STEP 4 - SAUTÉ AROMATICS: Add chopped onions and 2 slit green chillies to the tempering. Sauté on medium-high heat for 3-4 minutes, stirring frequently. The onions will become soft and translucent (slightly see-through) first, then start turning light golden at the edges. Don't brown them too much - we want them soft, not crispy.",
      
      "STEP 5 - COOK VEGETABLES: Add diced carrots to the pan first (they take longest to cook). Stir for 2 minutes. Add chopped beans and green peas. Add 1/2 teaspoon turmeric powder and salt to taste. Mix everything well so vegetables are coated with turmeric. Add 2-3 tablespoon water, stir, cover the pan with a lid, and cook on medium heat for 5 minutes. This steam-cooks the vegetables. After 5 minutes, remove lid and stir. The vegetables should be tender but still have a slight bite (not mushy). Carrots should be easy to pierce with a fork. If still hard, cover and cook for another 2 minutes.",
      
      "STEP 6 - TOAST QUINOA: Add the rinsed and drained quinoa to the cooked vegetables. Mix gently but thoroughly, ensuring quinoa is evenly distributed among the vegetables. Let the quinoa toast in the pan for 2 minutes on medium heat, stirring every 30 seconds. This toasting step is optional but recommended - it removes any excess moisture from washing and gives quinoa a slightly nutty flavor. The quinoa will look slightly dry and separate.",
      
      "STEP 7 - ADD WATER AND COOK: Add 350 ml water to the pan (the ratio is about 2.3:1 water to quinoa for upma-style consistency - less water than regular quinoa cooking). Increase heat to high and bring to a boil. This takes 2-3 minutes. You'll see rapid bubbles breaking on the surface. Once it's boiling, give one good stir, reduce heat to low, and cover tightly with a lid. Cook for 15 minutes without opening the lid. Set a timer. Opening the lid releases steam and disrupts cooking. After 15 minutes, turn off the heat. Let it rest covered for 5 more minutes. This resting time allows the quinoa to absorb any remaining water and become fluffy.",
      
      "STEP 8 - FLUFF AND SEASON: After resting, remove the lid. You should see fluffy quinoa with no water at the bottom. Each quinoa grain should be translucent with a tiny white ring around it (the germ) - this is the sign of perfectly cooked quinoa. Using a fork (not a spoon - fork keeps it fluffy), gently fluff the quinoa upma from bottom to top, separating the grains. Add 1 tablespoon fresh lemon juice and 2 tablespoon chopped fresh coriander leaves. Gently mix. Taste and adjust salt if needed.",
      
      "STEP 9 - SERVE: Serve hot immediately. Quinoa upma can be enjoyed on its own as a light dinner, or served with coconut chutney or raita. It's filling despite being low in calories because quinoa is high in protein and fiber, which keep you satisfied for hours. One serving (about 250-300 gm) has only 260 calories but 10 gm protein and 7 gm fiber - perfect for weight loss. Store leftovers in an airtight container in the refrigerator for up to 2 days. Reheat in a pan with a splash of water or in microwave."
    ],
    image_url: "https://images.unsplash.com/photo-1605433246995-23f532d1e001?w=800&q=80"
  },

  {
    title: "Sprouts Chaat",
    description: "Crunchy protein-rich mixed sprouts with tangy spices",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 10,
    calories: 180,
    protein: 12,
    carbs: 28,
    fats: 3,
    fiber: 8,
    access_level: "guest",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "high fiber", "raw food"],
    ingredients: [
      "200 gm mixed sprouts (moong, chana, matki)",
      "1 medium cucumber, finely diced",
      "1 medium tomato, finely diced",
      "1 small onion, finely chopped",
      "1 boiled potato, diced (optional, for texture)",
      "2 tablespoon roasted peanuts, crushed",
      "Fresh coriander leaves, 3 tablespoon chopped",
      "2 tablespoon lemon juice",
      "1 teaspoon chaat masala",
      "1/2 teaspoon roasted cumin powder",
      "1/2 teaspoon black salt",
      "1/4 teaspoon black pepper",
      "1 green chilli, finely chopped",
      "Sev (crispy chickpea noodles) for garnish, optional",
      "Salt to taste"
    ],
    instructions: [
      "STEP 1 - PREPARE SPROUTS (DONE 2 DAYS BEFORE): To make fresh sprouts at home: Take 70 gm each of whole moong (green gram), kala chana (black chickpeas), and matki (moth beans) - total 210 gm mixed. Wash them thoroughly 3-4 times and soak in plenty of water (3 times the volume of lentils) overnight (8-12 hours). Next morning, drain all water completely using a strainer. Rinse once with fresh water and drain again. Take a clean, damp cotton cloth and spread the soaked lentils on it. Cover with another damp cloth. Keep this in a warm, dark place (like inside a cabinet or covered container). Every 8-12 hours, sprinkle some water on the cloth to keep it moist (not dripping wet). After 24-36 hours, you'll see tiny white tails emerging from the lentils - these are sprouts! They're ready when the tails are 5-10mm long. Rinse the sprouts thoroughly in cold water and drain completely. Store in refrigerator in an airtight container for up to 3-4 days. OR buy ready-made fresh sprouts from the market.",
      
      "STEP 2 - STEAM SPROUTS (IMPORTANT FOR DIGESTION): Raw sprouts can be hard to digest for some people and may cause bloating. Light steaming makes them easier to digest while retaining most nutrients. Bring 2 cups water to boil in a pot. Place a steamer basket or colander over the boiling water (it shouldn't touch the water). Add 200 gm mixed sprouts to the steamer. Cover and steam for 5-7 minutes. They should be warm and slightly softened but still crunchy, not mushy. The sprout tails should still be firm. Turn off heat, remove from steamer, and spread on a plate to cool to room temperature. Alternatively, you can blanch them: Boil 3 cups water with 1/4 teaspoon salt. Add sprouts and boil for exactly 2 minutes. Drain immediately in a colander and rinse with cold water to stop cooking. Both methods work - steaming retains slightly more nutrients.",
      
      "STEP 3 - PREPARE VEGETABLES: While sprouts are cooling, wash and finely dice 1 medium cucumber into tiny cubes (about 5mm) - remove the seedy center if cucumber is very watery. Dice 1 medium tomato similarly into small cubes. Finely chop 1 small onion. If using boiled potato (optional - it adds bulk and makes the chaat more filling), peel and dice 1 medium potato that was boiled until fork-tender, then cooled. Finely chop fresh coriander leaves. Finely chop 1 green chilli (remove seeds if you want less heat).",
      
      "STEP 4 - ROAST PEANUTS (IF USING RAW): If using raw peanuts, heat a small pan on low heat. Add 2 tablespoon raw peanuts (without skin). Dry roast for 5-7 minutes, stirring constantly, until they turn golden brown and smell nutty. You might hear some crackling sounds. Let them cool, then crush them roughly with a rolling pin or in a mortar-pestle. You want coarse pieces, not powder. If using store-bought roasted peanuts, just crush them. Roasted peanuts add a lovely crunch and nutty flavor.",
      
      "STEP 5 - MAKE CHAAT MASALA MIX: In a small bowl, combine 1 teaspoon chaat masala, 1/2 teaspoon roasted cumin powder, 1/2 teaspoon black salt, 1/4 teaspoon black pepper, and regular salt to taste. Mix well. This pre-mixed spice blend ensures even seasoning.",
      
      "STEP 6 - ASSEMBLE CHAAT: In a large mixing bowl, add the cooled steamed sprouts. Add diced cucumber, tomato, onion, boiled potato (if using), and chopped green chilli. Add the prepared spice mix. Add 2 tablespoon fresh lemon juice (adjust to your taste - some like it very tangy). Add chopped coriander leaves. Using a large spoon or clean hands, toss everything together thoroughly for 1-2 minutes. Make sure the spices and lemon juice coat all the sprouts and vegetables evenly. Let it sit for 2-3 minutes - this allows the sprouts to absorb the flavors.",
      
      "STEP 7 - TASTE AND ADJUST: Taste the chaat. The flavor should be a balance of tangy (from lemon and chaat masala), spicy (from chillies and black pepper), salty, and slightly sweet (from vegetables). Adjust: If too bland, add more chaat masala and salt. If not tangy enough, add more lemon juice. If too sour, add a tiny pinch of sugar or more veggies. The beauty of chaat is customization to your taste.",
      
      "STEP 8 - ADD FINAL TOPPINGS: Just before serving, add the crushed roasted peanuts and toss once. If you want to make it more indulgent (but less healthy), you can add 1-2 tablespoon sev (crispy chickpea flour noodles) on top. However, for strict weight loss, skip the sev as it adds unnecessary calories.",
      
      "STEP 9 - SERVE: Transfer to serving bowls immediately. Sprouts chaat is best eaten fresh - if left too long, the vegetables release water and make it soggy. Garnish with extra coriander leaves and a lemon wedge on the side. This chaat is incredibly filling despite being only 180 calories per serving. The high protein (12g) and fiber (8g) content keeps you satisfied for 3-4 hours. It's perfect as an evening snack, lunch box option, or light dinner. Can be stored in refrigerator for 1 day maximum."
    ],
    image_url: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800&q=80"
  },

  {
    title: "Green Tea Poached Chicken with Steamed Broccoli",
    description: "Tender chicken breast poached in green tea with garlic and ginger",
    meal_type: "dinner",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 15,
    cook_time: 25,
    calories: 240,
    protein: 36,
    carbs: 10,
    fats: 6,
    fiber: 4,
    access_level: "logged_in",
    goal_category: "weight_loss",
    tags: ["weight loss", "high protein", "low calorie", "antioxidant rich"],
    ingredients: [
      "400 gm chicken breast (2 large pieces)",
      "3 green tea bags or 2 tablespoon loose green tea leaves",
      "3 cups (750 ml) water",
      "1 inch ginger, sliced",
      "4-5 garlic cloves, crushed",
      "1 star anise (optional)",
      "2 bay leaves",
      "1/2 teaspoon black peppercorns",
      "Salt to taste",
      "For broccoli: 300 gm broccoli florets",
      "1 teaspoon olive oil",
      "1/2 teaspoon garlic powder",
      "Lemon juice, 1 tablespoon",
      "Red chilli flakes (optional)",
      "For serving: soy sauce, chilli sauce"
    ],
    instructions: [
      "STEP 1 - PREPARE CHICKEN: Rinse 400 gm chicken breast under cold running water and pat completely dry with paper towels. Trim off any visible fat using a sharp knife - chicken breast should be lean with no fatty portions. Check for any remaining feather quills or tendons and remove them. Each breast will be quite thick (about 3-4 cm). For even poaching, we need to butterfly them: Place one chicken breast on cutting board. Put your non-knife hand flat on top of the chicken. Using a sharp knife parallel to the cutting board, carefully slice through the middle horizontally, almost but not all the way through (leave about 1 cm connected on one side). Open it like a book - now you have a thinner, wider piece. Repeat with the second breast. Butterflied chicken cooks evenly and faster. Season both sides of each piece lightly with salt and a pinch of black pepper.",
      
      "STEP 2 - PREPARE POACHING LIQUID: In a wide, shallow pan or deep skillet (large enough to fit both chicken pieces lying flat), add 750 ml water. Add 1 inch ginger sliced into thin rounds, 4-5 crushed garlic cloves (hit them with the side of your knife to crush), 2 bay leaves, 1/2 teaspoon black peppercorns, and 1 star anise if using (adds a subtle sweet-spicy flavor). Place the pan on high heat and bring to a rolling boil (large bubbles breaking on surface). This takes about 5-6 minutes. Once boiling, add 3 green tea bags or 2 tablespoon loose green tea leaves. Turn off the heat immediately - don't let tea boil as it becomes bitter. Let the tea steep for 4-5 minutes. The water will turn a light golden-brown color and you'll smell the aromatic tea. Remove and discard tea bags/strain out loose leaves. Your poaching liquid is ready - it should smell fragrant with hints of ginger, garlic, and tea.",
      
      "STEP 3 - POACH CHICKEN: Bring the flavored tea liquid back to a gentle simmer on medium heat (small bubbles just breaking the surface, not a vigorous boil). Gently slide the chicken breasts into the simmering liquid. The chicken should be mostly submerged - if not, add a bit more hot water. Reduce heat to low. The liquid should barely simmer - you should see occasional tiny bubbles. Too vigorous boiling makes chicken tough and dry. Poach uncovered for 12-15 minutes depending on thickness. Don't move or flip the chicken for the first 8 minutes. After 8 minutes, gently flip each piece using tongs or a spatula. Poach for another 4-7 minutes. DONENESS TEST: Insert a knife in the thickest part - if juices run clear (not pink), it's done. Or use a meat thermometer - internal temperature should be 75°C (165°F). Remove one piece and cut into it - the inside should be white throughout, no pink areas. Once done, turn off heat.",
      
      "STEP 4 - REST CHICKEN: Using tongs or a slotted spoon, carefully transfer poached chicken to a cutting board. Cover loosely with aluminum foil and let it rest for 5 minutes. This resting allows the juices to redistribute throughout the meat, making it tender and juicy. If you cut immediately, all juices will run out. The chicken will firm up slightly as it rests, making it easier to slice.",
      
      "STEP 5 - PREPARE BROCCOLI: While chicken is poaching/resting, prepare broccoli. Wash 300 gm broccoli and cut into medium-sized florets (each about 3-4 cm). Include some stem too - peel the tough outer layer of stem with a vegetable peeler and cut the tender inner stem into rounds. Bring 2 cups water to boil in a pot. Add 1/4 teaspoon salt. Place a steamer basket over the boiling water (water shouldn't touch the basket). Add broccoli florets. Cover and steam for 5-7 minutes. Check at 5 minutes - broccoli should be tender enough to pierce with a fork but still have a bite (bright green, not mushy or olive-green). Overcooked broccoli becomes mushy and loses nutrients. Once done, transfer to a bowl.",
      
      "STEP 6 - SEASON BROCCOLI: While broccoli is still hot, drizzle 1 teaspoon olive oil over it. Sprinkle 1/2 teaspoon garlic powder, a pinch of salt, and red chilli flakes if using. Toss gently to coat. Squeeze 1/2 tablespoon lemon juice over it and toss again. The heat helps distribute the seasonings evenly.",
      
      "STEP 7 - SLICE CHICKEN: After resting, slice the poached chicken breasts. Hold your knife at a 45-degree angle and cut across the grain (perpendicular to the direction of the muscle fibers) into 1 cm thick slices. Cutting against the grain makes the chicken more tender. The chicken should be moist, white throughout, and should not look dry or stringy. If it's too dry, you may have overcooked it slightly - next time, reduce poaching time by 2 minutes.",
      
      "STEP 8 - PLATE AND SERVE: On each serving plate, arrange a bed of steamed broccoli. Place sliced chicken on top or beside the broccoli. Drizzle the remaining lemon juice over the chicken. Optionally, serve with a small side of low-sodium soy sauce or chilli sauce for dipping (1 tablespoon max as these are high in sodium). The green tea-poached chicken will have a very subtle tea flavor and be incredibly tender and moist. This meal is extremely low in calories (240 calories per serving) but high in protein (36g) and fiber (4g), keeping you full for hours. Perfect for a light, healthy dinner for weight loss."
    ],
    image_url: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800&q=80"
  },

  // ============================================
  // MAINTENANCE CATEGORY RECIPES
  // Balanced macros for maintaining current weight
  // ============================================

  // MAINTENANCE - BREAKFAST (VEG)
  {
    title: "Masala Oats Upma with Mixed Vegetables",
    description: "Nutritious South Indian style oats upma loaded with vegetables",
    meal_type: "breakfast",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 10,
    cook_time: 15,
    calories: 320,
    protein: 12,
    carbs: 48,
    fats: 10,
    fiber: 7,
    access_level: "guest",
    goal_category: "maintenance",
    tags: ["maintenance", "balanced", "fiber rich", "South Indian"],
    ingredients: [
      "80 gm rolled oats (not instant oats)",
      "1 tablespoon oil (preferably coconut or sesame)",
      "1/2 teaspoon mustard seeds",
      "1/2 teaspoon cumin seeds",
      "1/2 teaspoon urad dal",
      "8-10 curry leaves",
      "1 medium onion, finely chopped",
      "1 green chilli, slit lengthwise",
      "1/2 inch ginger, grated",
      "1/4 cup green peas (fresh or frozen)",
      "1/4 cup carrot, finely diced",
      "1/4 cup beans, finely chopped",
      "1/4 cup capsicum, finely diced",
      "2 cups water",
      "1/2 teaspoon turmeric powder",
      "Salt to taste",
      "Fresh coriander leaves, 2 tablespoon chopped",
      "1 tablespoon lemon juice",
      "For tempering: 1/4 teaspoon garam masala (optional)"
    ],
    instructions: [
      "**STEP 1 - DRY ROAST OATS:** Heat a heavy-bottomed pan on medium heat for 1 minute until hot. Add 80 gm rolled oats (use thick rolled oats, not instant oats as they'll become mushy). Dry roast the oats for 4-5 minutes, stirring constantly with a spatula. You'll notice:\n• After 2 minutes: oats will start releasing a nutty aroma\n• After 4 minutes: oats will turn slightly golden and feel lighter\n• Be careful not to burn - if they start browning too much or smell burnt, reduce heat\nOnce roasted, transfer oats to a bowl and set aside. The roasting step is crucial - it prevents the oats from becoming sticky and gives a nice texture.",

      "**STEP 2 - PREPARE VEGETABLES:** While oats are roasting, prepare all vegetables (this saves time):\n• Finely chop 1 medium onion into small pieces (2-3mm)\n• Dice carrot, beans, and capsicum into tiny cubes (3-4mm) - small pieces cook faster and mix better\n• If using frozen peas, no need to thaw - use directly\n• Grate ginger on the finest side of grater\n• Slit green chilli lengthwise but don't chop - this adds flavor without too much heat\nKeep all vegetables ready on a plate.",

      "**STEP 3 - MAKE TEMPERING (TADKA):** In the same pan, heat 1 tablespoon oil on medium heat for 30 seconds. Test if oil is hot enough: drop one mustard seed - if it splutters immediately, oil is ready. Add in this order:\n• 1/2 teaspoon mustard seeds → wait 10 seconds until they crackle and pop\n• 1/2 teaspoon cumin seeds → wait 5 seconds until they sizzle and darken slightly\n• 1/2 teaspoon urad dal → stir for 15-20 seconds until dal turns golden (not brown)\n• 8-10 curry leaves → be careful, they splutter! Stand back slightly\nThe kitchen should smell wonderfully aromatic. The tempering should take about 45 seconds total.",

      "**STEP 4 - SAUTÉ AROMATICS:** Immediately add chopped onions to the tempering. Stir and sauté on medium heat for 3-4 minutes until:\n• Onions turn translucent (you can see through them)\n• Edges start turning light golden\n• Raw smell disappears and you smell a sweet aroma\nAdd grated ginger and slit green chilli. Sauté for 30 seconds until the raw ginger smell goes away. Add 1/2 teaspoon turmeric powder and stir for 5 seconds.",

      "**STEP 5 - COOK VEGETABLES:** Add all the chopped vegetables (carrot, beans, peas, capsicum) to the pan. Stir well to coat vegetables with the spices and tempering. Add salt to taste (approximately 3/4 teaspoon). Sauté vegetables on medium heat for 4-5 minutes, stirring occasionally:\n• After 2-3 minutes: vegetables will start softening\n• After 4-5 minutes: carrots and beans should be 70% cooked (tender but with a slight bite)\nDon't overcook - vegetables should retain some crunch.",

      "**STEP 6 - ADD WATER AND BOIL:** Pour 2 cups water into the pan. Increase heat to high. Stir everything together and bring to a rolling boil. This will take 3-4 minutes. You'll see:\n• Large bubbles breaking vigorously on the surface\n• Steam rising\n• Water should be at a vigorous boil, not just simmering\nTaste the water - it should be slightly salty (like soup). If bland, add a pinch more salt now.",

      "**STEP 7 - ADD ROASTED OATS:** Once water is boiling vigorously, reduce heat to low. Add the roasted oats gradually while stirring continuously with one hand. Keep stirring for 2-3 minutes without stopping:\n• Oats will absorb water immediately\n• The mixture will start thickening\n• After 2 minutes, it should resemble a thick porridge consistency\n• If too thick, add 2-3 tablespoon hot water and stir\n• If too watery, cook for 1-2 more minutes\nStirring prevents lumps from forming.",

      "**STEP 8 - FINAL COOK:** Cover the pan with a lid and let it cook on low heat for 3-4 minutes. The low, gentle heat allows:\n• Oats to fully absorb moisture and soften completely\n• Vegetables to cook through\n• Flavors to meld together\nAfter 3 minutes, open lid and check - oats should be completely soft (not chewy), vegetables should be tender. If oats are still chewy, add 2 tablespoon water, cover, and cook 2 more minutes.",

      "**STEP 9 - FINISHING TOUCHES:** Turn off heat. Add:\n• 2 tablespoon freshly chopped coriander leaves\n• 1 tablespoon lemon juice\n• Optional: 1/4 teaspoon garam masala for extra warmth\nFluff the upma gently with a fork to separate the oats and mix the ingredients. Let it rest covered for 2 minutes - this makes it fluffier.",

      "**STEP 10 - SERVE:** Transfer to serving bowls. The upma should be:\n• Fluffy and grainy (not mushy or sticky)\n• Each oat grain separate and visible\n• Moist but not watery\n**SERVING SUGGESTIONS:**\n• Serve hot with coconut chutney or plain yogurt on the side\n• Pairs well with a cup of chai or filter coffee\n• Can be stored in refrigerator for 1 day - reheat with 1-2 tablespoon water\n\n**NUTRITION & BENEFITS:** This balanced breakfast provides 320 calories with good macros (12g protein, 48g carbs, 10g fat) and high fiber (7g). Perfect for maintaining weight - not too heavy, not too light. The oats provide sustained energy, vegetables add vitamins and minerals, and the spices aid digestion. You'll feel satisfied for 4-5 hours without energy crashes."
    ],
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
  },

  // MAINTENANCE - LUNCH (NON-VEG)
  {
    title: "Grilled Tandoori Chicken with Jeera Rice and Raita",
    description: "Perfectly marinated tandoori chicken with cumin rice and cooling cucumber raita",
    meal_type: "lunch",
    diet_type: "non_veg",
    difficulty: "Medium",
    prep_time: 120,
    cook_time: 35,
    calories: 480,
    protein: 38,
    carbs: 52,
    fats: 12,
    fiber: 3,
    access_level: "logged_in",
    goal_category: "maintenance",
    tags: ["maintenance", "high protein", "balanced", "Indian classic"],
    ingredients: [
      "For chicken: 400 gm chicken (2 leg quarters or 4 drumsticks)",
      "200 gm thick yogurt (hung curd preferred)",
      "1 tablespoon ginger-garlic paste",
      "1 tablespoon lemon juice",
      "1 teaspoon Kashmiri red chilli powder",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon garam masala",
      "1 teaspoon coriander powder",
      "1/2 teaspoon cumin powder",
      "1/4 teaspoon black pepper",
      "2 tablespoon mustard oil",
      "Salt to taste",
      "For rice: 100 gm basmati rice",
      "1 teaspoon cumin seeds",
      "1 teaspoon ghee",
      "2 cups water",
      "For raita: 150 gm yogurt",
      "1/2 cucumber, grated",
      "1/4 teaspoon roasted cumin powder"
    ],
    instructions: [
      "**STEP 1 - PREPARE CHICKEN (2 HOURS BEFORE COOKING):** Wash 400 gm chicken pieces under cold running water. Pat completely dry with paper towels - this is important as moisture prevents marinade from sticking. Using a sharp knife, make 3-4 deep cuts (about 1 cm deep) on each chicken piece:\n• For drumsticks: make diagonal slashes across the meaty part\n• For thighs: make 4 deep cuts in a criss-cross pattern\n**WHY?** These cuts allow marinade to penetrate deep inside, flavoring the meat thoroughly and helping it cook faster and more evenly. Place chicken in a large bowl.",

      "**STEP 2 - PREPARE HUNG CURD:** If using regular yogurt, we need to remove excess water to make it thick (hung curd). Take 200 gm yogurt and place it in a muslin cloth or clean thin cotton cloth. Tie the corners and hang it over a bowl in the refrigerator for 30-45 minutes. The liquid (whey) will drip out, leaving thick, creamy hung curd. After 45 minutes, you'll have approximately 150 gm hung curd with a thick, cream cheese-like consistency. If you're using Greek yogurt or already thick yogurt, skip this step.",

      "**STEP 3 - MAKE MARINADE:** In a mixing bowl, combine:\n• 150 gm hung curd\n• 1 tablespoon ginger-garlic paste (freshly made is best)\n• 1 tablespoon lemon juice\n• 1 teaspoon Kashmiri red chilli powder (for color, not heat)\n• 1/2 teaspoon turmeric powder\n• 1 teaspoon garam masala\n• 1 teaspoon coriander powder\n• 1/2 teaspoon cumin powder\n• 1/4 teaspoon black pepper\n• Salt to taste (approximately 1 teaspoon)\n• 2 tablespoon mustard oil (authentic tandoori flavor - can use regular oil if unavailable)\nWhisk everything together vigorously for 1-2 minutes until you have a smooth, thick, orange-red marinade with no lumps.",

      "**STEP 4 - MARINATE CHICKEN:** Pour the marinade over the chicken pieces. Using your hands (wear gloves if preferred), massage the marinade into the chicken:\n• Rub it all over each piece\n• Push marinade into the cuts you made\n• Coat evenly - every part should be covered\nCover the bowl with plastic wrap or transfer to a ziplock bag. Refrigerate for minimum 2 hours, maximum 24 hours. The longer it marinates, the more flavorful and tender it becomes. Remove from fridge 30 minutes before cooking to bring to room temperature.",

      "**STEP 5 - PREPARE JEERA RICE:** Wash 100 gm basmati rice in cold water 3-4 times until water runs clear - this removes excess starch and prevents sticky rice. Soak rice in fresh water for 20 minutes, then drain completely using a strainer. In a heavy-bottomed pot, heat 1 teaspoon ghee on medium heat. Add 1 teaspoon cumin seeds - they should sizzle immediately. Let them splutter and turn golden brown (20-30 seconds). Add the drained rice and gently stir for 1 minute to coat rice with ghee and cumin. Add 2 cups water and salt to taste. Bring to a boil on high heat, then reduce to lowest heat, cover tightly, and cook for 12-15 minutes until rice is fluffy. Turn off heat and let it rest covered for 5 minutes. Fluff with fork before serving.",

      "**STEP 6 - MAKE CUCUMBER RAITA:** While rice is cooking, grate 1/2 cucumber using the large holes of a grater. Squeeze the grated cucumber firmly between your palms to remove excess water - this prevents watery raita. In a bowl, whisk 150 gm fresh yogurt until smooth and creamy. Add the squeezed cucumber, 1/4 teaspoon roasted cumin powder, salt to taste, and a pinch of black pepper. Mix well. Refrigerate until serving - cold raita is refreshing with hot tandoori chicken.",

      "**STEP 7 - GRILL CHICKEN (OVEN METHOD):** Preheat your oven to 220°C (430°F) for 10 minutes. Line a baking tray with aluminum foil and place a wire rack on top (this allows heat circulation around chicken). Arrange marinated chicken pieces on the rack with space between them. Don't overcrowd. Place tray in the middle rack of oven. Grill for 25-30 minutes:\n• After 15 minutes: chicken will start getting golden-brown char marks\n• At 15 minutes: open oven, brush chicken with 1 teaspoon oil or ghee, and turn pieces over\n• Continue grilling for 10-15 more minutes\n• Chicken is done when: juices run clear (not pink), internal temperature is 75°C, and outside has beautiful charred spots\nIf you don't have oven, use stovetop grill pan or gas tandoor.",

      "**STEP 8 - ALTERNATIVE - STOVETOP GRILL PAN METHOD:** If no oven, heat a grill pan or heavy tawa on high heat for 2 minutes. Reduce to medium-high. Brush pan lightly with oil. Place chicken pieces on hot pan - you should hear a loud sizzle immediately. Cook without moving for 7-8 minutes until bottom develops char marks. Brush top with oil, flip, and cook another 7-8 minutes. Reduce heat to low, cover with a lid, and cook for 10-12 more minutes, flipping once midway, until chicken is cooked through. Total stovetop time: 25-30 minutes.",

      "**STEP 9 - REST CHICKEN:** Once chicken is cooked (no pink inside, charred outside, juices clear), remove from heat. Transfer to a plate and cover loosely with foil. Let it rest for 5 minutes - this allows juices to redistribute, making chicken juicier. Squeeze fresh lemon juice over hot chicken.",

      "**STEP 10 - PLATE AND SERVE:** On each serving plate:\n• Place a portion of hot jeera rice (should be fluffy with visible cumin seeds)\n• Place 1-2 pieces of tandoori chicken beside the rice\n• Serve raita in a small bowl on the side\n• Garnish with lemon wedges and onion rings\n• Optionally, sprinkle chaat masala on chicken for extra tang\n\n**EATING SUGGESTION:** Take a bite of the hot, smoky tandoori chicken, then a spoonful of cumin-scented rice, followed by cooling raita. The combination of temperatures and flavors is perfect.\n\n**NUTRITION & BALANCE:** At 480 calories with 38g protein, 52g carbs, and only 12g fat, this meal is perfectly balanced for maintaining weight. High protein keeps you full, carbs provide energy, and moderate fat ensures satisfaction. The yogurt-based marinade and raita also add probiotics for gut health. This portion will keep you satisfied for 5-6 hours without feeling too heavy."
    ],
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"
  },

  // MAINTENANCE - DINNER (VEG)
  {
    title: "Dal Tadka with Whole Wheat Roti and Mixed Vegetable Sabzi",
    description: "Classic protein-rich dal tadka with perfectly cooked rotis and seasonal vegetables",
    meal_type: "dinner",
    diet_type: "veg",
    difficulty: "Medium",
    prep_time: 20,
    cook_time: 40,
    calories: 420,
    protein: 16,
    carbs: 62,
    fats: 12,
    fiber: 12,
    access_level: "guest",
    goal_category: "maintenance",
    tags: ["maintenance", "balanced", "traditional", "high fiber"],
    ingredients: [
      "For dal: 80 gm mixed dal (equal parts toor, moong, masoor)",
      "2.5 cups water",
      "1/4 teaspoon turmeric powder",
      "Salt to taste",
      "For tadka: 1 tablespoon ghee",
      "1 teaspoon cumin seeds",
      "4-5 garlic cloves, chopped",
      "1 dried red chilli",
      "A pinch of asafoetida (hing)",
      "1 tomato, chopped",
      "Fresh coriander leaves",
      "For roti: 100 gm whole wheat flour",
      "Water as needed",
      "For sabzi: 200 gm mixed vegetables",
      "1 teaspoon oil",
      "Spices: turmeric, cumin, coriander powder"
    ],
    instructions: [
      "**STEP 1 - WASH AND SOAK DAL:** Take 80 gm mixed dal (approximately 25-30 gm each of toor dal, moong dal, and masoor dal - this combination gives best texture and nutrition). Place in a bowl and wash thoroughly:\n• First wash: water will be very cloudy - rinse and drain\n• Second wash: water will be milky - rinse and drain\n• Third wash: water should run almost clear\n**WHY WASH?** Removes dust, impurities, and excess starch. After washing, soak dal in fresh water for 15-20 minutes. This reduces cooking time and makes dal more digestible. While dal soaks, prepare other ingredients.",

      "**STEP 2 - PREPARE VEGETABLE SABZI:** Chop 200 gm mixed seasonal vegetables into small, uniform pieces (about 1 cm cubes):\n• Options: cauliflower, beans, carrots, peas, potatoes, capsicum\n• Keep 2-3 types for variety\nHeat 1 teaspoon oil in a pan on medium heat. Add 1/4 teaspoon cumin seeds - wait until they splutter (10 seconds). Add chopped vegetables, 1/4 teaspoon turmeric, 1/2 teaspoon coriander powder, salt to taste. Stir well. Add 2-3 tablespoon water, cover, and cook on low heat for 10-12 minutes, stirring occasionally until vegetables are tender. Set aside.",

      "**STEP 3 - MAKE ROTI DOUGH:** In a mixing bowl, add 100 gm whole wheat flour (atta) and a pinch of salt. Gradually add water (approximately 50-60 ml) while mixing with your other hand:\n• Add water little by little, not all at once\n• Mix flour and water to form a rough dough\n• Once it comes together, knead with the heel of your palm\n• Knead for 5-6 minutes until dough becomes smooth, soft, and elastic\n• The dough should not stick to your hands\n• Test: press a finger into dough - it should bounce back slowly\nCover with a damp cloth and let rest for 15-20 minutes. Resting makes gluten relax, resulting in softer rotis.",

      "**STEP 4 - PRESSURE COOK DAL:** Drain the soaked dal completely. Transfer to a pressure cooker. Add:\n• 2.5 cups fresh water\n• 1/4 teaspoon turmeric powder\n• Salt to taste (approximately 3/4 teaspoon)\nStir once. Close pressure cooker lid securely. Cook on high heat until you hear the first whistle:\n• **For stovetop cooker:** After first whistle, reduce heat to low and cook for 8-10 minutes (you might hear 2-3 more whistles). Then turn off heat.\n• **For electric cooker:** Set to dal/lentil mode for 10 minutes.\nLet pressure release naturally - don't open until pressure indicator drops completely (10-15 minutes). When you open, dal should be completely soft and mushy - you shouldn't be able to feel individual lentils between your fingers.",

      "**STEP 5 - MASH AND CHECK CONSISTENCY:** Once pressure releases, open cooker carefully. The dal should be well-cooked and soft. Using a wooden spoon or dal masher, mash the dal lightly:\n• It should have a creamy, thick soup consistency\n• Some lentils can be visible, but most should be mashed\n• If too thick (spoon stands upright), add 1/2 cup hot water and stir\n• If too thin (very watery), cook uncovered on low heat for 5 minutes to thicken\nIdeal consistency: pourable but slightly thick, coating the back of a spoon. Keep dal warm on low heat.",

      "**STEP 6 - MAKE TADKA (TEMPERING):** This is the soul of dal tadka. In a small tadka pan or ladle, heat 1 tablespoon ghee on medium heat for 30 seconds. Add in this sequence:\n• A small pinch of asafoetida (hing) → sizzles immediately, adds aroma\n• 1 teaspoon cumin seeds → wait 10 seconds until they turn brown and crackle\n• 4-5 garlic cloves (roughly chopped) → fry for 30-40 seconds until golden (not burnt) and fragrant\n• 1 dried red chilli (broken into 2 pieces) → fry for 5 seconds\n• 1 medium tomato (finely chopped) → add and cook for 2-3 minutes on medium heat until tomatoes become soft and oil separates\nThe tadka should smell incredible - garlicky, spicy, and aromatic. Immediately pour this hot tadka over the cooked dal. You'll hear a sizzling sound - this is good! The hot oil infuses flavor into the dal. Stir well to incorporate. Add chopped fresh coriander leaves. Let dal simmer on low heat for 2-3 minutes so flavors meld.",

      "**STEP 7 - ROLL ROTIS:** Divide the rested dough into 5-6 equal portions (each about the size of a lime). Roll each into a smooth ball between your palms. Dust your work surface and rolling pin with dry flour. Flatten one ball slightly between your palms. Place on floured surface and roll with rolling pin:\n• Start from center and roll outward in all directions\n• Rotate the roti 90 degrees after a few rolls\n• Apply even, gentle pressure\n• Roll into a 6-7 inch diameter circle, about 2mm thick\n• It should be uniformly thin - no thick or thin spots\n• If dough sticks, dust with flour\nRoll all rotis and keep them covered with a cloth.",

      "**STEP 8 - COOK ROTIS:** Heat a flat iron tawa or griddle on medium-high heat for 3-4 minutes until very hot (test by sprinkling water - it should evaporate immediately). Pick up one rolled roti and place gently on the hot tawa:\n• **First side (30-40 seconds):** Don't move the roti. After 20-30 seconds, you'll see small bubbles forming on the surface and the edges will start lifting slightly. The bottom should have light golden spots.\n• **Flip to second side (30-40 seconds):** Use tongs or fingers to flip. Press gently with a clean cloth or spatula in circular motions. You'll see the roti puffing up in sections or completely.\n• **Final puff (optional, 10 seconds):** Using tongs, lift the roti and place directly on the flame (if gas stove) for 5 seconds on each side. It should puff up completely like a balloon.\nBrush cooked roti with 1/4 teaspoon ghee and place in a roti basket or container lined with cloth. Repeat for remaining rotis.",

      "**STEP 9 - FINAL TOUCHES TO DAL:** Taste the dal and adjust:\n• If bland: add more salt and a squeeze of lemon juice\n• If too thick: add hot water to desired consistency\n• For extra flavor: add 1/2 teaspoon garam masala and stir\nThe dal should be aromatic, slightly tangy from tomatoes, and have visible tadka on top.",

      "**STEP 10 - SERVE:** Serve hot with:\n• 2 whole wheat rotis per person (soft, slightly puffed)\n• 1 bowl of dal tadka (should be steaming hot with tadka visible on top)\n• A side of mixed vegetable sabzi\n• Optional: small onion slices, lemon wedges, and green chillies on the side\n\n**HOW TO EAT:** Break a piece of roti, use it to scoop up dal and sabzi together, and eat. The combination is perfect - soft roti, creamy dal, and textured vegetables.\n\n**NUTRITION & BENEFITS:** This traditional Indian dinner provides 420 calories with excellent macros: 16g protein from dal, 62g complex carbs from roti and dal, 12g healthy fats from ghee, and a whopping 12g fiber. Perfect for maintaining weight - it's filling, balanced, and nutritionally complete. The high fiber and protein keep you satisfied through the night without feeling heavy. This meal digests slowly, preventing midnight hunger and maintaining stable blood sugar."
    ],
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
  },

  // MAINTENANCE - SNACK (VEG)
  {
    title: "Whole Wheat Vegetable Sandwich with Mint Chutney",
    description: "Fresh, crunchy vegetable sandwich with protein-rich filling and green chutney",
    meal_type: "snack",
    diet_type: "veg",
    difficulty: "Easy",
    prep_time: 15,
    cook_time: 5,
    calories: 280,
    protein: 10,
    carbs: 42,
    fats: 8,
    fiber: 6,
    access_level: "guest",
    goal_category: "maintenance",
    tags: ["maintenance", "quick", "portable", "fresh"],
    ingredients: [
      "4 slices whole wheat bread",
      "1 medium potato, boiled",
      "1/4 cup cucumber, thinly sliced",
      "1/4 cup tomato, thinly sliced",
      "1/4 cup onion, thinly sliced (optional)",
      "2 tablespoon boiled sweet corn",
      "1 tablespoon paneer, crumbled (optional)",
      "For chutney: 1 cup mint leaves",
      "1/2 cup coriander leaves",
      "1 green chilli",
      "1 tablespoon lemon juice",
      "Salt to taste",
      "For spread: 2 tablespoon butter or ghee",
      "Chaat masala: 1/2 teaspoon",
      "Black salt: 1/4 teaspoon",
      "Black pepper: 1/4 teaspoon"
    ],
    instructions: [
      "**STEP 1 - BOIL POTATO:** Take 1 medium potato (approximately 150 gm), wash thoroughly. Place in a small pot, add enough water to cover potato completely, and add a pinch of salt. Bring to boil on high heat, then reduce to medium and cook for 15-20 minutes:\n• Test doneness: insert a knife - it should slide in easily without resistance\n• Alternatively, pressure cook for 2 whistles\nOnce done, drain water and let potato cool for 10 minutes. Peel the skin (it should come off easily). Mash the boiled potato roughly with a fork in a bowl - leave some small chunks for texture, don't make it completely smooth. Set aside.",

      "**STEP 2 - PREPARE MINT CHUTNEY:** This is the flavor hero of the sandwich. Rinse 1 cup fresh mint leaves and 1/2 cup coriander leaves in cold water. Shake off excess water. In a blender or mixer jar, add:\n• Mint and coriander leaves\n• 1 green chilli (remove seeds if you want less heat)\n• 1 tablespoon lemon juice\n• 1/4 teaspoon cumin powder (optional)\n• Salt to taste\n• 2-3 tablespoon water\nBlend on high speed for 1-2 minutes, scraping down sides once, until you get a smooth, vibrant green paste:\n• Consistency should be thick but spreadable, like ketchup\n• If too thick, add 1 tablespoon water and blend again\n• If too thin, add 1-2 tablespoon roasted peanuts and blend\nTransfer to a small bowl. The chutney should smell fresh, minty, and slightly tangy. This chutney can be stored in refrigerator for 3 days.",

      "**STEP 3 - SLICE VEGETABLES:** Wash all vegetables under cold running water. Using a sharp knife:\n• **Cucumber:** Cut into very thin round slices (2mm thick) - thin slices fit better in sandwich\n• **Tomato:** Cut into thin round slices (3mm thick) - remove the seedy watery center part if tomato is very juicy\n• **Onion (optional):** Cut into very thin rings - thin onions are less pungent\nPlace each vegetable on a separate plate. Pat dry with paper towel if they're wet - excess moisture makes sandwich soggy.",

      "**STEP 4 - PREPARE POTATO FILLING:** To the mashed potato, add:\n• 2 tablespoon boiled sweet corn (adds sweetness and crunch)\n• 1 tablespoon crumbled paneer (optional - adds protein and creaminess)\n• 1/4 teaspoon chaat masala (tangy, spicy flavor)\n• 1/4 teaspoon black salt (kala namak - adds unique flavor)\n• 1/4 teaspoon black pepper powder\n• Salt to taste\n• 1 tablespoon mint chutney (to bind and add flavor)\nMix everything well with a spoon. Taste and adjust seasoning - it should be flavorful on its own. The filling should be moist but not watery.",

      "**STEP 5 - ASSEMBLE SANDWICH:** Take 4 slices of whole wheat bread. If bread is very soft and fresh, use as is. If slightly dry or want extra flavor, lightly toast the bread:\n• Heat a tawa or pan on medium heat\n• Place bread slices on the hot tawa for 30-40 seconds per side\n• Bread should be warm and slightly crispy on the surface, not completely toasted\n\n**ASSEMBLY:**\n• Take 2 bread slices\n• Spread 1 teaspoon butter or ghee on one side of each slice\n• On one slice (butter side up): spread 1 tablespoon mint chutney evenly\n• Add half the potato filling and spread it evenly, leaving 1 cm border\n• Layer cucumber slices overlapping slightly\n• Layer tomato slices\n• Layer onion rings (if using)\n• Sprinkle a tiny pinch of chaat masala and black salt on vegetables\n• Spread mint chutney on the second bread slice (butter side)\n• Place it on top, chutney side down, pressing gently\n\nRepeat for second sandwich with remaining 2 slices.",

      "**STEP 6 - GRILL SANDWICH (OPTIONAL):** You can eat the sandwich as is (fresh and cold) or grill it for warm, crispy exterior:\n\n**METHOD 1 - Sandwich Maker:** Preheat sandwich maker. Brush plates lightly with oil. Place sandwich in maker, close lid, and cook for 3-4 minutes until golden and crispy with grill marks.\n\n**METHOD 2 - Stovetop (Tawa Method):** Heat tawa on medium heat. Brush lightly with butter. Place sandwich on tawa. Place a heavy plate on top to press it down. Cook for 2-3 minutes until bottom is golden with brown spots. Brush top with butter, flip carefully, press again, cook 2-3 more minutes.\n\n**METHOD 3 - Fresh (No Grilling):** If you prefer fresh, cold sandwich with crunchy vegetables, skip grilling entirely. Just cut and serve.",

      "**STEP 7 - CUT AND SERVE:** Using a sharp knife, cut each sandwich:\n• Diagonally from corner to corner for 2 triangle pieces (classic cut), OR\n• Straight down the middle for 2 rectangles, OR\n• Cut off crusts first, then cut into 4 small squares (tea sandwich style)\nArrange cut pieces on a serving plate. The colorful layers of vegetables should be visible from the sides - looks appetizing!",

      "**STEP 8 - SERVE WITH SIDES:** Serve sandwiches with:\n• Extra mint chutney on the side for dipping\n• Tomato ketchup (optional)\n• Potato chips or banana chips (only if not worried about calories)\n• A cup of masala chai or fresh fruit juice\n\n**STORAGE TIP:** If making ahead:\n• Prepare all components separately\n• Assemble sandwiches just before eating\n• Don't add tomatoes until last minute (they release water)\n• If packing for lunch box, wrap in aluminum foil or butter paper\n• Can stay fresh for 4-5 hours at room temperature\n\n**NUTRITION & BALANCE:** Each sandwich provides 280 calories with balanced macros: 10g protein (from paneer, bread, potato), 42g carbs (from whole wheat bread and potato), 8g fat (from butter), and 6g fiber (from vegetables and whole wheat). Perfect for a mid-meal snack that keeps you satisfied for 2-3 hours without being too heavy. The fresh vegetables add vitamins and minerals, while mint aids digestion. This is the ideal snack for maintaining weight - substantial enough to prevent unhealthy snacking but not so heavy that it ruins your next meal."
    ],
    image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },

  // MAINTENANCE - SNACK (NON-VEG)
  {
    title: "Egg Bhurji with Multigrain Toast",
    description: "Spiced Indian scrambled eggs with vegetables on crispy multigrain toast",
    meal_type: "snack",
    diet_type: "non_veg",
    difficulty: "Easy",
    prep_time: 5,
    cook_time: 10,
    calories: 310,
    protein: 20,
    carbs: 28,
    fats: 14,
    fiber: 4,
    access_level: "guest",
    goal_category: "maintenance",
    tags: ["maintenance", "high protein", "quick", "Indian style"],
    ingredients: [
      "3 large eggs",
      "1 tablespoon oil (preferably olive or mustard oil)",
      "1/2 teaspoon cumin seeds",
      "1 small onion, finely chopped",
      "1 small tomato, finely chopped",
      "1 green chilli, finely chopped",
      "1/4 teaspoon turmeric powder",
      "1/4 teaspoon red chilli powder",
      "1/4 teaspoon garam masala",
      "2 tablespoon bell pepper, finely chopped (optional)",
      "Fresh coriander leaves, 2 tablespoon chopped",
      "Salt to taste",
      "Black pepper to taste",
      "2 slices multigrain bread (or whole wheat)",
      "1 teaspoon butter for toast"
    ],
    instructions: [
      "**STEP 1 - PREPARE INGREDIENTS:** This is a quick dish, so having everything ready (mise en place) is crucial:\n• Crack 3 large eggs into a bowl\n• Beat eggs lightly with a fork or whisk for 30 seconds - just until yolks and whites are combined (don't overbeat - you should still see streaks of white and yellow)\n• Add a pinch of salt and black pepper to beaten eggs, whisk once\n• Finely chop 1 small onion into tiny pieces (2-3mm) - fine pieces cook faster\n• Finely chop 1 small tomato - remove seeds if tomato is very watery\n• Finely chop 1 green chilli - remove seeds for less heat\n• Optionally, finely chop 2 tablespoon bell pepper (capsicum) for color and crunch\n• Chop 2 tablespoon fresh coriander leaves\nKeep everything within reach on a plate.",

      "**STEP 2 - TOAST BREAD:** While preparing ingredients, start toasting bread to save time. You can use:\n\n**METHOD 1 - Toaster:** Place 2 multigrain bread slices in toaster. Toast on medium setting until golden brown and crispy (about 2-3 minutes). \n\n**METHOD 2 - Stovetop:** Heat a tawa or pan on medium heat. Add 1/2 teaspoon butter. Place bread slices on tawa. Toast each side for 1-2 minutes until golden with brown spots and crispy. \n\nOnce toasted, spread remaining 1/2 teaspoon butter on one side of each toast while hot - butter melts and soaks in. Keep toast warm by covering with a cloth or placing in a warm oven (at 80°C).",

      "**STEP 3 - HEAT PAN:** This step is important for fluffy, non-stick bhurji. Heat a non-stick pan on medium heat for 1-2 minutes until hot:\n• Test: sprinkle a few drops of water - they should dance and evaporate immediately\n• Don't overheat - very high heat makes eggs rubbery\nAdd 1 tablespoon oil (olive oil or mustard oil for authentic flavor). Swirl to coat the pan bottom evenly. Heat oil for 30 seconds until it shimmers but doesn't smoke.",

      "**STEP 4 - MAKE TEMPERING:** Add 1/2 teaspoon cumin seeds to the hot oil. They should sizzle and splutter immediately:\n• If they don't sizzle, oil isn't hot enough - wait 10 more seconds\n• Let cumin seeds crackle and turn darker brown for 10-15 seconds\n• They'll release a wonderful nutty aroma\nImmediately add finely chopped onions. Stir with a spatula. Sauté onions on medium heat for 2-3 minutes:\n• After 1 minute: onions will turn translucent\n• After 2-3 minutes: edges will turn light golden and smell sweet\n• Don't burn - if browning too fast, reduce heat slightly",

      "**STEP 5 - ADD VEGETABLES AND SPICES:** Add chopped green chilli and bell pepper (if using) to the sautéed onions. Stir and cook for 30 seconds. Add chopped tomatoes. Stir well. Cook for 2-3 minutes until tomatoes soften:\n• They should break down and become mushy\n• Liquid from tomatoes will evaporate\n• You'll see oil separating at the edges - this means tomatoes are cooked\nNow add the spices:\n• 1/4 teaspoon turmeric powder\n• 1/4 teaspoon red chilli powder\n• Salt to taste\nStir for 10 seconds to cook the spices (raw spice smell should disappear). The mixture should look like a thick, dry masala base with no excess liquid.",

      "**STEP 6 - ADD EGGS (CRUCIAL STEP):** Reduce heat to low-medium. Pour the beaten eggs over the masala mixture:\n• Don't stir immediately - let eggs sit undisturbed for 10-15 seconds\n• You'll see edges starting to set and turn opaque\nNow, using a spatula, **gently scramble** the eggs:\n• Don't stir vigorously - use a folding motion\n• Scrape the bottom and fold eggs over themselves\n• Break up large chunks, but don't over-scramble into tiny pieces\n• Cook for 2-3 minutes, stirring every 10-15 seconds\n\n**DONENESS INDICATORS:**\n• Eggs should be mostly cooked but still slightly soft (they'll continue cooking from residual heat)\n• They should look creamy, not dry or rubbery\n• You should see distinct curds/chunks of egg, not a fine mush\n• Color should be bright yellow from turmeric, speckled with red tomatoes",

      "**STEP 7 - FINAL SEASONING:** When eggs are 90% cooked (still slightly wet), turn off heat. Add:\n• 1/4 teaspoon garam masala (adds warmth and aroma)\n• Fresh black pepper to taste\n• 2 tablespoon chopped coriander leaves\nStir gently once to incorporate. Let bhurji sit in the hot pan for 30 seconds - residual heat will finish cooking the eggs to perfect doneness. The bhurji should look:\n• Fluffy and chunky, not dense or wet\n• Bright yellow with visible pieces of vegetables\n• Moist but not watery - no liquid pooling at bottom\n\n**TROUBLESHOOTING:**\n• If too dry/rubbery: you overcooked - next time, turn off heat sooner\n• If too wet/runny: cook 30 seconds more or increase heat slightly\n• If sticking to pan: pan wasn't hot enough or needs more oil",

      "**STEP 8 - PLATE AND SERVE:** Transfer egg bhurji immediately to a serving plate (don't leave in hot pan or it'll overcook). Arrange the buttered multigrain toasts on the side or on a separate plate. Garnish bhurji with:\n• Extra coriander leaves on top\n• A tiny sprinkle of red chilli powder for color\n• A lemon wedge on the side - squeeze over bhurji just before eating for freshness\n\n**SERVING SUGGESTIONS:**\n• Use toast to scoop up the bhurji and eat\n• Or create an open-face sandwich: spread bhurji on toast\n• Serve with tomato ketchup or green chutney on the side\n• Pairs wonderfully with masala chai or black coffee\n\n**VARIATIONS:**\n• **Cheese Bhurji:** Add 2 tablespoon grated cheese in last 30 seconds of cooking\n• **Mushroom Bhurji:** Add 1/4 cup chopped mushrooms with onions\n• **Paneer Bhurji:** Replace 1 egg with 30 gm crumbled paneer\n\n**NUTRITION & BENEFITS:** This protein-packed snack delivers 310 calories with an excellent 20g protein (from eggs), 28g carbs (from multigrain toast), and 14g healthy fats (from eggs and oil). The 4g fiber from toast keeps you satisfied. Perfect for:\n• Post-workout snack (high protein for muscle recovery)\n• Evening snack (keeps hunger at bay until dinner)\n• Quick breakfast (fast to make, nutritionally complete)\nEggs provide all 9 essential amino acids, while vegetables add vitamins and antioxidants. The combination keeps you energized and satisfied for 3-4 hours, making it ideal for weight maintenance. Eggs also contain choline for brain health and lutein for eye health."
    ],
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80"
  }
];

