import React from "react";

const CurrencyRow = () => {
  return (
    <div>
      <label htmlFor="Currency">Currency: </label>
      <select
        name="Currency"
        style={{
          backgroundColor: "black",
          borderRadius: "20px",
          width: 75,
          height: 25,
          paddingLeft: 8,
        }}>
        <option value="USD">USD</option>
      </select>
    </div>
  );
};

export default CurrencyRow;
