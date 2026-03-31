"use client";
import { createTransaction } from "@/lib/actions";
import React, { useActionState, useState } from "react";

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      status?: string;
      data?: Record<string, unknown>;
    }
  | undefined;

export const TransactionForm = ({
  initialType = "expense",
  title = "Nueva Transacción",
  initialBalanceType = "digital",
}: {
  initialType?: "expense" | "income";
  title?: string;
  initialBalanceType?: "cash" | "digital";
}) => {
  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    type: initialType,
    balanceType: initialBalanceType,
    category: initialType === "income" ? "salario" : "comida",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [state, action, pending] = useActionState<FormState, typeof transaction>(
    createTransaction,
    undefined
  );

  const expenseCategories = [
    { value: "comida", label: "Comida" },
    { value: "transporte", label: "Transporte" },
    { value: "entretenimiento", label: "Entretenimiento" },
    { value: "servicios", label: "Servicios" },
    { value: "salud", label: "Salud" },
    { value: "educacion", label: "Educación" },
    { value: "ropa", label: "Ropa" },
    { value: "otros", label: "Otros" },
  ];

  const incomeCategories = [
    { value: "salario", label: "Salario" },
    { value: "freelance", label: "Freelance" },
    { value: "inversion", label: "Inversión" },
    { value: "otros", label: "Otros" },
  ];

  const categories =
    transaction.type === "income" ? incomeCategories : expenseCategories;

  return (
    <form action={() => action(transaction)} className="p-4 space-y-3">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Tipo:</span>
        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="rounded-md text-black p-2 border border-gray-300"
          required
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Descripción:</span>
        <input
          name="description"
          type="text"
          value={transaction.description}
          onChange={handleChange}
          className="rounded-md text-black p-2 border border-gray-300"
          placeholder="Ej: Compra de supermercado"
          required
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Monto:</span>
        <div className="flex items-center gap-1">
          $
          <input
            name="amount"
            type="number"
            step="0.01"
            value={transaction.amount}
            onChange={handleChange}
            className="rounded-md flex-1 text-black p-2 border border-gray-300"
            placeholder="0.00"
            required
          />
        </div>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Categoría:</span>
        <select
          name="category"
          value={transaction.category}
          onChange={handleChange}
          className="rounded-md text-black p-2 border border-gray-300"
          required
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Medio del saldo:</span>
        <select
          name="balanceType"
          value={transaction.balanceType}
          onChange={handleChange}
          className="rounded-md text-black p-2 border border-gray-300"
          required
        >
          <option value="digital">Digital</option>
          <option value="cash">Efectivo</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Fecha:</span>
        <input
          name="date"
          type="date"
          value={transaction.date}
          onChange={handleChange}
          className="rounded-md text-black p-2 border border-gray-300"
          required
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#834CFC] text-white py-2 px-4 rounded-md hover:bg-[#6d3dd4] transition-colors disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Agregar Transacción"}
      </button>

      {state?.status === "success" && (
        <p className="text-green-600 text-sm">¡Transacción agregada!</p>
      )}
      {state?.status === "error" && (
        <p className="text-red-600 text-sm">Error al agregar transacción</p>
      )}
    </form>
  );
};
