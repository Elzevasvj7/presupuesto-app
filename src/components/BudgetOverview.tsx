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
      <h2 className="font-bold text-2xl mb-4 text-gray-800">
        Resumen del Presupuesto
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Necesidades básicas</p>
          <p className="text-2xl font-bold text-purple-600">
            ${categories.necesidades.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">50% del presupuesto</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Gastos personales</p>
          <p className="text-2xl font-bold text-blue-600">
            ${categories.gastosPersonales.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">30% del presupuesto</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Ahorro e inversión</p>
          <p className="text-2xl font-bold text-green-600">
            ${categories.ahorro.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">20% del presupuesto</p>
        </div>
      </div>
    </div>
  );
};
