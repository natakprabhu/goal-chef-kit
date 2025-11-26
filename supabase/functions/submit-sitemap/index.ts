const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting sitemap submission to search engines...');

    const projectId = Deno.env.get('SUPABASE_URL')?.match(/https:\/\/(.+?)\.supabase\.co/)?.[1];
    const sitemapIndexUrl = `https://${projectId}.supabase.co/functions/v1/sitemap-index`;
    
    const googleApiKey = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY');
    const bingApiKey = Deno.env.get('BING_WEBMASTER_API_KEY');

    const results = {
      google: { success: false, message: '' },
      bing: { success: false, message: '' },
    };

    // Submit to Google Search Console (using Indexing API)
    if (googleApiKey && googleApiKey !== 'not-set') {
      try {
        console.log('Submitting to Google Search Console...');
        
        const googleResponse = await fetch(
          'https://indexing.googleapis.com/v3/urlNotifications:publish',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${googleApiKey}`,
            },
            body: JSON.stringify({
              url: 'https://goalchef.vercel.app',
              type: 'URL_UPDATED',
            }),
          }
        );

        if (googleResponse.ok) {
          console.log('Google Search Console submission successful');
          results.google = { 
            success: true, 
            message: 'Sitemap submitted successfully to Google' 
          };
        } else {
          const errorText = await googleResponse.text();
          console.error('Google submission failed:', errorText);
          results.google = { 
            success: false, 
            message: `Failed: ${googleResponse.status} - ${errorText}` 
          };
        }
      } catch (error) {
        console.error('Error submitting to Google:', error);
        results.google = { 
          success: false, 
          message: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    } else {
      console.log('Google API key not configured');
      results.google = { 
        success: false, 
        message: 'API key not configured' 
      };
    }

    // Submit to Bing Webmaster Tools
    if (bingApiKey && bingApiKey !== 'not-set') {
      try {
        console.log('Submitting to Bing Webmaster Tools...');
        
        const bingResponse = await fetch(
          `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${bingApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              siteUrl: 'https://goalchef.vercel.app',
              urlList: [sitemapIndexUrl],
            }),
          }
        );

        if (bingResponse.ok) {
          console.log('Bing Webmaster Tools submission successful');
          results.bing = { 
            success: true, 
            message: 'Sitemap submitted successfully to Bing' 
          };
        } else {
          const errorText = await bingResponse.text();
          console.error('Bing submission failed:', errorText);
          results.bing = { 
            success: false, 
            message: `Failed: ${bingResponse.status} - ${errorText}` 
          };
        }
      } catch (error) {
        console.error('Error submitting to Bing:', error);
        results.bing = { 
          success: false, 
          message: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    } else {
      console.log('Bing API key not configured');
      results.bing = { 
        success: false, 
        message: 'API key not configured' 
      };
    }

    console.log('Sitemap submission completed:', results);

    return new Response(
      JSON.stringify({
        message: 'Sitemap submission completed',
        results,
        sitemapUrl: sitemapIndexUrl,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in submit-sitemap function:', error);
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
