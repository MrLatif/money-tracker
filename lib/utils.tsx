export const currencyFormatter = (amount: string) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return formatter.format(parseInt(amount));
};
