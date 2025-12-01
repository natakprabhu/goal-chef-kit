import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating complete sitemap with all content...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = 'https://goalchef.in';
    const currentDate = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/sign-in', priority: '0.7', changefreq: 'monthly' },
      { path: '/get-started', priority: '0.8', changefreq: 'monthly' },
      { path: '/recipes', priority: '0.9', changefreq: 'daily' },
      { path: '/blog', priority: '0.9', changefreq: 'daily' },
      { path: '/dashboard', priority: '0.6', changefreq: 'weekly' },
      { path: '/planner', priority: '0.6', changefreq: 'weekly' },
      { path: '/favorites', priority: '0.5', changefreq: 'weekly' },
      { path: '/my-progress', priority: '0.5', changefreq: 'weekly' },
    ];

    // Fetch all published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }

    // Fetch all guest-accessible recipes
    const { data: recipes, error: recipesError } = await supabase
      .from('recipes')
      .select('id, title, updated_at')
      .eq('access_level', 'guest')
      .order('updated_at', { ascending: false });

    if (recipesError) {
      console.error('Error fetching recipes:', recipesError);
    }

    console.log(`Found ${blogPosts?.length || 0} blog posts and ${recipes?.length || 0} recipes`);

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach((page) => {
      sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add blog posts
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        const lastmod = post.updated_at 
          ? new Date(post.updated_at).toISOString().split('T')[0]
          : currentDate;
        sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      });
    }

    // Add recipes
    if (recipes && recipes.length > 0) {
      recipes.forEach((recipe) => {
        const lastmod = recipe.updated_at 
          ? new Date(recipe.updated_at).toISOString().split('T')[0]
          : currentDate;
        sitemap += `  <url>
    <loc>${baseUrl}/recipes/${recipe.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    sitemap += '</urlset>';

    const totalUrls = staticPages.length + (blogPosts?.length || 0) + (recipes?.length || 0);
    console.log(`Complete sitemap generated with ${totalUrls} URLs`);

    // Save sitemap to Supabase Storage
    const encoder = new TextEncoder();
    const sitemapBytes = encoder.encode(sitemap);
    
    const { error: uploadError } = await supabase.storage
      .from('sitemaps')
      .upload('sitemap.xml', sitemapBytes, {
        contentType: 'application/xml',
        upsert: true, // Overwrite if exists
      });

    if (uploadError) {
      console.error('Error uploading sitemap to storage:', uploadError);
      // Still return the sitemap even if upload fails
    } else {
      console.log('Sitemap successfully saved to storage');
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('sitemaps')
      .getPublicUrl('sitemap.xml');

    return new Response(JSON.stringify({
      success: true,
      message: `Sitemap generated with ${totalUrls} URLs`,
      totalUrls,
      blogPosts: blogPosts?.length || 0,
      recipes: recipes?.length || 0,
      staticPages: staticPages.length,
      storageUrl: publicUrlData?.publicUrl,
      sitemap: sitemap,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating complete sitemap:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
