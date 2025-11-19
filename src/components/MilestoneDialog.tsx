import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trophy } from "lucide-react";

type MilestoneDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (notes?: string) => void;
  mealName?: string;
};

const motivationalQuotes = [
  '"Take care of your body. It\'s the only place you have to live." - Jim Rohn',
  '"The only bad workout is the one that didn\'t happen." - Arnold Schwarzenegger',
  '"Your body can stand almost anything. It\'s your mind you have to convince." - Arnold Schwarzenegger',
  '"The groundwork for all happiness is good health." - Leigh Hunt',
  '"To keep the body in good health is a duty." - Buddha',
  '"Physical fitness is not only one of the most important keys to a healthy body, but it is also the basis of dynamic and creative intellectual activity." - John F. Kennedy',
  '"The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison." - Ann Wigmore',
];

export const MilestoneDialog = ({ open, onOpenChange, onConfirm, mealName }: MilestoneDialogProps) => {
  const [notes, setNotes] = useState("");
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Confirm Milestone
          </DialogTitle>
          <DialogDescription>
            {mealName 
              ? `Did you strictly follow the ${mealName} meal plan?`
              : "Did you strictly follow the entire day's meal plan?"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm italic text-foreground">{quote}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Yes, I Followed It! 💪
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
