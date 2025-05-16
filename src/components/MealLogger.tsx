
import React, { useState } from "react";
import { 
  Clock, 
  PlusCircle, 
  X, 
  Coffee, 
  Apple, 
  UtensilsCrossed, 
  Cookie
} from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { formatDate } from "@/utils/healthCalculations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mealCategories = [
  { value: 'breakfast', label: 'Breakfast', icon: Coffee },
  { value: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
  { value: 'dinner', label: 'Dinner', icon: UtensilsCrossed },
  { value: 'snack', label: 'Snack', icon: Cookie }
] as const;

const MealLogger: React.FC = () => {
  const { meals, addMeal, removeMeal } = useHealth();
  const [open, setOpen] = useState(false);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const { toast } = useToast();

  const handleAddMeal = () => {
    if (!mealName.trim() || !calories || isNaN(Number(calories))) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid meal name and calories.",
        variant: "destructive"
      });
      return;
    }

    addMeal({
      name: mealName.trim(),
      calories: Number(calories),
      time: new Date(),
      category,
    });
    
    setMealName('');
    setCalories('');
    setOpen(false);
    
    toast({
      title: "Meal added",
      description: `${mealName} (${calories} cal) has been logged.`,
    });
  };

  const handleRemoveMeal = (id: string, name: string) => {
    removeMeal(id);
    toast({
      title: "Meal removed",
      description: `${name} has been removed from your log.`,
    });
  };

  const getMealIcon = (category: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const mealCat = mealCategories.find(c => c.value === category);
    const Icon = mealCat ? mealCat.icon : Apple;
    return <Icon size={16} />;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Clock className="mr-2 text-health-primary" size={24} />
          <h2 className="text-xl font-semibold">Meal Log</h2>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-health-primary hover:bg-health-dark">
              <PlusCircle size={18} className="mr-1" /> Add Meal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meal Name</label>
                <Input
                  placeholder="e.g. Chicken Salad"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Calories</label>
                <Input
                  type="number"
                  placeholder="e.g. 350"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {mealCategories.map((cat) => (
                    <Button
                      key={cat.value}
                      type="button"
                      variant={category === cat.value ? "default" : "outline"}
                      className={category === cat.value ? "bg-health-primary hover:bg-health-dark" : ""}
                      onClick={() => setCategory(cat.value)}
                    >
                      <cat.icon className="mr-2" size={16} />
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-health-primary hover:bg-health-dark" onClick={handleAddMeal}>
                Add Meal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {meals.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Clock className="mx-auto mb-2 opacity-30" size={32} />
          <p>No meals logged today</p>
          <p className="text-sm">Click 'Add Meal' to log your food</p>
        </div>
      ) : (
        <div className="divide-y space-y-1">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-health-primary">
                  {getMealIcon(meal.category)}
                </div>
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(new Date(meal.time))} • {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-health-warning mr-4">
                  {meal.calories} cal
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-health-danger"
                  onClick={() => handleRemoveMeal(meal.id, meal.name)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealLogger;
