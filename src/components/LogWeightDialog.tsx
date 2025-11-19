import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Scale } from "lucide-react";

interface LogWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWeightLogged?: () => void;
}

export const LogWeightDialog = ({ open, onOpenChange, onWeightLogged }: LogWeightDialogProps) => {
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to log weight");
      return;
    }

    if (!weight) {
      toast.error("Please enter your weight");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("user_progress_entries").insert({
        user_id: user.id,
        weight: parseFloat(weight),
        body_fat_percentage: bodyFat ? parseFloat(bodyFat) : null,
        milestone_notes: notes || null,
        entry_date: new Date().toISOString().split('T')[0]
      });

      if (error) throw error;

      toast.success("Weight logged successfully!");
      setWeight("");
      setBodyFat("");
      setNotes("");
      onOpenChange(false);
      onWeightLogged?.();
    } catch (error: any) {
      console.error("Error logging weight:", error);
      toast.error(error.message || "Failed to log weight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Log Today's Weight
          </DialogTitle>
          <DialogDescription>
            Track your weight progress over time
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="75.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyFat">Body Fat % (optional)</Label>
            <Input
              id="bodyFat"
              type="number"
              step="0.1"
              placeholder="18.5"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Feeling great today!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Logging..." : "Log Weight"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
