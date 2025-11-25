export const sampleAuthors = [
  {
    name: "Dr. Priya Sharma",
    credentials: "PhD Nutrition Science, RD, CSSD",
    bio: "Dr. Priya Sharma is a board-certified sports dietitian with over 15 years of experience. She has worked with Olympic athletes and professional sports teams, specializing in performance nutrition and body composition optimization.",
    image_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
  },
  {
    name: "Rahul Mehta",
    credentials: "MSc Clinical Nutrition, CDE, CNS",
    bio: "Rahul Mehta is a clinical nutritionist specializing in metabolic disorders and diabetes management. He has published over 30 peer-reviewed research papers and serves as Head Nutritionist at Apollo Hospital.",
    image_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80"
  },
  {
    name: "Anjali Patel",
    credentials: "BSc Nutrition, ISSA-CFN, Precision Nutrition L2",
    bio: "Anjali Patel is a certified fitness nutritionist who specializes in meal planning for busy professionals. She has helped over 2,000 clients achieve their fitness goals and runs a popular YouTube channel.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    name: "Dr. Vikram Singh",
    credentials: "MBBS, MD Endocrinology, Certified Obesity Physician",
    bio: "Dr. Vikram Singh is a practicing endocrinologist with specialized training in obesity medicine and weight management. He combines medical expertise with evidence-based nutrition strategies.",
    image_url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"
  }
];

