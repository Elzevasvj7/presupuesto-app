"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BudgetItem {
  category: string;
  amount: number;
}

interface ExpenseChartProps {
  budgets: BudgetItem[];
  income: number;
}

export const ExpenseChart = ({ budgets, income }: ExpenseChartProps) => {
  const categories = {
    basic: { label: "Necesidades", budget: income * 0.5, expenses: 0 },
    personal: { label: "Gastos personales", budget: income * 0.3, expenses: 0 },
    save: { label: "Ahorro", budget: income * 0.2, expenses: 0 },
  };

  // Calcular gastos por categoría
  budgets.forEach((budget) => {
    if (categories[budget.category as keyof typeof categories]) {
      categories[budget.category as keyof typeof categories].expenses +=
        budget.amount;
    }
  });

  const data = Object.entries(categories).map(([, value]) => ({
    name: value.label,
    Presupuestado: value.budget,
    Gastado: value.expenses,
    Disponible: Math.max(0, value.budget - value.expenses),
  }));

  return (
    <div className="w-full h-full">
      <h3 className="font-semibold text-lg mb-4">Gastos por Categoría</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Presupuestado" fill="#834CFC" />
          <Bar dataKey="Gastado" fill="#BBFD1A" />
          <Bar dataKey="Disponible" fill="#F6F6F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
