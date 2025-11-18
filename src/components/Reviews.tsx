import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "GoalChef transformed my eating habits! Lost 8 kg in 3 months with their personalized meal plans.",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "The AI meal planner is incredible. It understands my dietary restrictions perfectly. Highly recommended!",
      avatar: "RK"
    },
    {
      name: "Anita Desai",
      location: "Bangalore",
      rating: 5,
      text: "Best nutrition app I've used. The recipes are authentic Indian and so easy to follow. Love it!",
      avatar: "AD"
    },
    {
      name: "Vikram Singh",
      location: "Pune",
      rating: 5,
      text: "Finally achieved my fitness goals thanks to GoalChef. The precision nutrition tracking is game-changing!",
      avatar: "VS"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Loved by Thousands of Indians
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our community of health-conscious people transforming their lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{review.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
