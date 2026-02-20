"use client";
import { createBudget, FormState, updateBudget } from "@/lib/actions";
import { parse } from "path";
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
  const [state, action, pending] = useActionState<FormState, any>(
    createBudget,
    undefined
  );
  const [stateUpdate, actionUpdate, pendingUpdate] = useActionState<
    FormState,
    any
  >(updateBudget, undefined);
  return (
    <form
      action={() => income.id ? actionUpdate(income) : action(income)}
      className="w-full flex flex-col items-center gap-2"
    >
      <span className="font-semibold">Ingresa tu sueldo mensual (USD):</span>
      <div className="w-full flex items-center gap-2">
        <label className="flex-1">
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
            className="rounded-md flex-1 text-black p-2 w-full"
          />
        </label>
        <div className="">
          <button
            disabled={pending || pendingUpdate}
            type="submit"
            className="bg-[#834CFC] text-white p-2 rounded-md disabled:bg-[#834CFC]/50"
          >
            Calcular presupuesto
          </button>
        </div>
      </div>
    </form>
  );
};
