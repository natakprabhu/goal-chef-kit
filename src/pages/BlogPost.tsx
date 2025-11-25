import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { toast } from "sonner";

// Sample blog posts data (in production, this would come from a database or CMS)
const blogPosts = {
  "1": {
    id: 1,
    title: "Understanding Macronutrients: Your Complete Guide to Protein, Carbs, and Fats",
    excerpt: "Learn how to balance macronutrients for optimal health, energy, and fitness goals.",
    category: "Nutrition Basics",
    readTime: "8 min read",
    date: "November 20, 2025",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    content: `
      <p>Macronutrients are the foundation of nutrition science and understanding them is crucial for achieving your fitness and health goals. In this comprehensive guide, we'll explore the three primary macronutrients: proteins, carbohydrates, and fats.</p>

      <h2>What Are Macronutrients?</h2>
      <p>Macronutrients, or "macros," are nutrients that your body needs in large amounts to function properly. Unlike micronutrients (vitamins and minerals), macronutrients provide energy and are essential for growth, metabolism, and other bodily functions.</p>

      <h2>Protein: The Building Blocks</h2>
      <p>Protein is essential for building and repairing tissues, making enzymes and hormones, and supporting immune function. The recommended daily intake is typically 0.8-1.2 grams per kilogram of body weight, though athletes may need more.</p>
      
      <h3>Best Protein Sources:</h3>
      <ul>
        <li>Lean meats (chicken, turkey, lean beef)</li>
        <li>Fish and seafood</li>
        <li>Eggs and dairy products</li>
        <li>Legumes (beans, lentils, chickpeas)</li>
        <li>Nuts and seeds</li>
        <li>Tofu and tempeh</li>
      </ul>

      <h2>Carbohydrates: Your Energy Source</h2>
      <p>Carbohydrates are your body's primary energy source. They fuel your brain, kidneys, heart muscles, and central nervous system. Not all carbs are created equal—focus on complex carbohydrates for sustained energy.</p>

      <h3>Quality Carbohydrate Sources:</h3>
      <ul>
        <li>Whole grains (brown rice, quinoa, oats)</li>
        <li>Fruits and vegetables</li>
        <li>Legumes</li>
        <li>Sweet potatoes</li>
      </ul>

      <h2>Fats: Essential for Health</h2>
      <p>Dietary fats are crucial for hormone production, nutrient absorption, and cell membrane integrity. Focus on healthy fats while limiting saturated and trans fats.</p>

      <h3>Healthy Fat Sources:</h3>
      <ul>
        <li>Avocados</li>
        <li>Nuts and nut butters</li>
        <li>Olive oil and coconut oil</li>
        <li>Fatty fish (salmon, mackerel, sardines)</li>
        <li>Seeds (chia, flax, hemp)</li>
      </ul>

      <h2>Finding Your Perfect Balance</h2>
      <p>The ideal macronutrient ratio varies based on your goals, activity level, and individual needs. A common starting point is 40% carbs, 30% protein, and 30% fats, but this can be adjusted based on your specific requirements.</p>

      <h2>Tracking Your Macros</h2>
      <p>Using a nutrition tracking app like GoalChef can help you monitor your macronutrient intake and ensure you're meeting your daily targets. Consistency is key to seeing results.</p>
    `,
  },
  "2": {
    id: 2,
    title: "Meal Prep Like a Pro: 5 Time-Saving Strategies for Busy Professionals",
    excerpt: "Master the art of meal prepping with these proven strategies.",
    category: "Meal Planning",
    readTime: "6 min read",
    date: "November 18, 2025",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
    content: `
      <p>In today's fast-paced world, meal prepping has become essential for maintaining a healthy diet while juggling a busy schedule. Here are five proven strategies to help you meal prep like a professional.</p>

      <h2>1. Plan Your Week in Advance</h2>
      <p>Dedicate 15-20 minutes each weekend to plan your meals for the upcoming week. Use GoalChef's meal planning feature to select recipes that align with your nutritional goals and create a comprehensive shopping list.</p>

      <h2>2. Batch Cook Strategic Components</h2>
      <p>Instead of cooking complete meals, prepare versatile components that can be mixed and matched throughout the week:</p>
      <ul>
        <li>Cook large batches of protein (grilled chicken, ground turkey, hard-boiled eggs)</li>
        <li>Roast assorted vegetables</li>
        <li>Prepare whole grains (brown rice, quinoa, pasta)</li>
        <li>Wash and chop fresh vegetables</li>
      </ul>

      <h2>3. Invest in Quality Storage Containers</h2>
      <p>Glass or BPA-free plastic containers with compartments help keep ingredients separate and fresh. Aim for uniform sizes that stack easily in your refrigerator and are microwave-safe for easy reheating.</p>

      <h2>4. Use the Right Kitchen Tools</h2>
      <p>Efficiency is key in meal prep. Essential tools include:</p>
      <ul>
        <li>Slow cooker or Instant Pot for hands-off cooking</li>
        <li>Sheet pans for roasting multiple items</li>
        <li>Sharp knives and a good cutting board</li>
        <li>Food processor for quick chopping</li>
      </ul>

      <h2>5. Start Small and Build Gradually</h2>
      <p>Don't try to prep every meal for the entire week right away. Start by prepping lunches for 3-4 days, then gradually expand as you become more comfortable with the process.</p>

      <h2>Meal Prep Timeline</h2>
      <p>A typical 2-3 hour meal prep session can provide you with 4-5 days worth of meals. Choose a consistent day and time each week to make it a habit.</p>
    `,
  },
  "3": {
    id: 3,
    title: "High-Protein Breakfast Ideas for Muscle Building and Weight Loss",
    excerpt: "Start your day right with these delicious, protein-packed breakfast recipes.",
    category: "Recipes",
    readTime: "5 min read",
    date: "November 15, 2025",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80",
    content: `
      <p>Starting your day with a high-protein breakfast is one of the best strategies for building muscle, losing weight, and maintaining energy throughout the day. Here are some delicious and nutritious breakfast ideas.</p>

      <h2>Why Protein at Breakfast Matters</h2>
      <p>Consuming protein in the morning helps stabilize blood sugar levels, reduces cravings, supports muscle protein synthesis, and keeps you feeling full until lunch. Aim for 25-35 grams of protein in your breakfast.</p>

      <h2>1. Greek Yogurt Protein Bowl</h2>
      <p><strong>Protein: 30g per serving</strong></p>
      <ul>
        <li>1 cup Greek yogurt (plain, nonfat)</li>
        <li>1 scoop vanilla protein powder</li>
        <li>1/4 cup berries</li>
        <li>2 tbsp almonds</li>
        <li>Drizzle of honey</li>
      </ul>

      <h2>2. Veggie-Packed Egg White Scramble</h2>
      <p><strong>Protein: 28g per serving</strong></p>
      <ul>
        <li>6 egg whites + 1 whole egg</li>
        <li>Spinach, tomatoes, mushrooms</li>
        <li>2 oz low-fat cheese</li>
        <li>Serve with whole grain toast</li>
      </ul>

      <h2>3. Protein Pancakes</h2>
      <p><strong>Protein: 35g per serving</strong></p>
      <ul>
        <li>1 scoop protein powder</li>
        <li>2 eggs</li>
        <li>1/2 cup oats</li>
        <li>1/2 banana</li>
        <li>Top with Greek yogurt and berries</li>
      </ul>

      <h2>4. Smoked Salmon Avocado Toast</h2>
      <p><strong>Protein: 25g per serving</strong></p>
      <ul>
        <li>2 slices whole grain bread</li>
        <li>4 oz smoked salmon</li>
        <li>1/2 avocado</li>
        <li>2 poached eggs</li>
      </ul>

      <h2>5. Overnight Protein Oats</h2>
      <p><strong>Protein: 30g per serving</strong></p>
      <ul>
        <li>1/2 cup oats</li>
        <li>1 scoop protein powder</li>
        <li>1 cup unsweetened almond milk</li>
        <li>2 tbsp chia seeds</li>
        <li>Top with nuts and fruit in the morning</li>
      </ul>

      <h2>Meal Prep Tips</h2>
      <p>Prepare overnight oats and hard-boiled eggs in advance for grab-and-go options during busy mornings. Use GoalChef to track the nutritional content and ensure you're meeting your daily protein goals.</p>
    `,
  },
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = postId ? blogPosts[postId as keyof typeof blogPosts] : null;
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts[keyof typeof blogPosts][]>([]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | GoalChef Blog`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      }

      // Get related posts (exclude current post)
      const related = Object.values(blogPosts)
        .filter(p => p.id !== post.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [post]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        break;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">Blog post not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Image */}
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {/* Article Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <span className="text-sm font-semibold text-muted-foreground">Share:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("twitter")}
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("facebook")}
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("linkedin")}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("copy")}
              aria-label="Copy link"
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground prose-p:mb-6 prose-ul:my-6 prose-li:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action */}
          <Card className="my-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Transform Your Nutrition?</CardTitle>
              <CardDescription>
                Start tracking your meals and achieving your fitness goals with GoalChef
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg">
                <Link to="/get-started">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {relatedPost.category}
                        </Badge>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          {relatedPost.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
