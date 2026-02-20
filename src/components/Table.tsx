"use client";
import { deleteBudgetItem } from "@/lib/actions";
import { Modal } from "antd";
import React, { useState } from "react";
import { TaskForm } from "./form/TaskForm";

export const Table = ({
  budgets,
  budget,
}: {
  budgets: any[];
  budget: { amount: number } | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState<{
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
  const income = budget?.amount || 2000;

  const total = budgets.reduce((acc, current) => acc + current.amount, 0);

  const handlerDelete = async (id: any) => {
    await deleteBudgetItem(id);
  };

  const handlerEdit = async (budget: {
    id: number;
    name: string;
    amount: number;
    note: string;
    category: string;
  }) => {
    setTask(budget);
    setIsModalOpen(!isModalOpen);
  };

  const handlerOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const calculateTotal = (budgets: any[], income: number) => {
    const total = budgets.reduce((acc, current) => acc + current.amount, 0);
    if (total > income) {
      return <span className="text-red-500">${income}</span>;
    }
    return <span className="text-[#834CFC]">${income}</span>;
  };
  return (
    <div className="bg-[#F6F6F6] p-4 rounded-2xl h-full">
      <div
        className="p-4 overflow-auto w-full h-full"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#834CFC #F3F4F6",
          scrollbarGutter: "100px",
        }}
      >
        <table className="w-full">
          <thead className="[&>tr>th]:p-2">
            <tr>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td]:p-1">
            <tr>
              <td className="font-semibold" colSpan={4}>
                Necesidades básicas 50%{" "}
                {calculateTotal(
                  budgets.filter((budget) => budget.category === "basic"),
                  income * 0.5
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {budgets
              .filter((budget) => budget.category === "basic")
              .map((budget) => (
                <tr key={budget.name}>
                  <td>{budget.name}</td>
                  <td>${budget.amount}</td>
                  <td>{budget.note}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlerEdit(budget)}
                        className="p-1 px-4 bg-[#834CFC] text-white rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handlerDelete(budget.id)}
                        className="p-1 px-4 bg-[#FF4C00] text-white rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td className="font-semibold">
                Sub total:{" "}
                <span className="text-[#BBFD1A]">
                  {budgets
                    .filter((budget) => budget.category === "basic")
                    .reduce((acc, current) => acc + current.amount, 0)}
                </span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold" colSpan={4}>
                Gastos personales 30%{" "}
                {calculateTotal(
                  budgets.filter((budget) => budget.category === "personal"),
                  income * 0.3
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            {budgets
              .filter((budget) => budget.category === "personal")
              .map((budget) => (
                <tr key={budget.name}>
                  <td>{budget.name}</td>
                  <td>${budget.amount}</td>
                  <td>{budget.note}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlerEdit(budget)}
                        className="p-1 px-4 bg-[#834CFC] text-white rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handlerDelete(budget.id)}
                        className="p-1 px-4 bg-[#FF4C00] text-white rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td className="font-semibold">
                Sub total:{" "}
                <span className="text-[#BBFD1A]">
                  {budgets
                    .filter((budget) => budget.category === "personal")
                    .reduce((acc, current) => acc + current.amount, 0)}
                </span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold" colSpan={4}>
                Ahorro e inversión 20%{" "}
                {calculateTotal(
                  budgets.filter((budget) => budget.category === "save"),
                  income * 0.2
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            {budgets
              .filter((budget) => budget.category === "save")
              .map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.name}</td>
                  <td>${budget.amount}</td>
                  <td>{budget.note}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlerEdit(budget)}
                        className="p-1 px-4 bg-[#834CFC] text-white rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handlerDelete(budget.id)}
                        className="p-1 px-4 bg-[#FF4C00] text-white rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td className="font-semibold">
                Sub total:{" "}
                <span className="text-[#BBFD1A]">
                  {budgets
                    .filter((budget) => budget.category === "save")
                    .reduce((acc, current) => acc + current.amount, 0)}
                </span>
              </td>
            </tr>
            <tr>
              <td>Total de gastos</td>
              <td
                className={`${total > income ? "text-red-500" : ""}`}
                colSpan={3}
              >
                ${total.toFixed(2)}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal
        styles={{
          content: {
            background: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          body: {
            width: "100%",
          },
        }}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(!isModalOpen)}
      >
        <TaskForm
          taskProps={task}
          onChange={handlerOnChange}
          onClose={() => setIsModalOpen(!isModalOpen)}
        />
      </Modal>
    </div>
  );
};
