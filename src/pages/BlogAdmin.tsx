import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { Trash2, Edit, Database, Upload, Download, ShieldAlert, Search } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { sampleAuthors, getSamplePosts } from "../data/sampleBlogData";
import { sampleRecipes } from "../data/sampleRecipes";
import type { Recipe } from "../hooks/useRecipes";
import { z } from "zod";
import { SitemapManager } from "../components/SitemapManager";
import { useAdmin } from "../hooks/useAdmin";
import { RecipeEditDialog } from "../components/RecipeEditDialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

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

const ITEMS_PER_PAGE = 5;

// Simple CSV Parser Helper to replace papaparse
const parseCSV = (content: string) => {
  const lines = content.split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV split handling quotes
    const values: string[] = [];
    let inQuote = false;
    let currentValue = '';
    
    for (let char of line) {
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue);
    
    const row: any = {};
    headers.forEach((header, index) => {
      let val = values[index]?.trim() || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      row[header] = val;
    });
    data.push(row);
  }
  return data;
};

const BlogAdmin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();

  // --- State Declarations ---
  const [authors, setAuthors] = useState<Author[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [importing, setImporting] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeEditOpen, setRecipeEditOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Search & Pagination States
  const [postSearch, setPostSearch] = useState("");
  const [postPage, setPostPage] = useState(1);

  const [authorSearch, setAuthorSearch] = useState("");
  const [authorPage, setAuthorPage] = useState(1);

  const [recipeSearch, setRecipeSearch] = useState("");
  const [recipePage, setRecipePage] = useState(1);

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

  // --- Effects ---

  // Reset pagination when search changes
  useEffect(() => setPostPage(1), [postSearch]);
  useEffect(() => setAuthorPage(1), [authorSearch]);
  useEffect(() => setRecipePage(1), [recipeSearch]);

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

  // --- Data Fetching & Helpers ---

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

  // --- Filtering & Pagination Logic ---

  // Posts Logic
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(postSearch.toLowerCase()) ||
    post.category.toLowerCase().includes(postSearch.toLowerCase())
  );
  const totalPostPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((postPage - 1) * ITEMS_PER_PAGE, postPage * ITEMS_PER_PAGE);

  // Authors Logic
  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(authorSearch.toLowerCase())
  );
  const totalAuthorPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);
  const paginatedAuthors = filteredAuthors.slice((authorPage - 1) * ITEMS_PER_PAGE, authorPage * ITEMS_PER_PAGE);

  // Recipes Logic
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(recipeSearch.toLowerCase()) ||
    recipe.meal_type.toLowerCase().includes(recipeSearch.toLowerCase())
  );
  const totalRecipePages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice((recipePage - 1) * ITEMS_PER_PAGE, recipePage * ITEMS_PER_PAGE);

  // --- Action Handlers ---

  const editRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeEditOpen(true);
  };

  const seedSampleData = async () => {
    setSeeding(true);
    console.log("Starting blog seed...");
    try {
      // Delete existing data
      await supabase.from("blog_posts" as any).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from("blog_authors" as any).delete().neq('id', '00000000-0000-0000-0000-000000000000');

      console.log("Inserting authors...");
      const { data: authorsData, error: authorsError } = await supabase
        .from("blog_authors" as any)
        .insert(sampleAuthors)
        .select();

      if (authorsError) throw authorsError;
      
      const authorIds = (authorsData as any[]).map(a => a.id);
      console.log("Inserting posts...");
      
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts" as any)
        .insert(getSamplePosts(authorIds))
        .select();

      if (postsError) throw postsError;

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
      const { data: existingRecipes } = await supabase.from("recipes").select("title");
      const existingTitles = new Set(existingRecipes?.map(r => r.title) || []);
      const newRecipes = sampleRecipes.filter(recipe => !existingTitles.has(recipe.title));
      
      if (newRecipes.length === 0) {
        toast.info("All recipes already exist in the database!");
        return;
      }
      
      const recipesWithGoal = newRecipes.map(recipe => {
        let goal_category = 'maintenance';
        if (recipe.tags.some(tag => tag.toLowerCase().includes('weight gain'))) goal_category = 'weight_gain';
        else if (recipe.tags.some(tag => tag.toLowerCase().includes('weight loss'))) goal_category = 'weight_loss';
        else if (recipe.tags.some(tag => tag.toLowerCase().includes('diabetic'))) goal_category = 'diabetic_friendly';
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

  // Recipe Schema & Import Logic
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
    goal_category: z.enum(["weight_gain", "weight_loss", "maintenance", "diabetic_friendly"]).optional().nullable(),
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
    const normalized = { ...data };
    if (typeof normalized.calories === 'string') normalized.calories = parseFloat(normalized.calories);
    if (typeof normalized.protein === 'string') normalized.protein = parseFloat(normalized.protein);
    if (typeof normalized.carbs === 'string') normalized.carbs = parseFloat(normalized.carbs);
    if (typeof normalized.fats === 'string') normalized.fats = parseFloat(normalized.fats);
    if (typeof normalized.fiber === 'string') normalized.fiber = parseFloat(normalized.fiber);
    if (typeof normalized.prep_time === 'string') normalized.prep_time = parseInt(normalized.prep_time);
    if (typeof normalized.cook_time === 'string') normalized.cook_time = parseInt(normalized.cook_time);
    
    if (typeof normalized.tags === 'string') {
      try { normalized.tags = JSON.parse(normalized.tags); } 
      catch { normalized.tags = normalized.tags.split(',').map((t: string) => t.trim()); }
    }
    if (typeof normalized.ingredients === 'string') {
      try { normalized.ingredients = JSON.parse(normalized.ingredients); } 
      catch { normalized.ingredients = normalized.ingredients.split('\n').filter((i: string) => i.trim()); }
    }
    if (typeof normalized.instructions === 'string') {
      try { normalized.instructions = JSON.parse(normalized.instructions); } 
      catch { normalized.instructions = normalized.instructions.split('\n').filter((i: string) => i.trim()); }
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
        const text = await file.text();
        const jsonData = JSON.parse(text);
        recipesData = Array.isArray(jsonData) ? jsonData : [jsonData];
      } else if (fileExtension === 'csv') {
        const text = await file.text();
        recipesData = parseCSV(text);
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
        setImporting(false);
        return;
      }

      const { data: existingRecipes } = await supabase.from("recipes").select("title");
      const existingTitles = new Set(existingRecipes?.map(r => r.title) || []);
      const newRecipes = validRecipes.filter(recipe => !existingTitles.has(recipe.title));

      if (newRecipes.length === 0) {
        toast.info("All recipes from the file already exist in the database!");
        setImporting(false);
        return;
      }

      const { error } = await supabase.from("recipes").insert(newRecipes);
      if (error) throw error;

      toast.success(`✅ Successfully imported ${newRecipes.length} new recipes!`);
      fetchRecipes();
    } catch (error: any) {
      console.error("Import error:", error);
      toast.error("Failed to import recipes: " + error.message);
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `title,description,meal_type,diet_type,calories,protein,carbs,fats,fiber,difficulty,prep_time,cook_time,access_level,goal_category,tags,ingredients,instructions,image_url
"Sample Paneer Tikka","Grilled cottage cheese marinated in spices",lunch,veg,280,18,12,16,3,Medium,15,20,guest,maintenance,"high protein,indian","200 gm paneer cubed|2 tablespoon yogurt|1 tablespoon ginger-garlic paste|1 teaspoon garam masala|Salt to taste","Marinate paneer with yogurt and spices for 30 minutes|Thread onto skewers|Grill for 15-20 minutes until golden|Serve hot with chutney",https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8`;
    
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
    const sampleJSON = [{
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
      ingredients: ["200 gm paneer, cubed", "2 tablespoon yogurt"],
      instructions: ["Marinate paneer with yogurt and spices", "Grill until golden"],
      image_url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
    }];
    
    const blob = new Blob([JSON.stringify(sampleJSON, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipe_template.json';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Sample JSON template downloaded!");
  };

  // --- CRUD Handlers ---

  const deleteRecipe = async (id: string) => {
    const { error } = await supabase.from("recipes").delete().eq("id", id);
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
      const { error } = await supabase.from("blog_authors" as any).update(authorForm as any).eq("id", selectedAuthor.id);
      if (error) { toast.error("Failed to update author"); return; }
      toast.success("Author updated successfully");
    } else {
      const { error } = await supabase.from("blog_authors" as any).insert([authorForm as any]);
      if (error) { toast.error("Failed to create author"); return; }
      toast.success("Author created successfully");
    }
    setAuthorForm({ name: "", bio: "", credentials: "", image_url: "" });
    setSelectedAuthor(null);
    fetchAuthors();
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost) {
      const { error } = await supabase.from("blog_posts" as any).update(postForm as any).eq("id", selectedPost.id);
      if (error) { toast.error("Failed to update post"); return; }
      toast.success("Post updated successfully");
    } else {
      const { error } = await supabase.from("blog_posts" as any).insert([postForm as any]);
      if (error) { toast.error("Failed to create post"); return; }
      toast.success("Post created successfully");
    }
    setPostForm({
      title: "", slug: "", excerpt: "", content: "", category: "", read_time: "",
      image_url: "", author_id: "", published: false, meta_title: "", meta_description: "",
      og_image: "", schema_markup: {}
    });
    setSelectedPost(null);
    fetchPosts();
  };

  const deleteAuthor = async (id: string) => {
    const { error } = await supabase.from("blog_authors" as any).delete().eq("id", id);
    if (error) { toast.error("Failed to delete author"); return; }
    toast.success("Author deleted successfully");
    fetchAuthors();
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts" as any).delete().eq("id", id);
    if (error) { toast.error("Failed to delete post"); return; }
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

  // --- Render Helpers ---

  // Loading Screen
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

  // Access Denied Screen
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

  // Helper for Pagination UI
  const PaginationControls = ({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (p: number) => void }) => {
    if (totalPages <= 1) return null;
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={page === p} onClick={() => setPage(p)} className="cursor-pointer">{p}</PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 7 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          <PaginationItem>
            <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Content Management</h1>
            <p className="text-muted-foreground mt-2">Manage your blog posts, authors, and recipe database.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={seedSampleData} variant="outline" disabled={seeding}>
              <Database className="h-4 w-4 mr-2" />
              {seeding ? "Seeding..." : "Seed Blog Data"}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="seo">SEO & Sitemaps</TabsTrigger>
          </TabsList>
          
          {/* --- POSTS TAB --- */}
          <TabsContent value="posts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{selectedPost ? "Edit Post" : "Create New Post"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" value={postForm.slug} onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea id="excerpt" value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} required />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="content">Content (HTML)</Label>
                      <Textarea 
                        id="content" 
                        value={postForm.content} 
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} 
                        className="bg-background h-64 font-mono text-sm"
                        placeholder="<p>Enter your HTML content here...</p>"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Rich Text Editor unavailable in preview. Use HTML directly.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="read_time">Read Time</Label>
                        <Input id="read_time" value={postForm.read_time} onChange={(e) => setPostForm({ ...postForm, read_time: e.target.value })} placeholder="5 min read" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input id="image_url" value={postForm.image_url} onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <select id="author" value={postForm.author_id} onChange={(e) => setPostForm({ ...postForm, author_id: e.target.value })} className="w-full p-2 border rounded-md bg-background" required>
                          <option value="">Select an author</option>
                          {authors.map((author) => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-semibold mb-3">SEO Settings</h3>
                      <div className="space-y-3">
                        <Input placeholder="Meta Title" value={postForm.meta_title} onChange={(e) => setPostForm({ ...postForm, meta_title: e.target.value })} />
                        <Textarea placeholder="Meta Description" rows={2} value={postForm.meta_description} onChange={(e) => setPostForm({ ...postForm, meta_description: e.target.value })} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="published" checked={postForm.published} onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })} className="h-4 w-4" />
                        <Label htmlFor="published">Published</Label>
                      </div>
                      <div className="flex gap-2">
                         {selectedPost && <Button type="button" variant="ghost" onClick={() => { setSelectedPost(null); setPostForm({ title: "", slug: "", excerpt: "", content: "", category: "", read_time: "", image_url: "", author_id: "", published: false, meta_title: "", meta_description: "", og_image: "", schema_markup: {} }); }}>Cancel</Button>}
                        <Button type="submit">{selectedPost ? "Update" : "Create"} Post</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Right Column: List */}
              <div className="md:col-span-1 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search posts..." 
                    value={postSearch} 
                    onChange={(e) => setPostSearch(e.target.value)} 
                    className="pl-9"
                  />
                </div>
                <div className="space-y-3">
                  {paginatedPosts.length > 0 ? paginatedPosts.map((post) => (
                    <Card key={post.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1">{post.title}</h3>
                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                          <span>{post.category}</span>
                          <span className={post.published ? "text-green-600" : "text-amber-600"}>{post.published ? "Published" : "Draft"}</span>
                        </div>
                        <div className="flex gap-2 mt-3 justify-end">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => editPost(post)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => deletePost(post.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  )) : <div className="text-center text-muted-foreground py-8">No posts found</div>}
                </div>
                <PaginationControls page={postPage} totalPages={totalPostPages} setPage={setPostPage} />
              </div>
            </div>
          </TabsContent>
          
          {/* --- AUTHORS TAB --- */}
          <TabsContent value="authors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>{selectedAuthor ? "Edit Author" : "Add Author"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAuthorSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={authorForm.name} onChange={(e) => setAuthorForm({ ...authorForm, name: e.target.value })} required />
                    </div>
                    <div>
                      <Label htmlFor="credentials">Credentials</Label>
                      <Input id="credentials" value={authorForm.credentials} onChange={(e) => setAuthorForm({ ...authorForm, credentials: e.target.value })} placeholder="MSc Nutrition" required />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={authorForm.bio} onChange={(e) => setAuthorForm({ ...authorForm, bio: e.target.value })} rows={4} required />
                    </div>
                    <div>
                      <Label htmlFor="author_image">Image URL</Label>
                      <Input id="author_image" value={authorForm.image_url} onChange={(e) => setAuthorForm({ ...authorForm, image_url: e.target.value })} />
                    </div>
                    <div className="flex gap-2 justify-end">
                      {selectedAuthor && <Button type="button" variant="ghost" onClick={() => { setSelectedAuthor(null); setAuthorForm({ name: "", bio: "", credentials: "", image_url: "" }); }}>Cancel</Button>}
                      <Button type="submit">{selectedAuthor ? "Update" : "Add"}</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search authors..." 
                    value={authorSearch} 
                    onChange={(e) => setAuthorSearch(e.target.value)} 
                    className="pl-9"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paginatedAuthors.map((author) => (
                    <Card key={author.id}>
                      <CardContent className="p-4 flex items-start gap-4">
                        {author.image_url ? 
                          <img src={author.image_url} alt={author.name} className="w-12 h-12 rounded-full object-cover" /> :
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">{author.name.charAt(0)}</div>
                        }
                        <div className="flex-1">
                          <h3 className="font-semibold">{author.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{author.credentials}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-7" onClick={() => editAuthor(author)}>Edit</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive" onClick={() => deleteAuthor(author.id)}>Delete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <PaginationControls page={authorPage} totalPages={totalAuthorPages} setPage={setAuthorPage} />
              </div>
            </div>
          </TabsContent>

          {/* --- RECIPES TAB --- */}
          <TabsContent value="recipes" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recipe Database</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Manage, import, or seed recipes.</p>
                </div>
                <div className="flex gap-2">
                   <div className="relative">
                    <input type="file" id="recipe-import" accept=".csv,.json" onChange={handleFileImport} className="hidden" disabled={importing} />
                    <Button onClick={() => document.getElementById('recipe-import')?.click()} variant="outline" size="sm" disabled={importing}>
                      <Upload className="h-4 w-4 mr-2" /> {importing ? "Importing..." : "Import"}
                    </Button>
                  </div>
                  <Button onClick={downloadSampleCSV} variant="secondary" size="sm"><Download className="h-4 w-4 mr-2" /> CSV</Button>
                  <Button onClick={downloadSampleJSON} variant="secondary" size="sm"><Download className="h-4 w-4 mr-2" /> JSON</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search recipes by title, type, or tags..." 
                      value={recipeSearch} 
                      onChange={(e) => setRecipeSearch(e.target.value)} 
                      className="pl-9"
                    />
                  </div>
                  <Button onClick={seedRecipes} variant="default">
                    <Database className="h-4 w-4 mr-2" /> Seed 100+
                  </Button>
                 </div>

                 <div className="space-y-4">
                    {paginatedRecipes.length > 0 ? paginatedRecipes.map((recipe) => (
                      <Card key={recipe.id} className="overflow-hidden hover:bg-accent/5 transition-colors">
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4 flex-1">
                            {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="w-16 h-16 object-cover rounded-md" />}
                            <div>
                              <h3 className="font-semibold">{recipe.title}</h3>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground flex-wrap">
                                <span className="capitalize px-2 py-0.5 bg-muted rounded-full text-xs">{recipe.diet_type === 'non_veg' ? 'Non-Veg' : 'Veg'}</span>
                                <span className="capitalize px-2 py-0.5 bg-muted rounded-full text-xs">{recipe.meal_type}</span>
                                <span>{recipe.calories} kcal</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => editRecipe(recipe)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteRecipe(recipe.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                        No recipes found matching your search.
                      </div>
                    )}
                 </div>
                 <PaginationControls page={recipePage} totalPages={totalRecipePages} setPage={setRecipePage} />
              </CardContent>
            </Card>
            <RecipeEditDialog recipe={selectedRecipe} open={recipeEditOpen} onOpenChange={setRecipeEditOpen} onSaved={fetchRecipes} />
          </TabsContent>

          {/* --- SEO TAB --- */}
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
