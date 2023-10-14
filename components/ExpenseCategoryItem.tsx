import { useState } from "react";
import { currencyFormatter } from "../lib/utils";

import ViewExpenseModal from "./modals/ViewExpenseModal";
interface ExpensesProps {
  id?: string;
  color?: string;
  items?: [
    {
      amount?: number;
      createdAt?: Date;
      id?: string;
    }
  ];
  title?: string;
  total?: number;
}
function ExpenseCategoryItem(expense: ExpensesProps) {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setShowViewExpenseModal}
        expense={expense}
      />
      <button onClick={() => setShowViewExpenseModal(true)}>
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl w-[350px]">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{expense.total && currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;
