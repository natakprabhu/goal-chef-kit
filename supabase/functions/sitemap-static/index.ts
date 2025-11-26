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
    console.log('Generating static pages sitemap...');

    const baseUrl = 'https://goalchef.vercel.app';
    const currentDate = new Date().toISOString().split('T')[0];

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

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    staticPages.forEach((page) => {
      sitemap += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    sitemap += '</urlset>';

    console.log('Static sitemap generated successfully');

    return new Response(sitemap, {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error('Error generating static sitemap:', error);
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
