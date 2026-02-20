"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  date: Date;
  type: string;
  amount: number;
}

interface TransactionChartProps {
  transactions: Transaction[];
}

export const TransactionChart = ({ transactions }: TransactionChartProps) => {
  // Agrupar transacciones por fecha
  const groupedData = transactions.reduce((acc: Record<string, {date: string, ingresos: number, gastos: number}>, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
    
    if (!acc[date]) {
      acc[date] = { date, ingresos: 0, gastos: 0 };
    }
    
    if (transaction.type === "income") {
      acc[date].ingresos += transaction.amount;
    } else {
      acc[date].gastos += transaction.amount;
    }
    
    return acc;
  }, {});

  const data = Object.values(groupedData).slice(-10); // Últimos 10 días

  return (
    <div className="w-full h-full">
      <h3 className="font-semibold text-lg mb-4">Historial de Transacciones</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="gastos" stroke="#ff6b6b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
