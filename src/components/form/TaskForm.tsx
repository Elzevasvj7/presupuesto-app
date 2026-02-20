"use client";
import { createBudget, createBudgetItem, updateBudget, updateBudgetItem } from "@/lib/actions";
import React, { useActionState, useEffect, useState } from "react";

export type FormState =
  | {
      errors?: any;
      message?: string;
      status?: string;
      data?: any;
    }
  | undefined;

export const TaskForm = ({
  taskProps,
  onChange,
  onClose,
}: {
  taskProps?: any;
  onChange?: any;
  onClose?: any;
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
    taskProps?.id
      ? onChange(e)
      : setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [state, action, pending] = useActionState<FormState, any>(
    createBudgetItem,
    undefined
  );
  const [stateUpdate, actionUpdate, pendingUpdate] = useActionState<
    FormState,
    any
  >(updateBudgetItem, undefined);
  useEffect(() => {
    if (stateUpdate?.status === "success") {
      onClose();
    }
  }, [stateUpdate]);
  return (
    <form
      action={(e) => (taskProps?.id ? actionUpdate(taskProps) : action(task))}
      className={`p-4 rounded-md w-full gap-2 grid`}
    >
      <label className="flex flex-col py-1 w-full">
        <span>Ingresa el nombre de la tarea: </span>
        <input
          name="name"
          type="text"
          value={taskProps?.id ? taskProps.name : task.name}
          onChange={handlerOnChange}
          className="rounded-md text-black p-2"
          required
        />
      </label>
      <label className="flex flex-col py-1 w-full">
        <span>Ingresa la cantidad de tareas:</span>
        <div className="flex items-center gap-1">
          $
          <input
            name="amount"
            type="number"
            value={taskProps?.id ? taskProps.amount : task.amount}
            onChange={handlerOnChange}
            className="rounded-md flex-1 text-black p-2"
            required
          />
        </div>
      </label>
      <label className="flex flex-col py-1">
        <span>Nota:</span>
        <textarea
          name="note"
          value={taskProps?.id ? taskProps.note : task.note}
          onChange={handlerOnChange}
          className="rounded-md text-black p-2"
        ></textarea>
      </label>
      <label className="flex flex-col py-1">
        <span>Categoria de la tarea:</span>
        <select
          name="category"
          className="rounded-md text-black p-2"
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
      <div className="flex justify-center w-full">
        <button
          disabled={taskProps?.id ? pendingUpdate : pending}
          className="bg-[#834CFC] text-white p-2 rounded-md w-full max-w-32"
        >
          {taskProps?.id ? "Actualizar" : "Guardar"}
        </button>
      </div>
      {state?.status === "success" && "Creado correctamente"}
      {state?.status === "error" && "Hubo un error" + state?.data}
    </form>
  );
};
