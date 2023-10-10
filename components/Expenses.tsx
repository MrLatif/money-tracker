"use client";

import { useState, useRef } from "react";
import React from "react";
import ExpenseCategoryItem from "../components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "./Modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "#009",
    total: 200,
  },
  {
    id: 3,
    title: "Fuel",
    color: "#000",
    total: 1200,
  },
  {
    id: 4,
    title: "Movies",
    color: "#000",
    total: 800,
  },
  {
    id: 5,
    title: "Holiday",
    color: "#000",
    total: 2000,
  },
];

const Expenses = () => {
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  // Handler Functions
  const addIncomeHandler = (e: any) => {
    e.preventDefault();
  };

  const newIncome = {
    amount: amountRef.current?.value,
    description: descriptionRef.current?.value,
  };

  console.log(newIncome);

  return (
    <>
      {/* Add Income Modal */}
      <Modal show={showIncomeModal} onClose={setShowIncomeModal}>
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              ref={descriptionRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Entry
          </button>
        </form>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button
            onClick={() => setShowIncomeModal(true)}
            className="btn btn-primary-outline">
            + Income
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseCategoryItem
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Expenses;
