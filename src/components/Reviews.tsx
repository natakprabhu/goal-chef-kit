import React, { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
// Mock data mode: Supabase import commented out to prevent build errors in preview
// import { supabase } from "@/integrations/supabase/client";

// --- TYPES ---
type Review = {
  id: string;
  name: string;
  avatar_url?: string;
  rating: number;
  comment: string;
  date: string;
};

// --- HELPER: Google Logo Component ---
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- MOCK DATA ---
const MOCK_REVIEWS: Review[] = [
  { id: "1", name: "Aarav Patel", rating: 5, comment: "Finally a diet plan that includes my mom's dal chawal! Lost 3 kgs in 2 weeks.", date: "2 days ago" },
  { id: "2", name: "Diya Sharma", rating: 5, comment: "The paneer recipes are amazing. Didn't feel like I was dieting at all.", date: "1 week ago" },
  { id: "3", name: "Vihaan Kumar", rating: 5, comment: "Great for vegetarians. The protein tracking for veg meals is spot on.", date: "3 days ago" },
  { id: "4", name: "Aditi Mishra", rating: 5, comment: "Used this to get in shape for my brother's wedding. The saree fits perfectly now!", date: "Yesterday" },
  { id: "5", name: "Rohan Gupta", rating: 4, comment: "Love the chai-time snack alternatives. No more unhealthy biscuits.", date: "4 days ago" },
  { id: "6", name: "Sanya Luthra", rating: 5, comment: "The interface is so easy, even my mom uses it now for her sugar control.", date: "2 weeks ago" },
  { id: "7", name: "Ishaan Bose", rating: 5, comment: "Best app for Indian bulk diet. The soya chunks recipes are a game changer.", date: "5 days ago" },
  { id: "8", name: "Ananya Rao", rating: 5, comment: "Swapped regular roti for multigrain as suggested. Feel so much lighter.", date: "1 day ago" },
  { id: "9", name: "Kabir Tiwari", rating: 5, comment: "Navratri fasting plan was a surprise feature! Very thoughtful.", date: "3 weeks ago" },
  { id: "10", name: "Meera Nair", rating: 5, comment: "Helped me balance my macros with homemade food. Highly recommend.", date: "6 days ago" },
  { id: "11", name: "Arjun Verma", rating: 4, comment: "Finally understanding portion control with Indian thalis.", date: "1 week ago" },
  { id: "12", name: "Kavya Jain", rating: 5, comment: "The AI suggested amazing substitutes for heavy cream in butter chicken.", date: "2 days ago" },
  { id: "13", name: "Dhruv Chopra", rating: 5, comment: "Lost my belly fat without giving up my Sunday biryani. Just portioned it right.", date: "4 days ago" },
  { id: "14", name: "Zara Hussain", rating: 5, comment: "Perfect for working professionals in Bangalore. Quick 15-min recipes save my life.", date: "3 days ago" },
  { id: "15", name: "Vivaan Sethi", rating: 4, comment: "The monthly planner helped me organize my grocery list from BigBasket efficiently.", date: "1 week ago" },
  { id: "16", name: "Naira Kapoor", rating: 5, comment: "My PCOD symptoms have reduced significantly after following the low-carb Indian plan.", date: "5 days ago" },
  { id: "17", name: "Reyansh Pillai", rating: 5, comment: "Great integration of local seasonal fruits like mangoes and jamun.", date: "2 weeks ago" },
  { id: "18", name: "Saira Desai", rating: 4, comment: "I was skeptical about 'healthy' Indian food, but the masala oats recipe changed my mind.", date: "3 days ago" },
  { id: "19", name: "Ayaan Fernandes", rating: 5, comment: "The water tracker reminds me to drink between my chai breaks.", date: "1 day ago" },
  { id: "20", name: "Myra Goel", rating: 5, comment: "Loving the detailed breakdown of carbs in rotis vs rice.", date: "4 days ago" },
  { id: "21", name: "Krishna Iyer", rating: 5, comment: "The Swap feature is great when I run out of specific veggies.", date: "1 week ago" },
  { id: "22", name: "Pari Oberoi", rating: 5, comment: "Helped me manage my post-pregnancy weight with simple home-cooked meals.", date: "2 days ago" },
  { id: "23", name: "Atharv Qureshi", rating: 4, comment: "Good focus on fiber. The salad suggestions with desi twist are tasty.", date: "3 days ago" },
  { id: "24", name: "Aadhya Upadhyay", rating: 5, comment: "Finally, a diet app that understands we can't survive on boiled chicken and broccoli.", date: "Yesterday" },
  { id: "25", name: "Sai Waghmare", rating: 5, comment: "The graph showing my weight drop motivated me every morning.", date: "5 days ago" },
  { id: "26", name: "Kiara Yadav", rating: 5, comment: "Celebrated Diwali without guilt. The cheat meal management is practical.", date: "2 weeks ago" },
  { id: "27", name: "Mohammed Zaidi", rating: 5, comment: "Great non-veg options. The grilled fish marinade recipe is top-notch.", date: "1 week ago" },
  { id: "28", name: "Fatima Ansari", rating: 5, comment: "The customized plan for Ramadan fasting was incredibly helpful.", date: "3 weeks ago" },
  { id: "29", name: "Shaurya Bisht", rating: 4, comment: "User interface is buttery smooth, just like the (limited) ghee in my diet!", date: "4 days ago" },
  { id: "30", name: "Shanaya Chawla", rating: 5, comment: "My husband and I are both using it. We cook one meal that fits both our goals.", date: "2 days ago" },
  { id: "31", name: "Ibrahim Dalal", rating: 5, comment: "The grocery list feature sorts items by aisle, saves time at the local kirana store.", date: "1 day ago" },
  { id: "32", name: "Riya Edwin", rating: 4, comment: "I travel a lot for work. The 'eating out' guide for Indian restaurants is a lifesaver.", date: "3 days ago" },
  { id: "33", name: "Veer Farooqui", rating: 5, comment: "Protein intake was always a worry for me as a vegetarian. Problem solved.", date: "1 week ago" },
  { id: "34", name: "Samaira Gandhi", rating: 5, comment: "The reminders are gentle, not annoying like other apps.", date: "5 days ago" },
  { id: "35", name: "Yuvraj Hegde", rating: 5, comment: "Incorporated my evening badminton session into the calorie burn perfectly.", date: "2 weeks ago" },
  { id: "36", name: "Amara Iyengar", rating: 5, comment: "Simple, effective, and tailored for the Indian palate. 5 stars!", date: "Yesterday" },
  { id: "37", name: "Darsh Joshi", rating: 4, comment: "The detailed nutritional info for South Indian breakfast items like Idli/Dosa is very accurate.", date: "3 days ago" },
  { id: "38", name: "Jhanvi Khanna", rating: 5, comment: "Love the community support. Feels like a family motivating each other.", date: "4 days ago" },
  { id: "39", name: "Eshaan Lal", rating: 5, comment: "No fancy ingredients required. Everything is available in my kitchen.", date: "1 week ago" },
  { id: "40", name: "Prisha Malhotra", rating: 5, comment: "The smoothie recipes using dahi and seasonal fruits are refreshing.", date: "2 days ago" },
  { id: "41", name: "Laksh Nanda", rating: 4, comment: "Tracked my calcium intake and realized I needed more milk/curd. Good insights.", date: "3 days ago" },
  { id: "42", name: "Sara Oswal", rating: 5, comment: "The 'Quick Actions' to log yesterday's dinner saved my streak many times.", date: "1 day ago" },
  { id: "43", name: "Manish Pandey", rating: 5, comment: "Affordable subscription for the value provided. Cheaper than a personal dietitian.", date: "5 days ago" },
  { id: "44", name: "Tara Qasim", rating: 5, comment: "My skin has cleared up since I started this clean eating plan.", date: "2 weeks ago" },
  { id: "45", name: "Hridhaan Reddy", rating: 5, comment: "The step-by-step cooking instructions are great for a beginner cook like me.", date: "3 days ago" },
  { id: "46", name: "Vanya Singh", rating: 5, comment: "Finally shed those extra kilos gained during the lockdown.", date: "Yesterday" },
  { id: "47", name: "Gautam Trivedi", rating: 4, comment: "Precise macro counting for Indian curries is hard, but GoalChef makes it easy.", date: "4 days ago" },
  { id: "48", name: "Anika Unni", rating: 5, comment: "The app loads fast even on my older phone. Very optimized.", date: "1 week ago" },
  { id: "49", name: "Dev Varma", rating: 5, comment: "I've recommended this to all my colleagues at the IT park.", date: "2 days ago" },
  { id: "50", name: "Navya Wadhwa", rating: 5, comment: "GoalChef is now part of my daily morning routine. Can't imagine my day without it.", date: "3 days ago" },
];

// --- INTERNAL COMPONENT (Not Exported) ---
// This is a helper component just for this file.
const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 w-full mb-4 break-inside-avoid relative">
    {/* Google G Logo (Absolute Positioned) */}
    <div className="absolute top-4 right-4">
      <GoogleLogo />
    </div>

    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
        {review.avatar_url ? (
          <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-bold text-gray-600 text-sm">{review.name.charAt(0)}</span>
        )}
      </div>
      <div>
        <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < review.rating ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-gray-200 text-gray-200"}`}
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">• {review.date}</span>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed font-normal">{review.comment}</p>
  </div>
);

