"use client";

interface NutritionData {
  label:string;
  value:number;
  unit:string;
  color:string;
  maxValue:number
}

interface NutritionchartProps{
  calories:number;
  fat:number;
  fiber:number;
  sugar:number;
  protein:number;
  carbs:number;
}

export default function NutritionChart({
  calories,
  fat,
  fiber,
  sugar,
  protein,
  carbs
}:NutritionchartProps){
 
  const nutritionData:NutritionData[]=[
      { label: 'Calories', value: calories, unit: 'kcal', color: 'bg-orange-500', maxValue: 200 },
    { label: 'Protein', value: protein, unit: 'g', color: 'bg-blue-500', maxValue: 10 },
    { label: 'Carbs', value: carbs, unit: 'g', color: 'bg-green-500', maxValue: 40 },
    { label: 'Fat', value: fat, unit: 'g', color: 'bg-yellow-500', maxValue: 15 },
    { label: 'Fiber', value: fiber, unit: 'g', color: 'bg-purple-500', maxValue: 5 },
    { label: 'Sugar', value: sugar, unit: 'g', color: 'bg-pink-500', maxValue: 30 }
  ]

  return (
     <div className="space-y-4">
      {nutritionData.map((item, index) => {
        const percentage = (item.value / item.maxValue) * 100;
        
        return (
          <div key={index}>
            {/* Label and Value */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-gray-600">
                {item.value} {item.unit}
              </span>
            </div>
            
            {/* Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  )
}