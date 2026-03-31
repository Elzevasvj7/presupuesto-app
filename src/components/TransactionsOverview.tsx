import React from "react";

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const TransactionsOverview = ({
  transactions,
}: {
  transactions: { type: string; amount: number; balanceType: string }[];
}) => {
  const totalIncome = transactions.reduce(
    (total, transaction) => total + (transaction.type === "income" ? transaction.amount : 0),
    0,
  );
  const totalExpenses = transactions.reduce(
    (total, transaction) => total + (transaction.type === "expense" ? transaction.amount : 0),
    0,
  );
  const totalBalance = totalIncome - totalExpenses;
  const cashBalance = transactions.reduce((total, transaction) => {
    if (transaction.balanceType !== "cash") {
      return total;
    }

    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);
  const digitalBalance = transactions.reduce((total, transaction) => {
    if (transaction.balanceType !== "digital") {
      return total;
    }

    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Ingresos totales</p>
          <p className="text-2xl font-bold text-green-600">
            {currencyFormatter.format(totalIncome)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Ingresos totales</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Gastos totales</p>
          <p className="text-2xl font-bold text-red-600">
            {currencyFormatter.format(totalExpenses)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Gastos totales</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Balance total</p>
          <p className="text-2xl font-bold text-blue-600">
            {currencyFormatter.format(totalBalance)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Balance consolidado</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Saldo en efectivo</p>
          <p className="text-2xl font-bold text-amber-600">
            {currencyFormatter.format(cashBalance)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Movimientos cash</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Saldo digital</p>
          <p className="text-2xl font-bold text-indigo-600">
            {currencyFormatter.format(digitalBalance)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Movimientos digitales</p>
        </div>
      </div>
    </div>
  );
};
