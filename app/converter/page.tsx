"use client";

import React, { useEffect, useState } from "react";
import CurrencyRow from "../../components/CurrencyRow";
const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=675dd6ce3167b42310c718fc3914f62a";
const ConvertPage = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [toCurrency, setToCurrency] = useState<string>("USD");

  useEffect(() => {
    fetch(BASE_URL)
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
    <CurrencyRow
      currencyOptions={currencyOptions}
      toCurrency={toCurrency}
      onChangeCurrency={(e: any) => setToCurrency(e.target.value)}
    />
  );
};

export default ConvertPage;
