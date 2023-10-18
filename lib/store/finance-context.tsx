"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { db } from "../firebase";
import { useUser } from "@clerk/nextjs";

interface IncomeProps {
  createdAt?: Date;
  id?: string;
  description?: string;
  amount?: number;
}
export interface ExpensesProps {
  id?: string;
  color?: string;
  items?: [
    {
      amount?: number;
      createdAt?: any;
      id?: string;
    }
  ];
  title?: string;
  total?: number;
}
interface FinanceContextData {
  income: IncomeProps[];
  expenses: ExpensesProps[];
  actions: number;
  addIncomeItem: (newIncome: any) => Promise<void>;
  removeIncomeItem: (incomeId: any) => Promise<void>;
  addExpenseItem: (expenseCategoryId: any, newExpense: any) => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  deleteExpenseItem: (
    updatedExpense: ExpensesProps,
    expenseCategoryId: any
  ) => Promise<void>;
  deleteExpenseCategory: (expenseCategoryId: any) => Promise<void>;
}

export const financeContext = createContext<FinanceContextData>({
  income: [],
  expenses: [],
  actions: 0,
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

interface FinanceContextProviderProps {
  children: ReactNode;
}

export default function FinanceContextProvider({
  children,
}: FinanceContextProviderProps) {
  const [income, setIncome] = useState<IncomeProps[]>([]);
  const [expenses, setExpenses] = useState<ExpensesProps[]>([]);
  const [actions, setActions] = useState<number>(0);

  const { user } = useUser();

  const addCategory = async (category: any) => {
    try {
      const collectionRef = collection(db, "expenses");

      const docSnap = await addDoc(collectionRef, {
        uid: user?.id,
        ...category,
        items: [],
      });

      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            uid: user?.id,
            items: [],
            ...category,
          },
        ];
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId: any) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);

      await deleteDoc(docRef);

      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (ex) => ex.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error) {
      throw error;
    }
  };

  const addExpenseItem = async (
    expenseCategoryId: any,
    newExpense: ExpensesProps
  ) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });

        if (foundIndex !== -1) {
          updatedExpenses[foundIndex] = {
            id: expenseCategoryId,
            ...newExpense,
          };
        }

        return updatedExpenses;
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error: any) {
      throw error;
    }
  };

  const deleteExpenseItem = async (
    updatedExpense: ExpensesProps,
    expenseCategoryId: any
  ) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, { ...updatedExpense });

      setExpenses((prevExpenses) => {
        const updatedExpenses: ExpensesProps[] = [...prevExpenses];

        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });

        if (foundIndex !== -1) {
          if (updatedExpense.items) {
            updatedExpenses[foundIndex].items = [...updatedExpense.items];
            updatedExpenses[foundIndex].total = updatedExpense.total;
          }
        }

        return updatedExpenses;
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error: any) {
      throw error;
    }
  };

  const addIncomeItem = async (newIncome: any) => {
    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const removeIncomeItem = async (incomeId: any) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
      setActions((prevAction) => prevAction + 1);
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const values: FinanceContextData = {
    income,
    expenses,
    actions,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };
  useEffect(() => {
    if (!user) return;

    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", "==", user.id));

      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", "==", user.id));

      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
