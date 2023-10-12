import React, { Dispatch, SetStateAction, useState, useContext } from "react";
import Modal from "../Modal";
import { financeContext } from "../../lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";

interface ExpenseItem {
  amount?: number;
  createdAt?: Date;
  id?: string;
}

interface ExpensesProps {
  id?: string;
  color?: string;
  items?: ExpenseItem[];
  title?: string;
  total?: number;
}
const AddExpensesModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const { expenses } = useContext(financeContext);

  const addExpenseItemHandler = () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    if (expense) {
      const newExpense: ExpensesProps = {
        color: expense.color,
        title: expense.title,
        total: (expense.total || 0) + +expenseAmount,
        items: [
          ...(expense.items || []),
          {
            amount: +expenseAmount,
            createdAt: new Date(),
            id: uuidv4(),
          },
        ],
      };
      console.log(newExpense);
      setExpenseAmount("");
      setSelectedCategory("");
      onClose(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4 ">
        <label>Enter an amount..</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* Expense Categories */}
      {+expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select expense category</h3>
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}>
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-[#585859] rounded-3xl">
                  <div className="flex items-center gap-2">
                    {/* Colored Circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {+expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button onClick={addExpenseItemHandler} className="btn btn-primary">
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddExpensesModal;
