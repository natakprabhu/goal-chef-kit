import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  useEffect(() => {
    document.title = "Nutrition & Fitness Blog | GoalChef - Expert Tips & Recipes";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover expert nutrition tips, healthy recipes, and fitness advice. Learn about meal planning, macros, weight loss, and building healthy eating habits with GoalChef.");
    }
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Macronutrients: Your Complete Guide to Protein, Carbs, and Fats",
      excerpt: "Learn how to balance macronutrients for optimal health, energy, and fitness goals. Discover the role of protein, carbohydrates, and fats in your diet.",
      category: "Nutrition Basics",
      readTime: "8 min read",
      date: "November 20, 2025",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    },
    {
      id: 2,
      title: "Meal Prep Like a Pro: 5 Time-Saving Strategies for Busy Professionals",
      excerpt: "Master the art of meal prepping with these proven strategies. Save time, money, and stay on track with your nutrition goals throughout the week.",
      category: "Meal Planning",
      readTime: "6 min read",
      date: "November 18, 2025",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    },
    {
      id: 3,
      title: "High-Protein Breakfast Ideas for Muscle Building and Weight Loss",
      excerpt: "Start your day right with these delicious, protein-packed breakfast recipes. Perfect for muscle building, weight loss, and sustained energy levels.",
      category: "Recipes",
      readTime: "5 min read",
      date: "November 15, 2025",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    },
    {
      id: 4,
      title: "The Science of Calorie Deficit: How to Lose Weight Sustainably",
      excerpt: "Understand the science behind weight loss and learn how to create a sustainable calorie deficit without sacrificing nutrition or energy.",
      category: "Weight Loss",
      readTime: "10 min read",
      date: "November 12, 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    },
    {
      id: 5,
      title: "Post-Workout Nutrition: What to Eat for Optimal Recovery",
      excerpt: "Maximize your fitness results with proper post-workout nutrition. Learn what nutrients your body needs for muscle recovery and growth.",
      category: "Fitness Nutrition",
      readTime: "7 min read",
      date: "November 10, 2025",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    },
    {
      id: 6,
      title: "Vegetarian Protein Sources: Complete Guide for Plant-Based Athletes",
      excerpt: "Discover the best vegetarian protein sources to fuel your fitness goals. Learn how to meet your protein needs on a plant-based diet.",
      category: "Vegetarian Nutrition",
      readTime: "9 min read",
      date: "November 8, 2025",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Blog" }]} />
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nutrition & Fitness Blog
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert advice on nutrition, meal planning, and fitness to help you achieve your health goals
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link to={`/blog/${post.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="secondary">{post.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {post.excerpt}
                        </CardDescription>
                        <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {["Nutrition Basics", "Meal Planning", "Recipes", "Weight Loss", "Fitness Nutrition", "Vegetarian Nutrition", "Muscle Building", "Healthy Habits"].map((category) => (
                <Button key={category} variant="outline" className="h-auto py-4">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-3">Stay Updated with Nutrition Tips</CardTitle>
                <CardDescription className="text-base">
                  Get the latest nutrition advice, healthy recipes, and fitness tips delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
                    aria-label="Email address for newsletter"
                  />
                  <Button className="whitespace-nowrap">Subscribe Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
