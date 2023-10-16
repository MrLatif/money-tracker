import React, { Dispatch, SetStateAction, useContext } from "react";
import Modal from "../Modal";
import { currencyFormatter } from "../../lib/utils";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs/app-beta/client";

import { financeContext } from "../../lib/store/finance-context";
// Icons
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const AddIncomeModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUser();

  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

  const addIncomeHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = {
      amount: amountRef.current && +amountRef.current.value,
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

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4 ">
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