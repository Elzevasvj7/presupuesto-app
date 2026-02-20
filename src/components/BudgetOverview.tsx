"use client";
import React from "react";

export const BudgetOverview = ({budget}: {budget: {amount: number} | null}) => {
  const income = budget?.amount || 2000;
  const categories = {
    necesidades: income * 0.5,
    gastosPersonales: income * 0.3,
    ahorro: income * 0.2,
  };
  return (
    <div>
      <h2 className="font-semibold">Resumen del presupuesto</h2>
      <div className="grid grid-cols-2 gap-2">
        <span>Necesidades básicas: ${categories.necesidades.toFixed(2)}</span>
        <span>
          Gastos personales: ${categories.gastosPersonales.toFixed(2)}
        </span>
        <span>Ahorro e inversión: ${categories.ahorro.toFixed(2)}</span>
      </div>
    </div>
  );
};
