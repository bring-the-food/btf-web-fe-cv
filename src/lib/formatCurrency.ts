type optionsProps = {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbol: string;
};

const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ",",
  decimalSeparator: ".",
  symbol: "₦",
};

export const currencyFormatter = (
  value: number | string,
  options?: optionsProps
) => {
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split(".");
  return `${options.symbol}${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
