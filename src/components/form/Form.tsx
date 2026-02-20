"use client";
import { createBudget, FormState, updateBudget } from "@/lib/actions";
import React, { useActionState, useState } from "react";

export const Form = ({
  budget,
}: {
  budget?: { id: number; amount: number } | null;
}) => {
  const [income, setIncome] = useState(
    budget
      ? {
          id: budget.id,
          amount: budget.amount,
        }
      : {
          id: 0,
          amount: 2000,
        }
  );
  const [state, action, pending] = useActionState<FormState, { amount: string }>(
    createBudget,
    undefined
  );
  const [stateUpdate, actionUpdate, pendingUpdate] = useActionState<
    FormState,
    { id: number; amount: string }
  >(updateBudget, undefined);
  return (
    <form
      action={() => {
        const budgetData = { ...income, amount: income.amount.toString() };
        return income.id ? actionUpdate(budgetData) : action(budgetData);
      }}
      className="w-full space-y-4"
    >
      <h3 className="font-bold text-xl text-gray-800">
        Presupuesto Mensual
      </h3>
      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">
          Ingresa tu sueldo mensual (USD):
        </span>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-3 py-2">
          <span className="text-gray-600 font-semibold">$</span>
          <input
            type="number"
            value={income.amount}
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              setIncome({
                ...income,
                amount: value === "" ? 0 : parseFloat(value),
              });
            }}
            className="flex-1 text-black outline-none"
            placeholder="0.00"
          />
        </div>
      </label>
      <button
        disabled={pending || pendingUpdate}
        type="submit"
        className="w-full bg-[#834CFC] text-white py-2.5 px-4 rounded-lg hover:bg-[#6d3dd4] transition-colors disabled:opacity-50 font-semibold"
      >
        {income.id ? "Actualizar presupuesto" : "Calcular presupuesto"}
      </button>
      {(state?.status === "success" || stateUpdate?.status === "success") && (
        <p className="text-green-600 text-sm text-center">¡Presupuesto guardado!</p>
      )}
    </form>
  );
};
