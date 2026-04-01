"use client";

import { Modal } from "antd";
import React, { useMemo, useState } from "react";
import { BinanceConnectionForm } from "@/components/form/BinanceConnectionForm";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { TransactionList } from "@/components/TransactionList";
import { BudgetOverview } from "@/components/BudgetOverview";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import { TransactionChart } from "@/components/charts/TransactionChart";
import { Form } from "@/components/form/Form";
import { TaskForm } from "@/components/form/TaskForm";
import { TransactionForm } from "@/components/form/TransactionForm";
import { DashboardOverviewData } from "@/lib/actions";

type BinanceSummary =
  | {
      connected: false;
    }
  | {
      connected: true;
      totalUsd: number;
      assetsCount: number;
      assets: Array<{
        asset: string;
        amount: number;
        usdValue: number;
      }>;
    };

type ModalState =
  | { type: "income" }
  | { type: "expense" }
  | { type: "budget" }
  | { type: "category" }
  | null;

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const DashboardOverview = ({
  userEmail,
  overview,
  binanceSummary,
}: {
  userEmail: string;
  overview: DashboardOverviewData;
  binanceSummary: BinanceSummary;
}) => {
  const [activeModal, setActiveModal] = useState<ModalState>(null);

  const healthState = useMemo(() => {
    if (overview.metrics.realVsPlan > 0) {
      return {
        label: "Por encima del plan",
        tone: "text-red-600",
        pill: "bg-red-100 text-red-700",
      };
    }

    if (overview.metrics.realVsPlan === 0) {
      return {
        label: "Exactamente en plan",
        tone: "text-amber-600",
        pill: "bg-amber-100 text-amber-700",
      };
    }

    return {
      label: "Por debajo del plan",
      tone: "text-green-600",
      pill: "bg-green-100 text-green-700",
    };
  }, [overview.metrics.realVsPlan]);

  const modalTitle =
    activeModal?.type === "income"
      ? "Registrar ingreso"
      : activeModal?.type === "expense"
        ? "Registrar gasto"
        : activeModal?.type === "budget"
          ? "Ajustar presupuesto mensual"
          : activeModal?.type === "category"
            ? "Agregar categoría planificada"
            : "";

  return (
    <div className="">
      <DashboardStats metrics={overview.metrics} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Vista general
                </span>
                <div>
                  <p className="text-sm text-slate-500">Saldo operativo real</p>
                  <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
                    {currencyFormatter.format(overview.metrics.currentBalance)}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
                    Efectivo: {currencyFormatter.format(overview.metrics.cashBalance)}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
                    Digital: {currencyFormatter.format(overview.metrics.digitalBalance)}
                  </span>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Esta portada prioriza el dinero realmente disponible por tus movimientos registrados.
                  La planificación se mantiene como referencia separada para medir disciplina y capacidad.
                </p>
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setActiveModal({ type: "income" })}
                  className="rounded-2xl bg-emerald-500 px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Acción rápida</p>
                  <p className="mt-2 text-lg font-semibold">Registrar ingreso</p>
                </button>
                <button
                  onClick={() => setActiveModal({ type: "expense" })}
                  className="rounded-2xl bg-rose-500 px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-rose-100">Acción rápida</p>
                  <p className="mt-2 text-lg font-semibold">Registrar gasto</p>
                </button>
                <button
                  onClick={() => setActiveModal({ type: "budget" })}
                  className="rounded-2xl bg-slate-900 px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Planificación</p>
                  <p className="mt-2 text-lg font-semibold">Ajustar presupuesto</p>
                </button>
                <button
                  onClick={() => setActiveModal({ type: "category" })}
                  className="rounded-2xl bg-[#834CFC] px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-violet-200">Planificación</p>
                  <p className="mt-2 text-lg font-semibold">Agregar categoría</p>
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Plan asignado</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(overview.metrics.plannedAllocationTotal)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Desviación del mes</p>
                <p className={`mt-2 text-2xl font-semibold ${healthState.tone}`}>
                  {currencyFormatter.format(overview.metrics.realVsPlan)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Estado del plan</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${healthState.pill}`}>
                  {healthState.label}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur h-[360px]">
            {overview.transactions.length > 0 ? (
              <TransactionChart transactions={overview.transactions} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                <p className="text-lg font-semibold text-slate-800">Aún no hay flujo registrado</p>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Registra tu primer ingreso o gasto para empezar a ver la evolución diaria de tu caja.
                </p>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur h-auto">
              <ExpenseChart budgets={overview.budgets} income={overview.metrics.plannedBudgetTotal} />
            </section>
            <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur h-auto">
              <BudgetPieChart budgets={overview.budgets} income={overview.metrics.plannedBudgetTotal} />
            </section>
          </div>

          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
            <BudgetOverview budget={overview.budget} />
          </section>
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-6">
          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur h-[420px]">
            <TransactionList transactions={overview.transactions.slice(0, 5)} />
          </section>

          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Salud financiera
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">Real vs planificación</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Gasto real del mes</span>
                  <span>Real</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(overview.metrics.monthExpenses)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Plan asignado</span>
                  <span>Plan</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(overview.metrics.plannedAllocationTotal)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4 text-white">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Resultado</span>
                  <span>{healthState.label}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold">
                  {currencyFormatter.format(overview.metrics.realVsPlan)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Valor positivo significa que ya ejecutaste más gasto del que tenías asignado.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
            <BinanceConnectionForm summary={binanceSummary} />
          </section>
        </div>
      </div>

      <Modal
        open={activeModal !== null}
        onCancel={() => setActiveModal(null)}
        footer={null}
        title={modalTitle}
        styles={{
          content: {
            background: "#F6F6F6",
          },
        }}
      >
        {activeModal?.type === "income" && (
          <TransactionForm key="income-modal" initialType="income" title="Registrar ingreso" />
        )}
        {activeModal?.type === "expense" && (
          <TransactionForm key="expense-modal" initialType="expense" title="Registrar gasto" />
        )}
        {activeModal?.type === "budget" && <Form budget={overview.budget} />}
        {activeModal?.type === "category" && <TaskForm />}
      </Modal>
    </div>
  );
};