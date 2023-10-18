"use client";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal";
import { currencyFormatter } from "../../lib/utils";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs/app-beta/client";

import { financeContext } from "../../lib/store/finance-context";
// Icons
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import CurrencyRow from "../CurrencyRow";

const URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=675dd6ce3167b42310c718fc3914f62a";

const AddIncomeModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUser();

  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

  let initAmount, amount: number;

  const handleChangeCurrency = (e: any) => {
    setFromCurrency(e.target.value);
  };

  const addIncomeHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amountRef.current) {
      initAmount = +amountRef.current.value;
      amount = +(initAmount * exchangeRate).toFixed(2);
    }
    const newIncome = {
      amount: amount,
      description: descriptionRef.current?.value,
      createdAt: new Date(),
      uid: user?.id,
    };
    try {
      await addIncomeItem(newIncome);
      if (descriptionRef.current && amountRef.current) {
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        toast.success("Income added! successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId: string | undefined) => {
    try {
      removeIncomeItem(incomeId);
      toast.success("Income deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  //
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
      <form
        id="add-income"
        onSubmit={addIncomeHandler}
        className="flex flex-col gap-4 ">
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            id="amount"
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
            id="description"
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Enter income description"
            required
          />
        </div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleChangeCurrency}
        />
        <button type="submit" className="btn btn-primary">
          Add Entry
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
        {income.map((i) => {
          if (i.createdAt && i.id) {
            return (
              <div className="flex justify-between items-center" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {i.amount && currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}>
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          }
        })}
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