const MarqueeColumn = ({ 
  reviews, 
  duration = "40s", 
  reverse = false 
}: { 
  reviews: Review[]; 
  duration?: string; 
  reverse?: boolean 
}) => (
  <div className="relative flex flex-col overflow-hidden h-[600px] group">
    {/* Inner moving container */}
    <div 
      className={`flex flex-col gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      style={{ animationDuration: duration }}
    >
      {/* Duplicate the list to create seamless loop */}
      {[...reviews, ...reviews].map((review, i) => (
        <ReviewCard key={`${review.id}-${i}`} review={review} />
      ))}
    </div>
    {/* Gradient masks for smooth fade in/out */}
    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
  </div>
);

// Utility to randomize reviews so every page load feels fresh
const shuffleArray = (array: Review[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- MAIN COMPONENT ---
// This is the component you import as "Reviews" in your other files
const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch from Supabase + Randomize on Load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 1. Randomize Mock Data First (Instant Load)
        setReviews(shuffleArray(MOCK_REVIEWS));

        // 2. Try Fetching Real Data (Supabase code commented out for safety)
        /*
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .limit(50)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mappedReviews: Review[] = data.map((item: any) => ({
            id: item.id,
            name: item.user_name || "Anonymous",
            rating: item.rating || 5,
            comment: item.comment || item.content || "",
            date: new Date(item.created_at).toLocaleDateString(),
            avatar_url: item.avatar_url
          }));
          setReviews(shuffleArray(mappedReviews));
        }
        */
      } catch (e) {
        console.log("Using mock data due to connection issue:", e);
      }
    };

    fetchReviews();
  }, []);

  // Split reviews into 3 columns for the masonry effect
  const chunk1 = reviews.slice(0, Math.ceil(reviews.length / 3));
  const chunk2 = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil(2 * reviews.length / 3));
  const chunk3 = reviews.slice(Math.ceil(2 * reviews.length / 3));

  return (
    <section className="py-20 bg-background overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Healthy Eaters
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what the community is saying about their GoalChef journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <MarqueeColumn reviews={chunk1} duration="120s" />
          {/* Middle column moves slower and in reverse direction for visual interest */}
          <MarqueeColumn reviews={chunk2} duration="140s" reverse={true} />
          {/* Third column hidden on mobile for better space management */}
          <div className="hidden lg:block">
            <MarqueeColumn reviews={chunk3} duration="130s" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
