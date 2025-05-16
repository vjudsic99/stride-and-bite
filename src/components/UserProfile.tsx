
import React, { useState } from "react";
import { User, Save } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { calculateBMI, getBMICategory } from "@/utils/healthCalculations";

const UserProfile: React.FC = () => {
  const { weight, setWeight, height, setHeight } = useHealth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempWeight, setTempWeight] = useState(weight);
  const [tempHeight, setTempHeight] = useState(height);
  const { toast } = useToast();
  
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  
  const handleSaveProfile = () => {
    // Validate inputs
    if (tempWeight <= 0 || tempHeight <= 0) {
      toast({
        title: "Invalid values",
        description: "Weight and height must be positive numbers.",
        variant: "destructive"
      });
      return;
    }
    
    setWeight(tempWeight);
    setHeight(tempHeight);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center mb-6">
        <User className="mr-2 text-health-primary" size={24} />
        <h2 className="text-xl font-semibold">User Profile</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <Input
                  type="number"
                  value={tempWeight}
                  onChange={(e) => setTempWeight(Number(e.target.value))}
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm)</label>
                <Input
                  type="number"
                  value={tempHeight}
                  onChange={(e) => setTempHeight(Number(e.target.value))}
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="bg-health-primary hover:bg-health-dark flex-1"
                  onClick={handleSaveProfile}
                >
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setTempWeight(weight);
                    setTempHeight(height);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-2xl font-bold">{weight} kg</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="text-2xl font-bold">{height} cm</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-lg mb-4">Health Metrics</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Body Mass Index (BMI)</p>
            <p className="text-3xl font-bold">{bmi}</p>
            <div className={`text-sm font-medium mt-1 ${
              bmiCategory === 'Normal weight' 
                ? 'text-health-success' 
                : bmiCategory === 'Underweight' 
                  ? 'text-health-warning' 
                  : 'text-health-danger'
            }`}>
              {bmiCategory}
            </div>
          </div>
          
          <div className="bg-white rounded p-3 text-sm">
            <p className="font-medium mb-2">BMI Categories:</p>
            <ul className="space-y-1 text-gray-600">
              <li>Below 18.5 - Underweight</li>
              <li>18.5 to 24.9 - Normal weight</li>
              <li>25 to 29.9 - Overweight</li>
              <li>30 and above - Obese</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
