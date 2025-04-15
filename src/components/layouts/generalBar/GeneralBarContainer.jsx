import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GeneralBar } from "./GeneralBar";

export const GeneralBarContainer = (generalBarContainerProps) => {
  const {
    setReportMode = () => {},
    setEditMode,
    enableReportBar = true,
    enableSearchFilterBar = true,
  } = generalBarContainerProps;
  const [activeBar, setActiveBar] = useState("editionBar");

  //Cada vez que se cambia el activeBar se consulta si está activa la reportBar
  //En caso de que se active pasa a modo reportMode
  useEffect(() => {
    if (!enableReportBar) return; // No hacer nada si está deshabilitado
    if (activeBar === "reportBar") {
      setReportMode(true);
      setEditMode(false);
    } else {
      setReportMode(false);
    }
  }, [activeBar, setReportMode, setEditMode, enableReportBar]);

  const generalBarProps = {
    ...generalBarContainerProps,
    activeBar,
    setActiveBar,
    enableReportBar,
    enableSearchFilterBar,
  };
  return <GeneralBar {...generalBarProps} />;
};
