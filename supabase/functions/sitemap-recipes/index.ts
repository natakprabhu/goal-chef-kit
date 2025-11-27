import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching guest recipes for sitemap...');

    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, updated_at, created_at, diet_type, meal_type')
      .eq('access_level', 'guest')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }

    console.log(`Found ${recipes?.length || 0} guest recipes`);

    const baseUrl = 'https://goalchef.in';
    const currentDate = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    if (recipes && recipes.length > 0) {
      recipes.forEach((recipe) => {
        const lastmod = recipe.updated_at
          ? new Date(recipe.updated_at).toISOString().split('T')[0]
          : recipe.created_at
          ? new Date(recipe.created_at).toISOString().split('T')[0]
          : currentDate;
        
        sitemap += `  <url>
    <loc>${baseUrl}/recipe/${recipe.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    sitemap += '</urlset>';

    console.log('Recipe sitemap generated successfully');

    return new Response(sitemap, {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error('Error generating recipe sitemap:', error);
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
