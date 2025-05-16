
import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { useHealth } from "@/context/HealthContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

type ChartData = {
  name: string;
  steps: number;
  caloriesBurned: number;
  caloriesConsumed: number;
};

const ProgressCharts: React.FC = () => {
  const { dailyLogs } = useHealth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    // Process the last 7 days of logs for the chart
    const recentLogs = [...dailyLogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
      .reverse();  // Reverse to show chronological order
      
    const formattedLogs = recentLogs.map(log => ({
      name: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
      steps: log.steps,
      caloriesBurned: log.caloriesBurned,
      caloriesConsumed: log.caloriesConsumed
    }));
    
    setChartData(formattedLogs);
  }, [dailyLogs]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center mb-4">
        <BarChart3 className="mr-2 text-health-primary" size={24} />
        <h2 className="text-xl font-semibold">Progress Overview</h2>
      </div>
      
      {chartData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <BarChart3 className="mx-auto mb-2 opacity-30" size={32} />
          <p>Not enough data to display charts</p>
          <p className="text-sm">Track your activity for a few days to see progress</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-500">Daily Steps</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="steps" name="Steps" fill="#0EA5E9" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-500">Calories (Burn vs Intake)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#22C55E" barSize={30} />
                  <Bar dataKey="caloriesConsumed" name="Calories Consumed" fill="#F59E0B" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCharts;
