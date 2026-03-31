import { BudgetOverview } from "@/components/BudgetOverview";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import { TransactionChart } from "@/components/charts/TransactionChart";
import { TransactionList } from "@/components/TransactionList";
import { TransactionForm } from "@/components/form/TransactionForm";
import { Form } from "@/components/form/Form";
import { TaskForm } from "@/components/form/TaskForm";
import { BinanceConnectionForm } from "@/components/form/BinanceConnectionForm";
import { Table } from "@/components/Table";
import {
  getBinanceBalanceSummary,
  getBudget,
  getBudgetItems,
  getTransactions,
} from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const budgets = await getBudgetItems();
  const budget = await getBudget();
  const transactions = await getTransactions();
  const binanceSummary = await getBinanceBalanceSummary();
  const income = budget?.amount || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <DashboardHeader userEmail={user.email || ""} />

      {/* Stats Cards */}
      <DashboardStats
        budget={budget}
        budgets={budgets}
        transactions={transactions}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Charts */}
        <div className="col-span-8 space-y-6">
          {/* Budget Overview */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <BudgetOverview budget={budget} />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-80">
              <ExpenseChart budgets={budgets} income={income} />
            </div>
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-80">
              <BudgetPieChart budgets={budgets} income={income} />
            </div>
          </div>

          {/* Transaction Chart */}
          {transactions.length > 0 && (
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-80">
              <TransactionChart transactions={transactions} />
            </div>
          )}

          {/* Budget Table */}
          <div className="bg-[#BBFD1A] rounded-2xl p-6 shadow-sm">
            <Table budgets={budgets} budget={budget} />
          </div>
        </div>

        {/* Right Column - Forms and Transactions */}
        <div className="col-span-4 space-y-6">
          {/* Budget Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <Form budget={budget} />
          </div>

          {/* Binance Connection */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <BinanceConnectionForm summary={binanceSummary} />
          </div>

          {/* Task Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <TaskForm />
          </div>

          {/* Transaction Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <TransactionForm />
          </div>

          {/* Transaction List */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-96">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

