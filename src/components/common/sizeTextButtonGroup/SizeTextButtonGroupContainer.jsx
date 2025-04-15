import React from "react";
import { SizeTextButtonGroup } from "./SizeTextButtonGroup";

export const SizeTextButtonGroupContainer = ({ textSize, setTextSize }) => {
  const textSizeIncrease = () => {
    if (textSize < 25) setTextSize(textSize + 1);
  };
  const textSizeDecrease = () => {
    if (textSize > 15) setTextSize(textSize - 1);
  };
  const sizeTextButtonGroupProps = {
    textSizeIncrease,
    textSizeDecrease,
    textSize,
  };
  return <SizeTextButtonGroup {...sizeTextButtonGroupProps} />;
};
