const formatMoney = (ammount) => {
  return ammount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { formatMoney };
