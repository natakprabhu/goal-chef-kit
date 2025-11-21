import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
  read_time: string | null;
  source: string | null;
}

const HealthNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("health_news")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(4);
      
      if (data) setArticles(data);
    };
    
    fetchNews();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health & Nutrition News</h2>
        <Badge variant="secondary">Updated Daily</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/40 cursor-pointer group h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{article.read_time}</span>
                  <span>•</span>
                  <span>{article.source}</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HealthNews;
