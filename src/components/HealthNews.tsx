import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const HealthNews = () => {
  const articles = [
    {
      title: "The Science Behind Protein Timing",
      description: "New research reveals the optimal times to consume protein for maximum muscle growth and recovery.",
      category: "Nutrition",
      readTime: "5 min read",
      source: "Health Journal"
    },
    {
      title: "Understanding Micronutrients",
      description: "Why vitamins and minerals are just as important as macros for your overall health and fitness goals.",
      category: "Wellness",
      readTime: "4 min read",
      source: "Nutrition Today"
    },
    {
      title: "Meal Prep Tips for Busy Professionals",
      description: "Expert strategies to prepare healthy meals in advance and stay on track with your nutrition goals.",
      category: "Lifestyle",
      readTime: "6 min read",
      source: "Fitness Magazine"
    },
    {
      title: "The Role of Fiber in Weight Management",
      description: "Learn how dietary fiber can help with satiety, digestion, and achieving your weight loss goals.",
      category: "Nutrition",
      readTime: "5 min read",
      source: "Diet Science"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health & Nutrition News</h2>
        <Badge variant="secondary">Updated Daily</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <Card key={index} className="border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/40 cursor-pointer group">
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
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{article.source}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthNews;
