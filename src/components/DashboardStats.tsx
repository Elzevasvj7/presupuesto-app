"use client";
import React from "react";

interface DashboardStatsProps {
  metrics: {
    currentBalance: number;
    monthIncome: number;
    monthExpenses: number;
    monthNet: number;
    plannedBudgetTotal: number;
    realVsPlan: number;
  };
}

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const DashboardStats = ({ metrics }: DashboardStatsProps) => {
  const stats = [
    {
      label: "Saldo actual",
      helper: "Real disponible",
      value: currencyFormatter.format(metrics.currentBalance),
      color: "bg-slate-900",
      icon: "💵",
      className: "md:col-span-2 xl:col-span-2",
    },
    {
      label: "Ingresos del mes",
      helper: "Real",
      value: currencyFormatter.format(metrics.monthIncome),
      color: "bg-emerald-500",
      icon: "📈",
    },
    {
      label: "Gastos del mes",
      helper: "Real",
      value: currencyFormatter.format(metrics.monthExpenses),
      color: "bg-rose-500",
      icon: "📉",
    },
    {
      label: "Flujo neto del mes",
      helper: "Ingresos - gastos",
      value: currencyFormatter.format(metrics.monthNet),
      color: metrics.monthNet >= 0 ? "bg-green-500" : "bg-red-500",
      icon: "💳",
    },
    {
      label: "Presupuesto planificado",
      helper: "Plan mensual",
      value: currencyFormatter.format(metrics.plannedBudgetTotal),
      color: "bg-violet-500",
      icon: "🧭",
    },
    {
      label: "Desviación vs plan",
      helper: "Real - plan asignado",
      value: currencyFormatter.format(metrics.realVsPlan),
      color: metrics.realVsPlan > 0 ? "bg-red-500" : "bg-blue-500",
      icon: "⚖️",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-3xl border border-white/60 bg-white/90 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md ${stat.className || ""}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <div className={`${stat.color} w-2 h-2 rounded-full`}></div>
          </div>
          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            {stat.helper}
          </p>
        </div>
      ))}
    </div>
  );
};
