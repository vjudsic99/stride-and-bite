
import React from "react";
import Layout from "@/components/Layout";
import UserProfile from "@/components/UserProfile";
import GoalSetting from "@/components/GoalSetting";
import { HealthProvider } from "@/context/HealthContext";

const ProfilePage: React.FC = () => {
  return (
    <HealthProvider>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-gray-500">Manage your personal information and preferences</p>
          
          <UserProfile />
          <GoalSetting />
          
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-xl font-semibold mb-4">About HealthTrack</h2>
            <p className="text-gray-600">
              HealthTrack is a web application designed to help you monitor your daily activity and
              nutrition. Track your steps, log your meals, and set health goals to maintain a healthy lifestyle.
            </p>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium mb-2">Privacy Information</h3>
              <p className="text-sm text-gray-600">
                Your health data is stored locally in your browser and is not shared with any third parties.
                We value your privacy and do not collect any personal information.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </HealthProvider>
  );
};

export default ProfilePage;
