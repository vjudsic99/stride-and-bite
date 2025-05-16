
import React, { useState } from "react";
import { Activity, Plus, Minus } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { calculateCaloriesBurned, formatNumber } from "@/utils/healthCalculations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StepTracker: React.FC = () => {
  const { steps, setSteps, goals, weight, setCaloriesBurned } = useHealth();
  const [incrementAmount, setIncrementAmount] = useState<number>(1000);
  
  // Calculate progress percentage
  const progressPercentage = Math.min((steps / goals.steps) * 100, 100);
  
  // Handle step increment/decrement
  const handleStepsChange = (amount: number) => {
    const newSteps = Math.max(0, steps + amount);
    setSteps(newSteps);
    
    // Update calories burned based on steps
    const caloriesBurned = calculateCaloriesBurned(newSteps, weight);
    setCaloriesBurned(caloriesBurned);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center mb-4">
        <Activity className="mr-2 text-health-primary" size={24} />
        <h2 className="text-xl font-semibold">Step Counter</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center py-6">
        <div className="step-counter-ring w-40 h-40 mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="8"
              strokeDasharray={`${progressPercentage * 2.83} 283`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="progress-ring-circle"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-health-primary">{formatNumber(steps)}</span>
            <span className="text-sm text-gray-500">steps</span>
          </div>
        </div>

        <Progress value={progressPercentage} className="w-full h-2 mb-2" />
        <p className="text-sm text-gray-500 mb-6">
          {formatNumber(steps)} / {formatNumber(goals.steps)} steps
          <span className="ml-2 font-medium">
            ({Math.round(progressPercentage)}%)
          </span>
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleStepsChange(-incrementAmount)}
          >
            <Minus size={18} />
          </Button>
          
          <select
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value))}
            className="h-10 border rounded-md px-3 text-sm"
          >
            <option value="500">500 steps</option>
            <option value="1000">1000 steps</option>
            <option value="2000">2000 steps</option>
            <option value="5000">5000 steps</option>
          </select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleStepsChange(incrementAmount)}
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <Button 
          onClick={() => handleStepsChange(incrementAmount)}
          className="w-full bg-health-primary hover:bg-health-dark"
        >
          Add Steps
        </Button>
      </div>
    </div>
  );
};

export default StepTracker;
