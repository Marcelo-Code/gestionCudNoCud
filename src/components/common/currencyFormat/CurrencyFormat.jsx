export const CurrencyFormat = (currencyFormatProps) => {
  const { intPart, decimalPart, fontSize, lineThrough } = currencyFormatProps;
  return (
    <span>
      <span style={{ color: "gray" }}>$ </span>
      <span
        style={{
          textDecoration: lineThrough ? "line-through" : "none",
        }}
      >
        {intPart}
      </span>
      <sup
        style={{ fontSize: `${fontSize}`, marginLeft: "2px", color: "gray" }}
      >
        {decimalPart}
      </sup>
    </span>
  );
};
