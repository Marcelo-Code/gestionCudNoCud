import { CurrencyFormat } from "./CurrencyFormat";

export const currencyFormat = (
  number,
  lineThrough = false,
  fontSize = "15px"
) => {
  const [intPart, decimalPart] = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(number)
    .split(",");

  const currencyFormatProps = {
    lineThrough,
    intPart,
    decimalPart,
    fontSize,
  };

  return <CurrencyFormat {...currencyFormatProps} />;
};
