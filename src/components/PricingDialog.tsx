import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PricingDialog = ({ open, onOpenChange }: PricingDialogProps) => {
  const { isSubscribed } = useSubscription();

  const plans = {
    basic: {
      name: "Basic",
      badge: "Free",
      description: "Essential tools for tracking and simple meal planning.",
      features: [
        "Standard Recipe Collection",
        "Manual Meal Logging",
        "Last 30 Days Progress",
        "Basic Weight Analytics",
        "Today's Meal View"
      ]
    },
    premium: {
      name: "Premium",
      badge: "Pro",
      description: "Advanced AI tools, full flexibility, and deep insights.",
      features: [
        "Full Recipe Access + Premium Collection",
        "AI Ingredient Scanner",
        "Unlimited Progress History",
        "Weight + Macro & BMI Charts",
        "Weekly View + Recipe Swapping"
      ]
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Unlock premium features and take control of your nutrition journey
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Basic Plan */}
          <Card className="relative border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">{plans.basic.name}</CardTitle>
                <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                  {plans.basic.badge}
                </span>
              </div>
              <CardDescription className="text-base">
                {plans.basic.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plans.basic.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-primary shadow-lg">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Most Popular
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">{plans.premium.name}</CardTitle>
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  {plans.premium.badge}
                </span>
              </div>
              <CardDescription className="text-base">
                {plans.premium.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plans.premium.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Active Plan
                  </>
                ) : (
                  "Upgrade to Pro"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-3">Feature Comparison</h4>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-4 font-medium border-b pb-2">
              <div>Feature</div>
              <div>Basic (Free)</div>
              <div>Premium (Pro)</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <div>Recipes</div>
              <div>Standard</div>
              <div className="font-medium text-amber-600">Full Access</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <div>Meal Logging</div>
              <div>Manual</div>
              <div className="font-medium text-amber-600">AI Scanner</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <div>Progress History</div>
              <div>30 Days</div>
              <div className="font-medium text-amber-600">Unlimited</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <div>Analytics</div>
              <div>Weight Only</div>
              <div className="font-medium text-amber-600">Full Dashboard</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <div>Meal Planner</div>
              <div>Today's View</div>
              <div className="font-medium text-amber-600">Weekly + Swap</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialog;
