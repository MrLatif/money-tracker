import React, {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import Modal from "../Modal";
import { financeContext } from "../../lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import CurrencyRow from "../CurrencyRow";
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

const URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=675dd6ce3167b42310c718fc3914f62a";

const AddExpensesModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);

  const titleRef = useRef<any>();
  const colorRef = useRef<any>();
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  let initAmount, amount: number;

  const handleChangeCurrency = (e: any) => {
    setFromCurrency(e.target.value);
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success("Category created!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addExpenseItemHandler = async () => {
    if (expenseAmount) {
      initAmount = +expenseAmount;
      amount = +(initAmount * exchangeRate).toFixed(2);
    }

    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    if (expense) {
      const newExpense: ExpensesProps = {
        color: expense.color,
        title: expense.title,
        total: (expense.total || 0) + +amount,
        items: [
          ...(expense.items || []),
          {
            amount: +amount,
            createdAt: new Date(),
            id: uuidv4(),
          },
        ],
      };
      try {
        await addExpenseItem(selectedCategory, newExpense);

        setExpenseAmount("");
        setSelectedCategory("");
        onClose(false);
        toast.success("Expense added successfully!");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (fromCurrency) {
      fetch(`${URL}&base=EUR&symbols=${fromCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.base && data.rates) {
            setExchangeRate(1 / data.rates[fromCurrency]);
          } else {
            console.error("Invalid data received from the API");
          }
        });
    }
  }, [fromCurrency]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.base && data.rates) {
          setCurrencyOptions([...Object.keys(data.rates)]);
        } else {
          console.error("Invalid data received from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleChangeCurrency}
        />
      </div>

      {/* Expense Categories */}
      {+expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl capitalize">Select expense category</h3>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text-lime-400">
              + New Category
            </button>
          </div>
          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />

              <label>Pick Color</label>
              <input type="color" ref={colorRef} className="w-24 h-10" />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline">
                Create
              </button>
              <button
                onClick={() => setShowAddExpense(false)}
                className="btn btn-danger">
                Cancel
              </button>
            </div>
          )}

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
