import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { toast } from "sonner";

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      fetchBlogPost();
    }
  }, [postId]);

  const fetchBlogPost = async () => {
    const { data: postData, error } = await supabase
      .from("blog_posts" as any)
      .select(`
        *,
        blog_authors:author_id (
          name,
          bio,
          credentials,
          image_url
        )
      `)
      .eq("slug", postId)
      .eq("published", true)
      .single();
    
    if (error || !postData) {
      console.error("Error fetching blog post:", error);
      setLoading(false);
      return;
    }

    const blogPost = postData as any;
    setPost(blogPost);
    
    // Update page title and meta description
    document.title = `${blogPost.title} | GoalChef Blog`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", blogPost.excerpt);
    }

    // Fetch related posts
    const { data: related } = await supabase
      .from("blog_posts" as any)
      .select("*")
      .eq("published", true)
      .eq("category", blogPost.category)
      .neq("id", blogPost.id)
      .limit(3);
    
    setRelatedPosts((related || []) as any);
    setLoading(false);
  };

  // Simple markdown/HTML to plain text rendering for BlogPost
  const renderContent = (htmlContent: string) => {
    return htmlContent;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

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
            src={post.image_url || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80"}
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
                <time dateTime={new Date(post.created_at).toISOString()}>
                  {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.read_time}</span>
              </div>
            </div>
          </header>

          {/* Author Section */}
          {post.blog_authors && (
            <Card className="my-8 p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.blog_authors.image_url} />
                  <AvatarFallback>{post.blog_authors.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.blog_authors.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{post.blog_authors.credentials}</p>
                  <p className="text-sm">{post.blog_authors.bio}</p>
                </div>
              </div>
            </Card>
          )}

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
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
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
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.image_url || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"}
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
