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

/** Convert kobo (integer) to naira string with 2 decimals. */
export function koboToNaira(kobo: number | string): string {
  const k =
    typeof kobo === "string"
      ? parseInt(kobo.replace(/\D/g, ""), 10)
      : Math.round(kobo);
  if (!Number.isFinite(k)) throw new Error("Invalid kobo value");

  // convert to naira (decimal) then format with currencyFormatter
  const nairaValue = k / 100;
  return currencyFormatter(nairaValue);
}

/** Convert naira (can be decimal) to kobo (integer). */
export function nairaToKobo(naira: number | string): number {
  const n =
    typeof naira === "string"
      ? parseFloat(naira.replace(/,/g, "").trim())
      : Number(naira);
  if (!Number.isFinite(n)) throw new Error("Invalid naira value");

  // Use currencyFormatter to ensure consistent rounding/display for the naira value,
  // but return the integer kobo value as the conversion result.
  // (currencyFormatter expects a number and returns a formatted string,
  // so we call it here only for consistency / side-effect-free validation.)
  currencyFormatter(Number(n));

  return Math.round(n * 100);
}