export const getSamplePosts = (authorIds: string[]) => [
  {
    title: "Understanding Macronutrients: A Complete Guide to Protein, Carbs, and Fats",
    slug: "understanding-macronutrients-complete-guide",
    excerpt: "Master the fundamentals of nutrition by understanding how proteins, carbohydrates, and fats work in your body. Learn optimal ratios for your fitness goals.",
    content: `<h2>What Are Macronutrients?</h2><p>Macronutrients (or macros) are nutrients your body needs in large amounts to function properly. Unlike micronutrients, macronutrients provide energy and are essential for growth and metabolism.</p><h2>Protein: The Building Blocks</h2><p>Protein is crucial for muscle growth, immune function, and producing enzymes and hormones.</p><p><strong>Recommended Intake:</strong> 0.8-1.2g per kg body weight for average adults, 1.6-2.2g/kg for athletes.</p><p><strong>Best Sources:</strong> Chicken, fish, eggs, Greek yogurt, lentils, tofu, quinoa</p><h2>Carbohydrates: Your Energy Source</h2><p>Carbs fuel your brain and muscles. Focus on complex carbs for sustained energy.</p><p><strong>Best Sources:</strong> Brown rice, oats, sweet potatoes, quinoa, whole wheat bread</p><h2>Fats: Essential for Health</h2><p>Fats support hormone production, vitamin absorption, and cellular health.</p><p><strong>Best Sources:</strong> Avocados, olive oil, nuts, fatty fish, coconut oil</p>`,
    category: "Nutrition Basics",
    read_time: "10 min read",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    author_id: authorIds[0],
    published: true
  },
  {
    title: "15 High-Protein Breakfast Ideas to Fuel Your Morning",
    slug: "high-protein-breakfast-ideas",
    excerpt: "Start your day strong with these delicious, protein-packed breakfast recipes. Each provides 25-40g of protein to keep you energized and satisfied.",
    content: `<h2>Why Protein for Breakfast?</h2><p>Starting your day with adequate protein stabilizes blood sugar, reduces cravings, and supports muscle growth.</p><h2>Top Breakfast Ideas</h2><ol><li><strong>Greek Yogurt Power Bowl (30g):</strong> Greek yogurt, protein powder, berries, almonds</li><li><strong>Veggie Egg Scramble (28g):</strong> 3 eggs, veggies, cheese, whole wheat toast</li><li><strong>Protein Pancakes (35g):</strong> Protein powder, eggs, oats, banana</li><li><strong>Smoked Salmon Toast (32g):</strong> Whole grain bread, salmon, avocado, poached eggs</li><li><strong>Overnight Protein Oats (30g):</strong> Oats, protein powder, chia seeds, almond milk</li></ol><h2>Meal Prep Tips</h2><p>Prepare overnight oats and hard-boil eggs in advance for quick grab-and-go options during busy mornings.</p>`,
    category: "Recipes",
    read_time: "8 min read",
    image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80",
    author_id: authorIds[2],
    published: true
  },
  {
    title: "The Ultimate Guide to Meal Prep for Busy Professionals",
    slug: "ultimate-meal-prep-guide",
    excerpt: "Transform your weekly nutrition with strategic meal prep. Learn time-tested strategies that save hours and ensure healthy meals.",
    content: `<h2>Why Meal Prep Changes Everything</h2><p>People who meal prep save 5-8 hours per week, spend 30-40% less on food, and make consistently healthier choices.</p><h2>The 5-Step System</h2><h3>Step 1: Strategic Planning (20 minutes)</h3><p>Count meals needed, choose 2-3 proteins, select 3-4 vegetables, pick 2 carb sources.</p><h3>Step 2: Smart Shopping (30-45 minutes)</h3><p>Shop with organized list: proteins, vegetables, carbs, healthy fats, seasonings.</p><h3>Step 3: Batch Cooking (2-3 hours)</h3><p>Use oven for proteins and veggies, stovetop for grains, slow cooker for stews.</p><h3>Step 4: Smart Storage</h3><p>Use glass containers, keep components separate, label with dates.</p><h3>Step 5: Mix-and-Match Assembly</h3><p>Build-your-own bowl system: protein + carb + 2 vegetables + healthy fat + sauce.</p>`,
    category: "Meal Planning",
    read_time: "12 min read",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
    author_id: authorIds[1],
    published: true
  },
  {
    title: "Indian Diet Plan for Weight Loss: A Complete Guide",
    slug: "indian-diet-plan-weight-loss",
    excerpt: "Lose weight sustainably with traditional Indian foods. Authentic recipes, meal timing, and portion control strategies.",
    content: `<h2>Indian Cuisine for Weight Loss</h2><p>Indian food offers incredible nutritional benefits: high fiber from lentils, rich protein from dal and paneer, metabolism-boosting spices.</p><h2>The Indian Plate Formula</h2><ul><li>50% Vegetables (raw or cooked)</li><li>25% Protein (dal, paneer, chicken, fish)</li><li>25% Whole grain carbs (brown rice, roti, millets)</li><li>Small amount healthy fats (ghee, nuts)</li></ul><h2>Sample Day</h2><p><strong>Breakfast:</strong> Vegetable poha with peanuts</p><p><strong>Lunch:</strong> 2 rotis, moong dal, vegetable sabzi, cucumber raita</p><p><strong>Snack:</strong> Masala buttermilk, roasted chana</p><p><strong>Dinner:</strong> Grilled chicken tikka, mixed vegetable salad</p><h2>Best Indian Foods</h2><p><strong>Proteins:</strong> Dals, paneer, curd, chicken, fish, eggs</p><p><strong>Carbs:</strong> Whole wheat roti, brown rice, millets, oats</p><p><strong>Spices:</strong> Turmeric, cumin, cinnamon, ginger, black pepper</p>`,
    category: "Weight Loss",
    read_time: "11 min read",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    author_id: authorIds[3],
    published: true
  },
  {
    title: "Intermittent Fasting: Complete Guide for Indian Lifestyle",
    slug: "intermittent-fasting-guide-indian",
    excerpt: "Learn how to practice intermittent fasting while maintaining your Indian dietary preferences. Includes meal plans and tips for success.",
    content: `<h2>What is Intermittent Fasting?</h2><p>IF cycles between eating and fasting periods. Popular methods include 16:8 (fast 16 hours, eat 8 hours) and 5:2 (normal eating 5 days, restricted 2 days).</p><h2>16:8 Indian Meal Plan</h2><p><strong>12 PM - Breaking Fast:</strong> 2 rotis, dal, vegetable curry, curd</p><p><strong>3 PM - Snack:</strong> Fruit salad with nuts, green tea</p><p><strong>7 PM - Dinner:</strong> Grilled paneer, brown rice, mixed vegetables, raita</p><h2>During Fasting (Allowed)</h2><ul><li>Water (8-10 glasses)</li><li>Black coffee</li><li>Green tea, herbal teas</li></ul><h2>Tips for Success</h2><ul><li>Start gradually (12:12, then 14:10, then 16:8)</li><li>Stay hydrated during fasting</li><li>Focus on nutrient-dense foods during eating window</li><li>Be flexible for social events</li></ul><h2>Who Should Avoid IF</h2><p>Pregnant/breastfeeding women, children, people with eating disorders, diabetes patients (without doctor consultation).</p>`,
    category: "Weight Loss",
    read_time: "9 min read",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    author_id: authorIds[0],
    published: true
  },
  {
    title: "Post-Workout Nutrition: What to Eat for Maximum Recovery",
    slug: "post-workout-nutrition-guide",
    excerpt: "Optimize workout results with proper post-exercise nutrition. Best foods, timing, and portions for muscle recovery.",
    content: `<h2>Why Post-Workout Nutrition Matters</h2><p>The 30-90 minutes after exercise is critical for nutrient absorption. Proper nutrition replenishes glycogen, repairs muscle tissue, and enhances recovery.</p><h2>The Formula</h2><p><strong>Protein (20-40g):</strong> Whey shake, chicken, Greek yogurt, eggs, salmon</p><p><strong>Carbs (0.5-0.7g per kg):</strong> White rice, sweet potato, banana, oats, whole grain bread</p><p><strong>Ratio:</strong> 2:1 to 3:1 carbs:protein for endurance, 1:1 to 2:1 for strength</p><h2>Best Post-Workout Meals</h2><h3>For Muscle Building</h3><ul><li>2 scoops whey + banana + 1 cup white rice + almond butter</li><li>6 oz chicken + large sweet potato + broccoli</li></ul><h3>For Weight Loss</h3><ul><li>1 scoop whey + apple + peanut butter</li><li>4 oz lean turkey + 1/2 cup brown rice + salad</li></ul><h3>Indian Options</h3><ul><li>Paneer bhurji + 2 rotis</li><li>Chicken tikka + brown rice</li><li>Idli (4) + sambar + egg whites</li></ul>`,
    category: "Fitness Nutrition",
    read_time: "10 min read",
    image_url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80",
    author_id: authorIds[2],
    published: true
  }
];
