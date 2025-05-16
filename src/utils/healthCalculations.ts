
/**
 * Calculates calories burned based on steps, weight and duration
 * This is a simplified calculation and not medically precise
 */
export const calculateCaloriesBurned = (steps: number, weight: number): number => {
  // A rough estimate: calories burned per step = 0.04 * weight(kg)
  const caloriesPerStep = 0.04 * (weight / 70); // Normalized to 70kg standard weight
  return Math.round(steps * caloriesPerStep);
};

/**
 * Calculates BMI (Body Mass Index)
 */
export const calculateBMI = (weight: number, height: number): number => {
  // BMI = weight(kg) / (height(m))^2
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/**
 * Returns a BMI category based on the BMI value
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * Formats large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Gets a color based on progress percentage
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage < 30) return 'text-health-danger';
  if (percentage < 70) return 'text-health-warning';
  return 'text-health-success';
};

/**
 * Formats date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate calorie deficit/surplus
 */
export const calculateCalorieBalance = (caloriesBurned: number, caloriesConsumed: number): number => {
  return caloriesBurned - caloriesConsumed;
};

/**
 * Suggests health insights based on user data
 */
export const generateInsights = (
  steps: number, 
  caloriesBurned: number, 
  caloriesConsumed: number,
  stepsGoal: number
): string[] => {
  const insights: string[] = [];
  
  // Step-based insights
  const stepPercentage = (steps / stepsGoal) * 100;
  if (stepPercentage < 50) {
    insights.push('Try to be more active today to reach your step goal.');
  } else if (stepPercentage >= 100) {
    insights.push('Great job reaching your step goal! Keep it up!');
  } else if (stepPercentage >= 75) {
    insights.push('You\'re making good progress towards your step goal today.');
  }
  
  // Calorie-based insights
  const calorieBalance = calculateCalorieBalance(caloriesBurned, caloriesConsumed);
  if (calorieBalance < -500) {
    insights.push('You\'re in a significant calorie surplus today. Consider some light activity.');
  } else if (calorieBalance > 500) {
    insights.push('You\'re in a significant calorie deficit. Make sure you\'re eating enough.');
  } else {
    insights.push('Your calorie intake and output are well balanced today.');
  }
  
  // Add a generic insight if we don't have enough data
  if (insights.length < 2) {
    insights.push('Track your meals and activity consistently for more personalized insights.');
  }
  
  return insights;
};
