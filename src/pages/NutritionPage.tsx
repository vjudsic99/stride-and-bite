
import React from "react";
import Layout from "@/components/Layout";
import MealLogger from "@/components/MealLogger";
import CalorieTracker from "@/components/CalorieTracker";
import { HealthProvider } from "@/context/HealthContext";

const NutritionPage: React.FC = () => {
  return (
    <HealthProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Nutrition Tracking</h1>
          <p className="text-gray-500">Log your meals and monitor calorie intake</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MealLogger />
            </div>
            <div>
              <CalorieTracker />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-xl font-semibold mb-4">Nutrition Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium mb-2 text-green-800">Healthy Eating Habits</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Eat plenty of fruits and vegetables</li>
                  <li>• Choose whole grains over refined grains</li>
                  <li>• Limit added sugars and processed foods</li>
                  <li>• Stay hydrated with water throughout the day</li>
                  <li>• Practice mindful eating and portion control</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h3 className="font-medium mb-2 text-orange-800">Calorie Awareness</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Pay attention to serving sizes</li>
                  <li>• Be mindful of hidden calories in drinks</li>
                  <li>• Balance your calorie intake with activity level</li>
                  <li>• Eat protein-rich foods to feel fuller longer</li>
                  <li>• Consider the nutrient density of foods, not just calories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </HealthProvider>
  );
};

export default NutritionPage;
