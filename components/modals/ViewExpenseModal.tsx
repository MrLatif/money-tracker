import { Dispatch, SetStateAction, useContext } from "react";
import Modal from "../Modal";
import { currencyFormatter } from "../../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { financeContext } from "../../lib/store/finance-context";
interface ExpensesProps {
  id?: string;
  color?: string;
  items?: ItemProps[];
  title?: string;
  total?: number;
}

interface ItemProps {
  amount?: number;
  createdAt?: any;
  id?: string;
}
const ViewExpenseModal = ({
  show,
  onClose,
  expense,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  expense: ExpensesProps;
}) => {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  const deleteExpenseItemHandler = async (item: ItemProps) => {
    try {
      const updatedItems = expense.items?.filter((i) => i.id !== item.id);
      if (
        updatedItems &&
        expense.total !== undefined &&
        item.amount !== undefined
      ) {
        const updatedExpense: any = {
          ...expense,
          items: updatedItems,
          total: expense.total - item.amount,
        };
        await deleteExpenseItem(updatedExpense, expense.id);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button onClick={deleteExpenseHandler} className="btn btn-danger">
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense.items?.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {item.createdAt?.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt?.toISOString()}
              </small>
              <p className="flex items-center gap-2">
                {item.amount && currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenseItemHandler(item);
                  }}>
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
