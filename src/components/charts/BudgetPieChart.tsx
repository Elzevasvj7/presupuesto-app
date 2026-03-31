"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface BudgetItem {
  category: string;
  amount: number;
}

interface BudgetPieChartProps {
  budgets: BudgetItem[];
  income: number;
}

const COLORS = {
  basic: "#834CFC",
  personal: "#BBFD1A",
  save: "#FF6B6B",
  available: "#1883ff",
};

export const BudgetPieChart = ({ budgets, income }: BudgetPieChartProps) => {
  const categories = {
    basic: { label: "Necesidades", amount: 0 },
    personal: { label: "Gastos personales", amount: 0 },
    save: { label: "Ahorro", amount: 0 },
  };

  // Calcular distribución planificada por categoría.
  budgets.forEach((budget) => {
    if (categories[budget.category as keyof typeof categories]) {
      categories[budget.category as keyof typeof categories].amount +=
        budget.amount;
    }
  });

  const totalAssigned = Object.values(categories).reduce(
    (acc, cat) => acc + cat.amount,
    0
  );

  const data = [
    ...Object.entries(categories)
      .filter(([, value]) => value.amount > 0)
      .map(([key, value]) => ({
        name: value.label,
        value: value.amount,
        color: COLORS[key as keyof typeof COLORS],
      })),
    {
      name: "Sin asignar",
      value: Math.max(0, income - totalAssigned),
      color: COLORS.available,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full h-full">
      <h3 className="font-semibold text-lg mb-1">Distribución planificada</h3>
      <p className="mb-4 text-sm text-gray-500">
        Así se reparte tu presupuesto mensual entre categorías y dinero aún no asignado.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${((percent || 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
