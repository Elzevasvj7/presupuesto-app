"use client";
import { deleteBudgetItem } from "@/lib/actions";
import { Modal } from "antd";
import React, { useState } from "react";
import { TaskForm } from "./form/TaskForm";
import { Table as TableAnt } from "antd";
interface BudgetItem {
  id: number;
  name: string;
  amount: number;
  note: string | null;
  category: string;
}

export const Table = ({
  budgets,
}: {
  budgets: BudgetItem[];
}) => {
  const columns = [
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => <span>${amount.toFixed(2)}</span>,
    },
    {
      title: "Nota",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: number, record: BudgetItem) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlerEdit(record)}
            className="p-1 px-4 bg-[#834CFC] text-white rounded-md"
          >
            Editar
          </button>
          <button
            onClick={() => handlerDelete(record.id)}
            className="p-1 px-4 bg-[#FF4C00] text-white rounded-md"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState<{
    name: string;
    amount: number;
    note: string | null;
    category: string;
  }>({
    name: "",
    amount: 0,
    note: "",
    category: "basic",
  });

  const handlerDelete = async (id: number) => {
    await deleteBudgetItem(id);
  };

  const handlerEdit = async (budget: BudgetItem) => {
    setTask(budget);
    setIsModalOpen(!isModalOpen);
  };

  const handlerOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="p-4 h-full">
      <div>
        <TableAnt
          columns={columns}
          dataSource={budgets}
          pagination={false}
          rowKey="id"
        />
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
