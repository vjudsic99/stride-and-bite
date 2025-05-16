
import React, { createContext, useState, useContext, useEffect } from 'react';

type Meal = {
  id: string;
  name: string;
  calories: number;
  time: Date;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
};

type GoalsType = {
  steps: number;
  caloriesIntake: number;
  caloriesBurn: number;
};

type HealthContextType = {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  caloriesBurned: number;
  setCaloriesBurned: React.Dispatch<React.SetStateAction<number>>;
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  removeMeal: (id: string) => void;
  caloriesConsumed: number;
  goals: GoalsType;
  setGoals: React.Dispatch<React.SetStateAction<GoalsType>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  resetDailyData: () => void;
  dailyLogs: {
    date: string;
    steps: number;
    caloriesBurned: number;
    caloriesConsumed: number;
  }[];
};

const defaultGoals: GoalsType = {
  steps: 10000,
  caloriesIntake: 2000,
  caloriesBurn: 500,
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [goals, setGoals] = useState<GoalsType>(defaultGoals);
  const [weight, setWeight] = useState<number>(70); // default weight in kg
  const [height, setHeight] = useState<number>(170); // default height in cm
  const [dailyLogs, setDailyLogs] = useState<Array<{
    date: string;
    steps: number;
    caloriesBurned: number;
    caloriesConsumed: number;
  }>>([]);

  // Calculate calories consumed
  const caloriesConsumed = meals.reduce((total, meal) => total + meal.calories, 0);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedSteps = localStorage.getItem('steps');
    const storedCaloriesBurned = localStorage.getItem('caloriesBurned');
    const storedMeals = localStorage.getItem('meals');
    const storedGoals = localStorage.getItem('goals');
    const storedWeight = localStorage.getItem('weight');
    const storedHeight = localStorage.getItem('height');
    const storedDailyLogs = localStorage.getItem('dailyLogs');

    if (storedSteps) setSteps(Number(storedSteps));
    if (storedCaloriesBurned) setCaloriesBurned(Number(storedCaloriesBurned));
    if (storedMeals) setMeals(JSON.parse(storedMeals));
    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedWeight) setWeight(Number(storedWeight));
    if (storedHeight) setHeight(Number(storedHeight));
    if (storedDailyLogs) setDailyLogs(JSON.parse(storedDailyLogs));

    // Check if we need to reset daily data (new day)
    const lastLogDate = localStorage.getItem('lastLogDate');
    const today = new Date().toISOString().split('T')[0];
    
    if (lastLogDate !== today) {
      // It's a new day, log previous day's data and reset
      if (lastLogDate && (Number(storedSteps) > 0 || Number(storedCaloriesBurned) > 0 || (storedMeals && JSON.parse(storedMeals).length > 0))) {
        const newLog = {
          date: lastLogDate,
          steps: Number(storedSteps) || 0,
          caloriesBurned: Number(storedCaloriesBurned) || 0,
          caloriesConsumed: storedMeals ? JSON.parse(storedMeals).reduce((t: number, m: Meal) => t + m.calories, 0) : 0,
        };
        
        const updatedLogs = storedDailyLogs ? [...JSON.parse(storedDailyLogs), newLog] : [newLog];
        setDailyLogs(updatedLogs);
        localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));
      }
      
      // Reset daily tracking data
      setSteps(0);
      setCaloriesBurned(0);
      setMeals([]);
      localStorage.setItem('steps', '0');
      localStorage.setItem('caloriesBurned', '0');
      localStorage.setItem('meals', JSON.stringify([]));
      localStorage.setItem('lastLogDate', today);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('steps', steps.toString());
    localStorage.setItem('caloriesBurned', caloriesBurned.toString());
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('weight', weight.toString());
    localStorage.setItem('height', height.toString());
    localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    localStorage.setItem('lastLogDate', new Date().toISOString().split('T')[0]);
  }, [steps, caloriesBurned, meals, goals, weight, height, dailyLogs]);

  // Add a meal
  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = {
      ...meal,
      id: Date.now().toString(),
    };
    setMeals([...meals, newMeal]);
  };

  // Remove a meal
  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  // Reset daily data (for manual reset or testing)
  const resetDailyData = () => {
    const today = new Date().toISOString().split('T')[0];
    const newLog = {
      date: today,
      steps,
      caloriesBurned,
      caloriesConsumed,
    };
    
    setDailyLogs([...dailyLogs, newLog]);
    setSteps(0);
    setCaloriesBurned(0);
    setMeals([]);
  };

  return (
    <HealthContext.Provider
      value={{
        steps,
        setSteps,
        caloriesBurned,
        setCaloriesBurned,
        meals,
        addMeal,
        removeMeal,
        caloriesConsumed,
        goals,
        setGoals,
        weight,
        setWeight,
        height,
        setHeight,
        resetDailyData,
        dailyLogs,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
