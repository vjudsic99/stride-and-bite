
import React from "react";
import { Heart, Lightbulb } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { generateInsights } from "@/utils/healthCalculations";
import StepTracker from "@/components/StepTracker";
import CalorieTracker from "@/components/CalorieTracker";
import MealLogger from "@/components/MealLogger";
import GoalSetting from "@/components/GoalSetting";

const Dashboard: React.FC = () => {
  const { steps, caloriesBurned, caloriesConsumed, goals } = useHealth();
  
  // Generate health insights based on user data
  const insights = generateInsights(steps, caloriesBurned, caloriesConsumed, goals.steps);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center bg-white rounded-xl shadow-sm p-5 gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <Heart />
          </div>
          <div>
            <h1 className="text-xl font-bold">Health Dashboard</h1>
            <p className="text-gray-500">Track your activity and nutrition</p>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-start gap-2">
            <Lightbulb className="text-yellow-500 mt-0.5" size={18} />
            <div>
              <h3 className="font-medium text-sm">Today's Insights</h3>
              <ul className="text-sm text-gray-600 space-y-1 mt-1">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StepTracker />
        <CalorieTracker />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MealLogger />
        </div>
        <div>
          <GoalSetting />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
