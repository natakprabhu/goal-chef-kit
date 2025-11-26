import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const SitemapManager = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<any>(null);

  const projectId = "kaqjnyjkosefosbncwki";
  
  const sitemaps = [
    { name: "Sitemap Index", url: `https://${projectId}.supabase.co/functions/v1/sitemap-index` },
    { name: "Static Pages", url: `https://${projectId}.supabase.co/functions/v1/sitemap-static` },
    { name: "Blog Posts", url: `https://${projectId}.supabase.co/functions/v1/sitemap-blog` },
    { name: "Recipes", url: `https://${projectId}.supabase.co/functions/v1/sitemap-recipes` },
  ];

  const handleSubmitToSearchEngines = async () => {
    setIsSubmitting(true);
    try {
      toast.info("Submitting sitemap to search engines...");
      
      const { data, error } = await supabase.functions.invoke('submit-sitemap', {
        body: { manual: true },
      });

      if (error) throw error;

      setLastSubmission(data);
      
      if (data?.results?.google?.success || data?.results?.bing?.success) {
        toast.success("Sitemap submitted successfully!");
      } else {
        toast.warning("Sitemap submission completed with warnings. Check results below.");
      }
    } catch (error) {
      console.error("Error submitting sitemap:", error);
      toast.error("Failed to submit sitemap to search engines");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Sitemap Management
          </CardTitle>
          <CardDescription>
            Manage and submit sitemaps to search engines for better SEO indexing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Available Sitemaps */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Available Sitemaps</h3>
            <div className="grid gap-2">
              {sitemaps.map((sitemap) => (
                <div key={sitemap.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">{sitemap.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={sitemap.url} target="_blank" rel="noopener noreferrer">
                      View <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Submission */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Submit to Search Engines</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Manually notify Google and Bing about sitemap updates. Automatic submissions happen when new content is published.
            </p>
            <Button
              onClick={handleSubmitToSearchEngines}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Submit Now
                </>
              )}
            </Button>
          </div>

          {/* Last Submission Results */}
          {lastSubmission && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Last Submission Results</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {lastSubmission.results?.google?.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">Google Search Console</span>
                  </div>
                  <Badge variant={lastSubmission.results?.google?.success ? "default" : "destructive"}>
                    {lastSubmission.results?.google?.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                {lastSubmission.results?.google?.message && (
                  <p className="text-xs text-muted-foreground pl-3">
                    {lastSubmission.results.google.message}
                  </p>
                )}

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {lastSubmission.results?.bing?.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">Bing Webmaster Tools</span>
                  </div>
                  <Badge variant={lastSubmission.results?.bing?.success ? "default" : "destructive"}>
                    {lastSubmission.results?.bing?.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                {lastSubmission.results?.bing?.message && (
                  <p className="text-xs text-muted-foreground pl-3">
                    {lastSubmission.results.bing.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Information */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Automatic Notifications</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Search engines are automatically notified when blog posts are published</li>
              <li>• Recipe additions trigger automatic sitemap updates</li>
              <li>• Database triggers handle real-time notifications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
