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
    basic: { label: "Necesidades", budget: income * 0.5, assigned: 0 },
    personal: { label: "Gastos personales", budget: income * 0.3, assigned: 0 },
    save: { label: "Ahorro", budget: income * 0.2, assigned: 0 },
  };

  // Calcular montos planificados por categoría.
  budgets.forEach((budget) => {
    if (categories[budget.category as keyof typeof categories]) {
      categories[budget.category as keyof typeof categories].assigned +=
        budget.amount;
    }
  });

  const data = Object.entries(categories).map(([, value]) => ({
    name: value.label,
    Limite: value.budget,
    Asignado: value.assigned,
    Disponible: Math.max(0, value.budget - value.assigned),
  }));

  return (
    <div className="w-full h-full">
      <h3 className="font-semibold text-lg mb-1">Salud del plan 50/30/20</h3>
      <p className="mb-4 text-sm text-gray-500">
        Compara la capacidad recomendada contra lo que ya asignaste en tu planificación.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Limite" fill="#834CFC" />
          <Bar dataKey="Asignado" fill="#BBFD1A" />
          <Bar dataKey="Disponible" fill="#1883ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
