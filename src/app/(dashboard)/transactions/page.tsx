import { TransactionChart } from "@/components/charts/TransactionChart";
import { TransactionForm } from "@/components/form/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { TransactionsOverview } from "@/components/TransactionsOverview";
import { getTransactions } from "@/lib/actions";
import React from "react";

async function TransactionsPage() {
  const transactions = await getTransactions();
  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Charts */}
        <div className="col-span-8 space-y-6">
          {/* Transaction Chart */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <TransactionsOverview transactions={transactions} />
          </div>
          {transactions.length > 0 && (
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-80">
              <TransactionChart transactions={transactions} />
            </div>
          )}
          {/* Transaction List */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-96">
            <TransactionList transactions={transactions} />
          </div>
          {transactions.length === 0 && (
            <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm h-80 flex items-center justify-center">
              <p className="text-gray-500">No hay transacciones registradas.</p>
            </div>
          )}
        </div>
        {/* Right Column - Forms and Transactions */}
        <div className="col-span-4 space-y-6">
          {/* Transaction Form */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 shadow-sm">
            <TransactionForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
