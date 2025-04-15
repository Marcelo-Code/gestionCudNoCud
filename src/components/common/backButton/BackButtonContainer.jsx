import React from "react";
import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import { BackButton } from "./BackButton";

export const BackButtonContainer = (backButtonContainerProps) => {
  const { handleGoBack } = useContext(GeneralContext);
  const { modifiedFlag = false } = backButtonContainerProps;
  const backButtonProps = { handleGoBack, modifiedFlag };
  return <BackButton {...backButtonProps} />;
};
