"use client";
import React from "react";

interface BudgetItem {
  amount: number;
}

interface Transaction {
  date: Date;
  type: string;
  amount: number;
}

interface DashboardStatsProps {
  budget: { amount: number } | null;
  budgets: BudgetItem[];
  transactions: Transaction[];
}

export const DashboardStats = ({
  budget,
  budgets,
  transactions,
}: DashboardStatsProps) => {
  const income = budget?.amount || 0;
  const totalExpenses = budgets.reduce((acc, item) => acc + item.amount, 0);
  const available = income - totalExpenses;

  // Calcular transacciones del mes actual
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const monthExpenses = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const stats = [
    {
      label: "Presupuesto Total",
      value: `$${income.toFixed(2)}`,
      color: "bg-purple-500",
      icon: "💰",
    },
    {
      label: "Gastos Planificados",
      value: `$${totalExpenses.toFixed(2)}`,
      color: "bg-blue-500",
      icon: "📊",
    },
    {
      label: "Disponible",
      value: `$${available.toFixed(2)}`,
      color: available >= 0 ? "bg-green-500" : "bg-red-500",
      icon: "💵",
    },
    {
      label: "Ingresos del Mes",
      value: `$${monthIncome.toFixed(2)}`,
      color: "bg-emerald-500",
      icon: "📈",
    },
    {
      label: "Gastos del Mes",
      value: `$${monthExpenses.toFixed(2)}`,
      color: "bg-orange-500",
      icon: "📉",
    },
    {
      label: "Balance Mensual",
      value: `$${(monthIncome - monthExpenses).toFixed(2)}`,
      color: monthIncome - monthExpenses >= 0 ? "bg-green-500" : "bg-red-500",
      icon: "💳",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#F6F6F6] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <div className={`${stat.color} w-2 h-2 rounded-full`}></div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
