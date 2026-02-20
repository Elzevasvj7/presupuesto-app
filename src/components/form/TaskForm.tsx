"use client";
import { createBudgetItem, updateBudgetItem } from "@/lib/actions";
import React, { useActionState, useEffect, useState } from "react";

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      status?: string;
      data?: Record<string, unknown>;
    }
  | undefined;

interface TaskProps {
  id?: number;
  name: string;
  amount: number;
  note: string | null;
  category: string;
}

export const TaskForm = ({
  taskProps,
  onChange,
  onClose,
}: {
  taskProps?: TaskProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onClose?: () => void;
}) => {
  const [task, setTask] = useState<{
    id?: number;
    name: string;
    amount: number;
    note: string;
    category: string;
  }>({
    name: "",
    amount: 0,
    note: "",
    category: "basic",
  });
  const categories = [
    { value: "basic", label: "Gastos basicos" },
    { value: "personal", label: "Gastos personales" },
    { value: "save", label: "Ahorro" },
  ];
  const handlerOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (taskProps?.id && onChange) {
      onChange(e);
    } else {
      setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const [state, action, pending] = useActionState<
    FormState,
    { name: string; category: string; amount: string; note?: string }
  >(createBudgetItem, undefined);
  const [stateUpdate, actionUpdate, pendingUpdate] = useActionState<
    FormState,
    { id: number; name: string; category: string; amount: string; note?: string }
  >(updateBudgetItem, undefined);
  useEffect(() => {
    if (stateUpdate?.status === "success" && onClose) {
      onClose();
    }
  }, [stateUpdate, onClose]);
  return (
    <form
      action={() => {
        if (taskProps?.id) {
          const data = { 
            id: taskProps.id,
            name: taskProps.name,
            category: taskProps.category,
            amount: taskProps.amount.toString(),
            note: taskProps.note || undefined
          };
          return actionUpdate(data);
        } else {
          const data = { 
            name: task.name,
            category: task.category,
            amount: task.amount.toString(),
            note: task.note || undefined
          };
          return action(data);
        }
      }}
      className="space-y-4"
    >
      <h3 className="font-bold text-xl text-gray-800">
        {taskProps?.id ? "Editar Gasto" : "Nuevo Gasto"}
      </h3>
      
      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Nombre del gasto:</span>
        <input
          name="name"
          type="text"
          value={taskProps?.id ? taskProps.name : task.name}
          onChange={handlerOnChange}
          className="rounded-lg text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ej: Renta, Comida, etc."
          required
        />
      </label>
      
      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Monto:</span>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
          <span className="text-gray-600 font-semibold">$</span>
          <input
            name="amount"
            type="number"
            value={taskProps?.id ? taskProps.amount : task.amount}
            onChange={handlerOnChange}
            className="flex-1 text-black outline-none"
            placeholder="0.00"
            required
          />
        </div>
      </label>
      
      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Categoría:</span>
        <select
          name="category"
          className="rounded-lg text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={taskProps?.id ? taskProps.category : task.category}
          onChange={handlerOnChange}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </label>
      
      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Nota:</span>
        <textarea
          name="note"
          value={taskProps?.id ? (taskProps.note || "") : (task.note || "")}
          onChange={handlerOnChange}
          className="rounded-lg text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-20"
          placeholder="Descripción opcional..."
        ></textarea>
      </label>
      
      <button
        disabled={taskProps?.id ? pendingUpdate : pending}
        className="w-full bg-[#834CFC] text-white py-2.5 px-4 rounded-lg hover:bg-[#6d3dd4] transition-colors disabled:opacity-50 font-semibold"
      >
        {taskProps?.id ? "Actualizar" : "Guardar Gasto"}
      </button>
      
      {state?.status === "success" && (
        <p className="text-green-600 text-sm text-center">¡Gasto creado correctamente!</p>
      )}
      {state?.status === "error" && (
        <p className="text-red-600 text-sm text-center">Hubo un error</p>
      )}
    </form>
  );
};
