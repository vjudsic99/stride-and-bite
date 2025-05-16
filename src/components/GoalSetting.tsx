
import React, { useState } from "react";
import { Flag, Save } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GoalSetting: React.FC = () => {
  const { goals, setGoals } = useHealth();
  const [open, setOpen] = useState(false);
  const [newGoals, setNewGoals] = useState(goals);
  const { toast } = useToast();

  const handleSaveGoals = () => {
    // Validate inputs
    if (
      newGoals.steps <= 0 ||
      newGoals.caloriesIntake <= 0 ||
      newGoals.caloriesBurn <= 0
    ) {
      toast({
        title: "Invalid values",
        description: "All goals must be positive numbers.",
        variant: "destructive",
      });
      return;
    }

    setGoals(newGoals);
    setOpen(false);
    toast({
      title: "Goals updated",
      description: "Your health goals have been updated successfully.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Flag className="mr-2 text-health-primary" size={24} />
          <h2 className="text-xl font-semibold">Daily Goals</h2>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Goals</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Your Health Goals</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Steps Goal</label>
                <Input
                  type="number"
                  value={newGoals.steps}
                  onChange={(e) =>
                    setNewGoals({
                      ...newGoals,
                      steps: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Calorie Intake Goal</label>
                <Input
                  type="number"
                  value={newGoals.caloriesIntake}
                  onChange={(e) =>
                    setNewGoals({
                      ...newGoals,
                      caloriesIntake: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Calorie Burn Goal</label>
                <Input
                  type="number"
                  value={newGoals.caloriesBurn}
                  onChange={(e) =>
                    setNewGoals({
                      ...newGoals,
                      caloriesBurn: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button
                className="w-full bg-health-primary hover:bg-health-dark flex items-center"
                onClick={handleSaveGoals}
              >
                <Save size={16} className="mr-2" />
                Save Goals
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <Activity className="mr-2 text-health-primary" size={16} />
            <h3 className="font-medium">Steps</h3>
          </div>
          <p className="text-2xl font-bold">{goals.steps.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Daily target</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <UtensilsCrossed className="mr-2 text-health-warning" size={16} />
            <h3 className="font-medium">Calorie Intake</h3>
          </div>
          <p className="text-2xl font-bold">{goals.caloriesIntake.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Daily target</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <Flame className="mr-2 text-health-danger" size={16} />
            <h3 className="font-medium">Calorie Burn</h3>
          </div>
          <p className="text-2xl font-bold">{goals.caloriesBurn.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Daily target</p>
        </div>
      </div>
    </div>
  );
};

import { Activity, UtensilsCrossed, Flame } from "lucide-react";

export default GoalSetting;
