import { BudgetOverview } from "@/components/BudgetOverview";
import { Form } from "@/components/form/Form";
import { TaskForm } from "@/components/form/TaskForm";
import { Table } from "@/components/Table";
import { getBudget, getBudgetItems } from "@/lib/actions";

export default async function Home() {
  const budgets = await getBudgetItems();
  const budget = await getBudget();
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-6 h-screen p-4">
      <div className="col-span-3 bg-[#F6F6F6] rounded-2xl p-4">
        <BudgetOverview budget={budget} />
      </div>
      <div className="col-span-2 col-start-4 bg-[#F6F6F6] rounded-2xl p-4">
        <Form budget={budget} />
      </div>
      <div className="col-span-2 row-span-4 col-start-4 row-start-2 bg-[#F6F6F6] rounded-2xl">
        <TaskForm />
      </div>
      <div className="col-span-3 row-span-4 row-start-2 bg-[#BBFD1A] p-4 rounded-2xl h-full">
        <Table budgets={budgets} budget={budget} />  
      </div>
    </div>
  );
}
