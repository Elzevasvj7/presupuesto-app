"use client";
import { deleteTransaction } from "@/lib/actions";
import React from "react";

interface Transaction {
  id: number;
  description: string;
  category: string;
  balanceType: string;
  date: Date;
  amount: number;
  type: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const handlerDelete = async (id: number) => {
    await deleteTransaction(id);
  };

  const currencyFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className="w-full h-full">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg">Actividad reciente</h3>
          <p className="text-sm text-gray-500">Movimientos reales ordenados del más nuevo al más antiguo</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {transactions.length} movimientos
        </span>
      </div>
      <div
        className="space-y-2 overflow-auto h-[calc(100%-100px)]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#834CFC #F3F4F6",
        }}
      >
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay transacciones</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-3 rounded-lg flex justify-between items-center ${
                transaction.type === "income"
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-red-100 border-l-4 border-red-500"
              }`}
            >
              <div className="flex-1">
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-gray-600">
                  {transaction.category} • {transaction.balanceType === "cash" ? "Efectivo" : "Digital"} •{" "}
                  {new Date(transaction.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {currencyFormatter.format(transaction.amount)}
                </span>
                <button
                  onClick={() => handlerDelete(transaction.id)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
