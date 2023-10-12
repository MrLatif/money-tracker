import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { db } from "../firebase";

interface FinanceContextData {
  income: {
    createdAt?: Date;
    id?: string;
    description?: string;
    amount?: number;
  }[];
  addIncomeItem: (newIncome: any) => Promise<void>;
  removeIncomeItem: (incomeId: any) => Promise<void>;
}

export const financeContext = createContext<FinanceContextData>({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

interface FinanceContextProviderProps {
  children: ReactNode;
}

export default function FinanceContextProvider({
  children,
}: FinanceContextProviderProps) {
  const [income, setIncome] = useState<
    { createdAt?: Date; id?: string; description?: string; amount?: number }[]
  >([]);

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
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const values: FinanceContextData = {
    income,
    addIncomeItem,
    removeIncomeItem,
  };
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };
    getIncomeData();
  }, []);
  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
