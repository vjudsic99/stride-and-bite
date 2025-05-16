
import React from "react";
import Layout from "@/components/Layout";
import ProgressCharts from "@/components/ProgressCharts";
import GoalSetting from "@/components/GoalSetting";
import { HealthProvider } from "@/context/HealthContext";
import { useHealth } from "@/context/HealthContext";

const ProgressPage: React.FC = () => {
  return (
    <HealthProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Progress & Goals</h1>
          <p className="text-gray-500">Review your achievements and set new targets</p>
          
          <div className="grid grid-cols-1 gap-6">
            <GoalSetting />
            <ProgressCharts />
            <ProgressSummary />
          </div>
        </div>
      </Layout>
    </HealthProvider>
  );
};

const ProgressSummary: React.FC = () => {
  const { dailyLogs } = useHealth();
  
  // Calculate summary statistics
  const totalSteps = dailyLogs.reduce((sum, day) => sum + day.steps, 0);
  const totalCaloriesBurned = dailyLogs.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalCaloriesConsumed = dailyLogs.reduce((sum, day) => sum + day.caloriesConsumed, 0);
  
  // Calculate averages
  const avgSteps = dailyLogs.length > 0 ? Math.round(totalSteps / dailyLogs.length) : 0;
  const avgCaloriesBurned = dailyLogs.length > 0 ? Math.round(totalCaloriesBurned / dailyLogs.length) : 0;
  const avgCaloriesConsumed = dailyLogs.length > 0 ? Math.round(totalCaloriesConsumed / dailyLogs.length) : 0;
  
  // Find best day (most steps)
  const bestDay = dailyLogs.length > 0 ? 
    dailyLogs.reduce((max, day) => day.steps > max.steps ? day : max, dailyLogs[0]) : 
    null;
    
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4">Progress Summary</h2>
      
      {dailyLogs.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>No progress data available yet</p>
          <p className="text-sm">Continue tracking your activity to see your progress</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Average Daily Steps</p>
              <p className="text-2xl font-bold text-health-primary">{avgSteps.toLocaleString()}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Calories Burned</p>
              <p className="text-2xl font-bold text-health-success">{avgCaloriesBurned.toLocaleString()}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Calories Consumed</p>
              <p className="text-2xl font-bold text-health-warning">{avgCaloriesConsumed.toLocaleString()}</p>
            </div>
          </div>
          
          {bestDay && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Best Day</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {new Date(bestDay.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-lg font-bold mt-1">{bestDay.steps.toLocaleString()} steps</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Energy Balance</p>
                  <p className={`text-lg font-bold mt-1 ${
                    bestDay.caloriesBurned > bestDay.caloriesConsumed ? 'text-health-success' : 'text-health-danger'
                  }`}>
                    {(bestDay.caloriesBurned - bestDay.caloriesConsumed).toLocaleString()} calories
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h3 className="font-medium mb-2 text-indigo-800">Activity Totals</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Steps</p>
                <p className="text-xl font-bold">{totalSteps.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Calories Burned</p>
                <p className="text-xl font-bold">{totalCaloriesBurned.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Days Tracked</p>
                <p className="text-xl font-bold">{dailyLogs.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
