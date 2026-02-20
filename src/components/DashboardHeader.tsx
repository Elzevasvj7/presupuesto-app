"use client";
import React from "react";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-5xl">💰</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard de Presupuesto
            </span>
          </h1>
          <p className="text-gray-600 ml-16">
            Gestiona tus finanzas de manera inteligente • {currentDate}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Usuario</p>
            <p className="font-semibold text-gray-800">Admin</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
        </div>
      </div>
    </header>
  );
};
