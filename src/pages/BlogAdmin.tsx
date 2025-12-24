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
import { Trash2, Edit, Database, Upload, Download, ShieldAlert } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { sampleAuthors, getSamplePosts } from "@/data/sampleBlogData";
import { sampleRecipes } from "@/data/sampleRecipes";
import type { Recipe } from "@/hooks/useRecipes";
import Papa from "papaparse";
import { z } from "zod";
import { SitemapManager } from "@/components/SitemapManager";
import { useAdmin } from "@/hooks/useAdmin";
import { RecipeEditDialog } from "@/components/RecipeEditDialog";

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
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [importing, setImporting] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeEditOpen, setRecipeEditOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);
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
    published: false,
    meta_title: "",
    meta_description: "",
    og_image: "",
    schema_markup: {}
  });

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }
    if (!adminLoading && isAdmin) {
      fetchAuthors();
      fetchPosts();
      fetchRecipes();
    }
  }, [adminLoading, isAdmin, navigate]);

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

  // Show loading while checking admin status
  if (adminLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 mt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 mt-16 flex items-center justify-center">
          <div className="text-center">
            <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const editRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeEditOpen(true);
  };



  const seedSampleData = async () => {
    setSeeding(true);
    console.log("Starting blog seed...");
    try {
      // Delete existing data
      const { error: deletePostsError } = await supabase.from("blog_posts" as any).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (deletePostsError) {
        console.error("Delete posts error:", deletePostsError);
        throw deletePostsError;
      }
      
      const { error: deleteAuthorsError } = await supabase.from("blog_authors" as any).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (deleteAuthorsError) {
        console.error("Delete authors error:", deleteAuthorsError);
        throw deleteAuthorsError;
      }

      console.log("Inserting authors...");
      const { data: authorsData, error: authorsError } = await supabase
        .from("blog_authors" as any)
        .insert(sampleAuthors)
        .select();

      if (authorsError) {
        console.error("Insert authors error:", authorsError);
        throw authorsError;
      }
      
      console.log("Authors inserted:", authorsData);
      const authorIds = (authorsData as any[]).map(a => a.id);

      console.log("Inserting posts with author IDs:", authorIds);
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts" as any)
        .insert(getSamplePosts(authorIds))
        .select();

      if (postsError) {
        console.error("Insert posts error:", postsError);
        throw postsError;
      }

      console.log("Posts inserted:", postsData);
      toast.success(`✅ Blog data added! ${authorsData?.length || 0} authors, ${postsData?.length || 0} posts`);
      await fetchAuthors();
      await fetchPosts();
    } catch (error: any) {
      console.error("Seed error:", error);
      toast.error("Failed to seed blog data: " + (error.message || "Unknown error"));
    } finally {
      setSeeding(false);
    }
  };

  const seedRecipes = async () => {
    try {
      // Check if recipes already exist
      const { data: existingRecipes } = await supabase
        .from("recipes")
        .select("title");
      
      const existingTitles = new Set(existingRecipes?.map(r => r.title) || []);
      
      // Filter out recipes that already exist
      const newRecipes = sampleRecipes.filter(recipe => !existingTitles.has(recipe.title));
      
      if (newRecipes.length === 0) {
        toast.info("All recipes already exist in the database!");
        return;
      }
      
      // Add goal_category to each recipe based on tags
      const recipesWithGoal = newRecipes.map(recipe => {
        let goal_category = 'maintenance'; // default
        
        if (recipe.tags.some(tag => tag.toLowerCase().includes('weight gain'))) {
          goal_category = 'weight_gain';
        } else if (recipe.tags.some(tag => tag.toLowerCase().includes('weight loss'))) {
          goal_category = 'weight_loss';
        }
        
        return { ...recipe, goal_category };
      });

      const { error } = await supabase.from("recipes" as any).insert(recipesWithGoal);
      if (error) throw error;
      toast.success(`✅ ${newRecipes.length} new recipes added successfully!`);
      fetchRecipes();
    } catch (error: any) {
      toast.error("Failed to seed recipes: " + error.message);
    }
  };

  // Recipe validation schema
  const recipeSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200, "Title too long"),
    description: z.string().trim().min(1, "Description is required").max(500, "Description too long"),
    meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "snack2"]),
    diet_type: z.enum(["veg", "non_veg"]),
    difficulty: z.string().optional(),
    prep_time: z.number().min(0).optional().nullable(),
    cook_time: z.number().min(0).optional().nullable(),
    calories: z.number().min(0, "Calories must be positive"),
    protein: z.number().min(0, "Protein must be positive"),
    carbs: z.number().min(0, "Carbs must be positive"),
    fats: z.number().min(0, "Fats must be positive"),
    fiber: z.number().min(0).optional().nullable(),
    access_level: z.enum(["guest", "logged_in", "subscribed"]).default("guest"),
    goal_category: z.enum(["weight_gain", "weight_loss", "maintenance"]).optional().nullable(),
    tags: z.array(z.string()).optional().default([]),
    ingredients: z.union([
      z.array(z.string()),
      z.array(z.object({ item: z.string() }))
    ]),
    instructions: z.union([
      z.array(z.string()),
      z.array(z.object({ step: z.string() }))
    ]),
    image_url: z.string().url().optional().nullable()
  });

  const normalizeRecipeData = (data: any) => {
    // Convert string numbers to actual numbers
    const normalized = { ...data };
    
    if (typeof normalized.calories === 'string') normalized.calories = parseFloat(normalized.calories);
    if (typeof normalized.protein === 'string') normalized.protein = parseFloat(normalized.protein);
    if (typeof normalized.carbs === 'string') normalized.carbs = parseFloat(normalized.carbs);
    if (typeof normalized.fats === 'string') normalized.fats = parseFloat(normalized.fats);
    if (typeof normalized.fiber === 'string') normalized.fiber = parseFloat(normalized.fiber);
    if (typeof normalized.prep_time === 'string') normalized.prep_time = parseInt(normalized.prep_time);
    if (typeof normalized.cook_time === 'string') normalized.cook_time = parseInt(normalized.cook_time);
    
    // Parse JSON strings for arrays
    if (typeof normalized.tags === 'string') {
      try {
        normalized.tags = JSON.parse(normalized.tags);
      } catch {
        normalized.tags = normalized.tags.split(',').map((t: string) => t.trim());
      }
    }
    
    if (typeof normalized.ingredients === 'string') {
      try {
        normalized.ingredients = JSON.parse(normalized.ingredients);
      } catch {
        normalized.ingredients = normalized.ingredients.split('\n').filter((i: string) => i.trim());
      }
    }
    
    if (typeof normalized.instructions === 'string') {
      try {
        normalized.instructions = JSON.parse(normalized.instructions);
      } catch {
        normalized.instructions = normalized.instructions.split('\n').filter((i: string) => i.trim());
      }
    }
    
    return normalized;
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let recipesData: any[] = [];

      if (fileExtension === 'json') {
        // Parse JSON file
        const text = await file.text();
        const jsonData = JSON.parse(text);
        recipesData = Array.isArray(jsonData) ? jsonData : [jsonData];
      } else if (fileExtension === 'csv') {
        // Parse CSV file
        await new Promise((resolve, reject) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              recipesData = results.data;
              resolve(results);
            },
            error: (error) => reject(error)
          });
        });
      } else {
        toast.error("Unsupported file format. Please upload CSV or JSON files.");
        setImporting(false);
        return;
      }

      if (recipesData.length === 0) {
        toast.error("No recipes found in the file.");
        setImporting(false);
        return;
      }

      // Normalize and validate recipes
      const validRecipes: any[] = [];
      const errors: string[] = [];

      for (let i = 0; i < recipesData.length; i++) {
        try {
          const normalized = normalizeRecipeData(recipesData[i]);
          const validated = recipeSchema.parse(normalized);
          validRecipes.push(validated);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(`Row ${i + 1}: ${error.errors.map(e => e.message).join(', ')}`);
          } else {
            errors.push(`Row ${i + 1}: Invalid data format`);
          }
        }
      }

      if (validRecipes.length === 0) {
        toast.error("No valid recipes found. Please check the file format.");
        if (errors.length > 0) {
          console.error("Validation errors:", errors);
        }
        setImporting(false);
        return;
      }

      // Check for existing recipes
      const { data: existingRecipes } = await supabase
        .from("recipes")
        .select("title");
      
      const existingTitles = new Set(existingRecipes?.map(r => r.title) || []);
      const newRecipes = validRecipes.filter(recipe => !existingTitles.has(recipe.title));

      if (newRecipes.length === 0) {
        toast.info("All recipes from the file already exist in the database!");
        setImporting(false);
        return;
      }

      // Insert new recipes
      const { error } = await supabase.from("recipes").insert(newRecipes);
      
      if (error) throw error;

      toast.success(`✅ Successfully imported ${newRecipes.length} new recipes!`);
      if (validRecipes.length - newRecipes.length > 0) {
        toast.info(`${validRecipes.length - newRecipes.length} duplicate recipes were skipped.`);
      }
      if (errors.length > 0) {
        toast.warning(`${errors.length} recipes had validation errors and were skipped.`);
      }

      fetchRecipes();
    } catch (error: any) {
      console.error("Import error:", error);
      toast.error("Failed to import recipes: " + error.message);
    } finally {
      setImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `title,description,meal_type,diet_type,calories,protein,carbs,fats,fiber,difficulty,prep_time,cook_time,access_level,goal_category,tags,ingredients,instructions,image_url
"Sample Paneer Tikka","Grilled cottage cheese marinated in spices",lunch,veg,280,18,12,16,3,Medium,15,20,guest,maintenance,"high protein,indian","200 gm paneer cubed|2 tablespoon yogurt|1 tablespoon ginger-garlic paste|1 teaspoon garam masala|Salt to taste","Marinate paneer with yogurt and spices for 30 minutes|Thread onto skewers|Grill for 15-20 minutes until golden|Serve hot with chutney",https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8
"Sample Chicken Salad","Healthy grilled chicken with fresh vegetables",dinner,non_veg,320,38,15,10,6,Easy,10,15,logged_in,weight_loss,"high protein,low calorie","200 gm chicken breast|Mixed greens 2 cups|1 cucumber diced|1 tomato diced|2 tablespoon olive oil|Lemon juice","Grill chicken breast until cooked through|Slice into strips|Toss with greens vegetables and dressing|Serve fresh",https://images.unsplash.com/photo-1546069901-ba9599a7e63c`;
    
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipe_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Sample CSV template downloaded!");
  };

  const downloadSampleJSON = () => {
    const sampleJSON = [
      {
        title: "Sample Paneer Tikka",
        description: "Grilled cottage cheese marinated in spices",
        meal_type: "lunch",
        diet_type: "veg",
        calories: 280,
        protein: 18,
        carbs: 12,
        fats: 16,
        fiber: 3,
        difficulty: "Medium",
        prep_time: 15,
        cook_time: 20,
        access_level: "guest",
        goal_category: "maintenance",
        tags: ["high protein", "indian"],
        ingredients: [
          "200 gm paneer, cubed",
          "2 tablespoon yogurt",
          "1 tablespoon ginger-garlic paste",
          "1 teaspoon garam masala",
          "Salt to taste"
        ],
        instructions: [
          "Marinate paneer with yogurt and spices for 30 minutes",
          "Thread onto skewers",
          "Grill for 15-20 minutes until golden",
          "Serve hot with chutney"
        ],
        image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
      },
      {
        title: "Sample Chicken Salad",
        description: "Healthy grilled chicken with fresh vegetables",
        meal_type: "dinner",
        diet_type: "non_veg",
        calories: 320,
        protein: 38,
        carbs: 15,
        fats: 10,
        fiber: 6,
        difficulty: "Easy",
        prep_time: 10,
        cook_time: 15,
        access_level: "logged_in",
        goal_category: "weight_loss",
        tags: ["high protein", "low calorie"],
        ingredients: [
          "200 gm chicken breast",
          "Mixed greens, 2 cups",
          "1 cucumber, diced",
          "1 tomato, diced",
          "2 tablespoon olive oil",
          "Lemon juice"
        ],
        instructions: [
          "Grill chicken breast until cooked through",
          "Slice into strips",
          "Toss with greens, vegetables, and dressing",
          "Serve fresh"
        ],
        image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      }
    ];
    
    const blob = new Blob([JSON.stringify(sampleJSON, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipe_template.json';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Sample JSON template downloaded!");
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

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch recipes");
      return;
    }
    setRecipes(data as Recipe[] || []);
  };

  const deleteRecipe = async (id: string) => {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete recipe");
      return;
    }
    toast.success("Recipe deleted successfully");
    fetchRecipes();
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
      published: false,
      meta_title: "",
      meta_description: "",
      og_image: "",
      schema_markup: {}
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
      published: post.published,
      meta_title: (post as any).meta_title || "",
      meta_description: (post as any).meta_description || "",
      og_image: (post as any).og_image || "",
      schema_markup: (post as any).schema_markup || {}
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Content Management</h1>
          <div className="flex gap-2">
            <Button onClick={seedSampleData} variant="outline" disabled={seeding}>
              <Database className="h-4 w-4 mr-2" />
              {seeding ? "Seeding..." : "Seed Blog Data"}
            </Button>
            <Button onClick={seedRecipes} variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Seed 100+ Recipes
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="seo">SEO & Sitemaps</TabsTrigger>
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
                  <div className="mb-16">
                    <Label htmlFor="content">Content</Label>
                    <ReactQuill
                      theme="snow"
                      value={postForm.content}
                      onChange={(value) => setPostForm({ ...postForm, content: value })}
                      modules={quillModules}
                      className="bg-background"
                      style={{ height: "400px" }}
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
                  
                  {/* SEO Fields Section */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                          id="meta_title"
                          value={postForm.meta_title}
                          onChange={(e) => setPostForm({ ...postForm, meta_title: e.target.value })}
                          placeholder="Leave empty to use post title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Textarea
                          id="meta_description"
                          value={postForm.meta_description}
                          onChange={(e) => setPostForm({ ...postForm, meta_description: e.target.value })}
                          placeholder="Leave empty to use excerpt"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="og_image">OG Image URL</Label>
                        <Input
                          id="og_image"
                          value={postForm.og_image}
                          onChange={(e) => setPostForm({ ...postForm, og_image: e.target.value })}
                          placeholder="Leave empty to use post image"
                        />
                      </div>
                    </div>
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
                            published: false,
                            meta_title: "",
                            meta_description: "",
                            og_image: "",
                            schema_markup: {}
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

          <TabsContent value="recipes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recipe Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View and manage all recipes in the database. Click on a recipe to view details on the recipes page.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={seedRecipes} className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Seed 100+ Recipes
                  </Button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="recipe-import"
                      accept=".csv,.json"
                      onChange={handleFileImport}
                      className="hidden"
                      disabled={importing}
                    />
                    <Button 
                      onClick={() => document.getElementById('recipe-import')?.click()}
                      variant="outline"
                      disabled={importing}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {importing ? "Importing..." : "Import from CSV/JSON"}
                    </Button>
                  </div>

                  <Button 
                    onClick={downloadSampleCSV}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    CSV Template
                  </Button>

                  <Button 
                    onClick={downloadSampleJSON}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    JSON Template
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Import Format Requirements:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Accepts CSV or JSON files (max 20MB)</li>
                    <li><strong>Required fields:</strong> title, description, meal_type, diet_type, calories, protein, carbs, fats</li>
                    <li><strong>meal_type:</strong> breakfast, lunch, dinner, snack, or snack2</li>
                    <li><strong>diet_type:</strong> veg or non_veg</li>
                    <li><strong>goal_category:</strong> weight_gain, weight_loss, or maintenance</li>
                    <li><strong>CSV format:</strong> Use pipe (|) to separate array items in ingredients/instructions columns</li>
                    <li><strong>JSON format:</strong> Use proper arrays for ingredients, instructions, and tags</li>
                    <li>Duplicate recipes (by title) are automatically skipped</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4 flex-1">
                      {recipe.image_url && (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{recipe.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-sm text-muted-foreground">
                            {recipe.diet_type === "veg" ? "🥗 Veg" : "🍗 Non-Veg"}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground capitalize">
                            {recipe.meal_type}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {recipe.calories} kcal
                          </span>
                          {(recipe as any).goal_category && (
                            <>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground capitalize">
                                {(recipe as any).goal_category.replace('_', ' ')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => editRecipe(recipe)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(`/recipe/${recipe.id}`, '_blank')}
                      >
                        View
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteRecipe(recipe.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <RecipeEditDialog
              recipe={selectedRecipe}
              open={recipeEditOpen}
              onOpenChange={setRecipeEditOpen}
              onSaved={fetchRecipes}
            />
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SitemapManager />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default BlogAdmin;
