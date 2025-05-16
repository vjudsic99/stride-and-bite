
import React from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { calculateCalorieBalance, formatNumber } from "@/utils/healthCalculations";
import { Progress } from "@/components/ui/progress";

const CalorieTracker: React.FC = () => {
  const { caloriesBurned, caloriesConsumed, goals } = useHealth();
  
  // Calculate balance and percentages
  const calorieBalance = calculateCalorieBalance(caloriesBurned, caloriesConsumed);
  const burnProgress = Math.min((caloriesBurned / goals.caloriesBurn) * 100, 100);
  const intakeProgress = Math.min((caloriesConsumed / goals.caloriesIntake) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center mb-4">
        <BarChart3 className="mr-2 text-health-primary" size={24} />
        <h2 className="text-xl font-semibold">Calorie Balance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="stat-card">
          <span className="stat-label">Burned</span>
          <div className="flex items-baseline mt-2">
            <span className="stat-value text-health-primary">{formatNumber(caloriesBurned)}</span>
            <span className="text-sm text-gray-500 ml-1">cal</span>
          </div>
          <Progress value={burnProgress} className="h-1.5 mt-3" />
          <span className="text-xs text-gray-500 mt-1">
            Goal: {formatNumber(goals.caloriesBurn)} cal
          </span>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Consumed</span>
          <div className="flex items-baseline mt-2">
            <span className="stat-value text-health-warning">{formatNumber(caloriesConsumed)}</span>
            <span className="text-sm text-gray-500 ml-1">cal</span>
          </div>
          <Progress value={intakeProgress} className="h-1.5 mt-3 bg-gray-100" 
            indicatorClassName="bg-health-warning" />
          <span className="text-xs text-gray-500 mt-1">
            Goal: {formatNumber(goals.caloriesIntake)} cal
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Calorie Balance</span>
          <div className="flex items-center mt-1">
            <span className={`text-xl font-bold ${calorieBalance >= 0 ? 'text-health-success' : 'text-health-danger'}`}>
              {calorieBalance >= 0 ? '+' : ''}{formatNumber(calorieBalance)}
            </span>
            <span className="text-sm text-gray-500 ml-1">cal</span>
          </div>
        </div>
        
        {calorieBalance >= 0 ? (
          <div className="flex items-center text-health-success">
            <TrendingUp size={24} />
            <span className="ml-1 font-medium">Deficit</span>
          </div>
        ) : (
          <div className="flex items-center text-health-danger">
            <TrendingDown size={24} />
            <span className="ml-1 font-medium">Surplus</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieTracker;
