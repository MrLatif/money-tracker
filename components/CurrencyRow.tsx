import React from "react";

const CurrencyRow = (props: any) => {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;

  return (
    <div>
      <label>Currency: </label>
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        style={{
          backgroundColor: "black",
          borderRadius: "20px",
          width: 75,
          height: 25,
          paddingLeft: 8,
        }}>
        {currencyOptions
          ?.filter((option: string) => option !== "ISL")
          .map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
