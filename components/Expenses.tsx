"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "../lib/store/finance-context";
import ExpenseCategoryItem from "../components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "../components/modals/AddIncomeModal";
import AddExpensesModal from "../components/modals/AddExpensesModal";
import { currencyFormatter } from "../lib/utils";
import CurrencyRow from "./CurrencyRow";

ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const { expenses, income } = useContext(financeContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + (i.amount || 0);
      }, 0) -
      expenses.reduce((total, e) => {
        return total + (e.total || 0);
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  return (
    <>
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="btn btn-primary">
            + Expenses
          </button>
          <button
            onClick={() => setShowAddIncomeModal(true)}
            className="btn btn-primary-outline">
            + Income
          </button>
        </section>
        <div className="flex gap-40">
          {/* Expenses */}
          <section className="py-6">
            <h3 className="text-2xl">My Expenses</h3>
            <div className="flex flex-col gap-4 mt-6">
              {expenses.map((expense) => {
                return <ExpenseCategoryItem key={expense.id} {...expense} />;
              })}
            </div>
          </section>
          <section className="py-6 w-200px h-200px">
            <h3 className="text-2xl">Stats</h3>
            <div className="w-full mx-auto">
              <Doughnut
                data={{
                  labels: expenses.map((expense) => expense.title),
                  datasets: [
                    {
                      label: "Expenses",
                      data: expenses.map((expense) => expense.total),
                      backgroundColor: expenses.map((expense) => expense.color),
                      borderColor: "transparent",
                    },
                  ],
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Expenses;
