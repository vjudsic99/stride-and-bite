
import React from "react";
import Layout from "@/components/Layout";
import StepTracker from "@/components/StepTracker";
import { HealthProvider } from "@/context/HealthContext";
import { calculateCaloriesBurned } from "@/utils/healthCalculations";
import { useHealth } from "@/context/HealthContext";
import ProgressCharts from "@/components/ProgressCharts";

const StepsPage: React.FC = () => {
  return (
    <HealthProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Step Tracking</h1>
          <p className="text-gray-500">Monitor your daily activity and progress</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepTracker />
            <StepInfo />
          </div>
          
          <ProgressCharts />
        </div>
      </Layout>
    </HealthProvider>
  );
};

const StepInfo: React.FC = () => {
  const { steps, weight } = useHealth();
  
  // Calculate additional stats
  const caloriesBurned = calculateCaloriesBurned(steps, weight);
  const distance = (steps * 0.762) / 1000; // Rough estimate of distance in km (average stride)
  const activeMinutes = Math.round(steps / 100); // Rough estimate of active minutes
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4">Activity Stats</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Calories</p>
          <p className="text-2xl font-bold">{caloriesBurned}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Active Minutes</p>
          <p className="text-2xl font-bold">{activeMinutes}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg. Pace</p>
          <p className="text-2xl font-bold">
            {activeMinutes > 0 ? (distance / (activeMinutes / 60)).toFixed(1) : '0'} km/h
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-health-light">
        <h3 className="font-medium mb-2">Benefits of Walking</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• Improves cardiovascular health</li>
          <li>• Helps maintain healthy weight</li>
          <li>• Strengthens bones and muscles</li>
          <li>• Improves balance and coordination</li>
          <li>• Boosts mood and mental wellbeing</li>
        </ul>
      </div>
    </div>
  );
};

export default StepsPage;
