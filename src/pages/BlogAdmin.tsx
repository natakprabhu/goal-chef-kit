import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Trash2, Edit, Database } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Author {
  id: string;
  name: string;
  bio: string;
  credentials: string;
  image_url?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  image_url?: string;
  author_id: string;
  published: boolean;
}

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Author form state
  const [authorForm, setAuthorForm] = useState({
    name: "",
    bio: "",
    credentials: "",
    image_url: ""
  });

  // Post form state
  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    read_time: "",
    image_url: "",
    author_id: "",
    published: false
  });

  useEffect(() => {
    checkAuth();
    fetchAuthors();
    fetchPosts();
  }, []);

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  }), []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/sign-in");
    }
  };

  const seedSampleData = async () => {
    try {
      // Insert sample authors
      const { data: authorsData, error: authorsError } = await supabase
        .from("blog_authors" as any)
        .insert([
          {
            name: "Dr. Priya Sharma",
            credentials: "PhD Nutrition Science, Registered Dietitian",
            bio: "Dr. Priya Sharma is a renowned nutritionist with over 15 years of experience helping individuals achieve their health goals through evidence-based dietary approaches. She specializes in sports nutrition and weight management.",
            image_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
          },
          {
            name: "Rahul Mehta",
            credentials: "MSc Clinical Nutrition, Certified Diabetes Educator",
            bio: "Rahul Mehta is a clinical nutritionist who focuses on managing chronic diseases through nutrition. He has published numerous research papers on diabetes management and metabolic health.",
            image_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80"
          },
          {
            name: "Anjali Patel",
            credentials: "BSc Nutrition, Certified Fitness Nutritionist",
            bio: "Anjali Patel combines her expertise in nutrition and fitness to help clients build sustainable healthy habits. She specializes in meal planning for active individuals and athletes.",
            image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
          }
        ])
        .select();

      if (authorsError) throw authorsError;

      const authorIds = (authorsData as any[]).map(a => a.id);

      // Insert sample blog posts
      const { error: postsError } = await supabase
        .from("blog_posts" as any)
        .insert([
          {
            title: "Understanding Macronutrients: Your Complete Guide",
            slug: "understanding-macronutrients-complete-guide",
            excerpt: "Learn how to balance proteins, carbs, and fats for optimal health and fitness results.",
            content: "<h2>What Are Macronutrients?</h2><p>Macronutrients are nutrients your body needs in large amounts: proteins, carbohydrates, and fats. Each plays a crucial role in your health.</p><h2>Protein: The Building Blocks</h2><p>Protein is essential for muscle growth and repair. Aim for 0.8-1.2g per kg of body weight daily.</p><h2>Carbohydrates: Your Energy Source</h2><p>Carbs fuel your brain and muscles. Focus on complex carbs from whole grains and vegetables.</p><h2>Fats: Essential for Health</h2><p>Healthy fats support hormone production and nutrient absorption. Include sources like avocados, nuts, and olive oil.</p>",
            category: "Nutrition Basics",
            read_time: "8 min read",
            image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
            author_id: authorIds[0],
            published: true
          },
          {
            title: "10 High-Protein Breakfast Ideas",
            slug: "high-protein-breakfast-ideas",
            excerpt: "Start your day right with these delicious protein-packed breakfast recipes.",
            content: "<h2>Why Protein at Breakfast?</h2><p>A high-protein breakfast stabilizes blood sugar and keeps you full until lunch.</p><h2>Our Top 10 Ideas</h2><ol><li><strong>Greek Yogurt Bowl:</strong> 30g protein with berries and nuts</li><li><strong>Egg Scramble:</strong> 25g protein with veggies</li><li><strong>Protein Pancakes:</strong> 35g protein, fluffy and delicious</li><li><strong>Smoked Salmon Toast:</strong> 28g protein on whole grain</li><li><strong>Protein Smoothie:</strong> 30g protein, ready in 5 minutes</li></ol>",
            category: "Recipes",
            read_time: "5 min read",
            image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80",
            author_id: authorIds[2],
            published: true
          },
          {
            title: "Meal Prep Like a Pro: 5 Time-Saving Strategies",
            slug: "meal-prep-strategies",
            excerpt: "Master meal prepping with these proven strategies for busy professionals.",
            content: "<h2>Why Meal Prep?</h2><p>Meal prepping saves time, money, and helps you stick to your nutrition goals.</p><h2>5 Key Strategies</h2><ol><li><strong>Plan Your Week:</strong> Spend 20 minutes planning meals</li><li><strong>Batch Cook:</strong> Prepare proteins and grains in bulk</li><li><strong>Use Quality Containers:</strong> Invest in good storage</li><li><strong>Prep Components:</strong> Not full meals, but versatile ingredients</li><li><strong>Start Small:</strong> Begin with 3-4 days, then expand</li></ol>",
            category: "Meal Planning",
            read_time: "6 min read",
            image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80",
            author_id: authorIds[1],
            published: true
          }
        ]);

      if (postsError) throw postsError;

      toast.success("Sample data added successfully!");
      fetchAuthors();
      fetchPosts();
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("Failed to seed sample data");
    }
  };

  const fetchAuthors = async () => {
    const { data, error } = await supabase
      .from("blog_authors" as any)
      .select("*")
      .order("name");
    
    if (error) {
      toast.error("Failed to fetch authors");
      return;
    }
    setAuthors(data as any || []);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts" as any)
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch posts");
      return;
    }
    setPosts(data as any || []);
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAuthor) {
      const { error } = await supabase
        .from("blog_authors" as any)
        .update(authorForm as any)
        .eq("id", selectedAuthor.id);
      
      if (error) {
        toast.error("Failed to update author");
        return;
      }
      toast.success("Author updated successfully");
    } else {
      const { error } = await supabase
        .from("blog_authors" as any)
        .insert([authorForm as any]);
      
      if (error) {
        toast.error("Failed to create author");
        return;
      }
      toast.success("Author created successfully");
    }
    
    setAuthorForm({ name: "", bio: "", credentials: "", image_url: "" });
    setSelectedAuthor(null);
    fetchAuthors();
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPost) {
      const { error } = await supabase
        .from("blog_posts" as any)
        .update(postForm as any)
        .eq("id", selectedPost.id);
      
      if (error) {
        toast.error("Failed to update post");
        return;
      }
      toast.success("Post updated successfully");
    } else {
      const { error } = await supabase
        .from("blog_posts" as any)
        .insert([postForm as any]);
      
      if (error) {
        toast.error("Failed to create post");
        return;
      }
      toast.success("Post created successfully");
    }
    
    setPostForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      read_time: "",
      image_url: "",
      author_id: "",
      published: false
    });
    setSelectedPost(null);
    fetchPosts();
  };

  const deleteAuthor = async (id: string) => {
    const { error } = await supabase
      .from("blog_authors" as any)
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete author");
      return;
    }
    toast.success("Author deleted successfully");
    fetchAuthors();
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from("blog_posts" as any)
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete post");
      return;
    }
    toast.success("Post deleted successfully");
    fetchPosts();
  };

  const editAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setAuthorForm({
      name: author.name,
      bio: author.bio,
      credentials: author.credentials,
      image_url: author.image_url || ""
    });
  };

  const editPost = (post: BlogPost) => {
    setSelectedPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      read_time: post.read_time,
      image_url: post.image_url || "",
      author_id: post.author_id,
      published: post.published
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Blog Management</h1>
          <Button onClick={seedSampleData} variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Seed Sample Data
          </Button>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedPost ? "Edit Post" : "Create New Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={postForm.slug}
                      onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <ReactQuill
                      theme="snow"
                      value={postForm.content}
                      onChange={(value) => setPostForm({ ...postForm, content: value })}
                      modules={quillModules}
                      className="bg-background"
                      style={{ height: "300px", marginBottom: "50px" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={postForm.category}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="read_time">Read Time</Label>
                      <Input
                        id="read_time"
                        value={postForm.read_time}
                        onChange={(e) => setPostForm({ ...postForm, read_time: e.target.value })}
                        placeholder="5 min read"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={postForm.image_url}
                      onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <select
                      id="author"
                      value={postForm.author_id}
                      onChange={(e) => setPostForm({ ...postForm, author_id: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={postForm.published}
                      onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{selectedPost ? "Update" : "Create"} Post</Button>
                    {selectedPost && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedPost(null);
                          setPostForm({
                            title: "",
                            slug: "",
                            excerpt: "",
                            content: "",
                            category: "",
                            read_time: "",
                            image_url: "",
                            author_id: "",
                            published: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">{post.category} • {post.published ? "Published" : "Draft"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => editPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="authors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedAuthor ? "Edit Author" : "Create New Author"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuthorSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={authorForm.name}
                      onChange={(e) => setAuthorForm({ ...authorForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="credentials">Credentials</Label>
                    <Input
                      id="credentials"
                      value={authorForm.credentials}
                      onChange={(e) => setAuthorForm({ ...authorForm, credentials: e.target.value })}
                      placeholder="MSc Nutrition, RD"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={authorForm.bio}
                      onChange={(e) => setAuthorForm({ ...authorForm, bio: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author_image_url">Image URL</Label>
                    <Input
                      id="author_image_url"
                      value={authorForm.image_url}
                      onChange={(e) => setAuthorForm({ ...authorForm, image_url: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{selectedAuthor ? "Update" : "Create"} Author</Button>
                    {selectedAuthor && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedAuthor(null);
                          setAuthorForm({ name: "", bio: "", credentials: "", image_url: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {authors.map((author) => (
                <Card key={author.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground">{author.credentials}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => editAuthor(author)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteAuthor(author.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default BlogAdmin;
