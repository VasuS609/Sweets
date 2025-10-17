'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ReactNode } from 'react';

interface ChartDataItem {
  name: string;
  value: number;
  unit: string;
  color: string;
}

interface NutritionChartProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface CustomTooltipPayload {
  value: number;
  payload: ChartDataItem;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[];
}

export default function NutritionChart({
  calories,
  protein,
  carbs,
  fat,
  fiber,
  sugar
}: NutritionChartProps) {
  
  const chartData: ChartDataItem[] = [
    { name: 'Calories', value: calories, unit: 'kcal', color: '#f97316' },
    { name: 'Protein', value: protein, unit: 'g', color: '#3b82f6' },
    { name: 'Carbs', value: carbs, unit: 'g', color: '#10b981' },
    { name: 'Fat', value: fat, unit: 'g', color: '#eab308' },
    { name: 'Fiber', value: fiber, unit: 'g', color: '#8b5cf6' },
    { name: 'Sugar', value: sugar, unit: 'g', color: '#ec4899' }
  ];

  const walkingMinutes = Math.round(calories / 5);

  const CustomTooltip = (props: CustomTooltipProps): ReactNode => {
    const { active, payload } = props;

    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-lg border-2 border-gray-100">
          <p className="font-bold text-gray-800 text-lg">
            {data.name}
          </p>
          <p className="text-gray-600 text-base">
            {payload[0].value} {data.unit}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📊 Nutrition Facts
        </h3>
        <p className="text-gray-500 text-sm mt-1">Per piece</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="text-3xl md:text-4xl font-bold text-orange-600">{calories}</div>
          <div className="text-xs md:text-sm text-gray-600 mt-1">Calories</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="text-3xl md:text-4xl font-bold text-blue-600">{protein}g</div>
          <div className="text-xs md:text-sm text-gray-600 mt-1">Protein</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="text-3xl md:text-4xl font-bold text-green-600">{carbs}g</div>
          <div className="text-xs md:text-sm text-gray-600 mt-1">Carbs</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'rgba(251, 146, 60, 0.1)' }} 
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Burn Calories Info */}
      <div className="p-4 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-xl border border-orange-100">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-gray-700 font-medium">
              Burn it off with <span className="font-bold text-orange-600">~{walkingMinutes} minutes</span> of walking
            </p>
            <p className="text-gray-500 text-sm mt-1 font-semibold">
              Or enjoy guilt-free! It&apos;s Diwali! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}