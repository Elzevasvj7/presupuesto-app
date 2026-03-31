import { BudgetOverview } from "@/components/BudgetOverview";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { Form } from "@/components/form/Form";
import { TaskForm } from "@/components/form/TaskForm";
import { Table } from "@/components/Table";
import {
  getBudget,
  getBudgetItems,
} from "@/lib/actions";
import React from "react";

async function BudgetPage() {
  const budgets = await getBudgetItems();
  const budget = await getBudget();
  const income = budget?.amount || 0;
  return (
    <div>
      {" "}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Charts */}
        <div className="col-span-8 space-y-6">
          {/* Budget Overview */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <BudgetOverview budget={budget} />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-auto">
              <ExpenseChart  budgets={budgets} income={income} />
            </div>
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-auto">
              <BudgetPieChart budgets={budgets} income={income} />
            </div>
          </div>

         
          {/* Budget Table */}
          <div className="bg-[#BBFD1A] rounded-2xl p-4 shadow-sm">
            <Table budgets={budgets} />
          </div>
        </div>

        {/* Right Column - Forms and Transactions */}
        <div className="col-span-4 space-y-6">
          {/* Budget Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <Form budget={budget} />
          </div>
          {/* Task Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <TaskForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPage;
