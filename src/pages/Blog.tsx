import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Nutrition & Fitness Blog | GoalChef - Expert Tips & Recipes";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover expert nutrition tips, healthy recipes, and fitness advice. Learn about meal planning, macros, weight loss, and building healthy eating habits with GoalChef.");
    }

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    if (searchQuery.trim() === "") {
      setFilteredPosts(blogPosts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, blogPosts]);

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts" as any)
      .select(`
        *,
        blog_authors:author_id (
          name,
          credentials
        )
      `)
      .eq("published", true)
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching blog posts:", error);
      setLoading(false);
      return;
    }

    setBlogPosts(data || []);
    setFilteredPosts(data || []);
    setLoading(false);
  };

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
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title, category, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">Loading blog posts...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                {searchQuery ? "No blog posts found matching your search." : "No blog posts available yet."}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group">
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="overflow-hidden rounded-t-lg">
                          <img
                            src={post.image_url || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"}
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
                              <span>{post.read_time}</span>
                            </div>
                          </div>
                          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={new Date(post.created_at).toISOString()}>
                              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
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
            )}
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
