export const currencyFormatter = (amount: number) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "EUR",
    style: "currency",
  });

  return formatter.format(amount);
};
