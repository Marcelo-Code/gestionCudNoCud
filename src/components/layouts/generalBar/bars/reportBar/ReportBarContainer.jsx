import { useState } from "react";
import { ReportBar } from "../ReportBar";

export const ReportBarContainer = (reportBarContainerProps) => {
  const {
    activeBar,
    setActiveBar,
    professionalsList,
    enableSearchFilterBar,
    selectedRecords,
    patient,
  } = reportBarContainerProps;

  //hook para el profesional seleccionado para el informe
  const [professional, setProfessional] = useState({});

  //hook para el formulario
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "idprofesional")
      setProfessional(
        professionalsList.find((professional) => professional.id === value)
      );
    setFormData({ ...formData, [name]: value });
  };

  const reportBarProps = {
    activeBar,
    setActiveBar,
    professionalsList,
    enableSearchFilterBar,
    selectedRecords,
    patient,
    handleChange,
    professional,
    formData,
  };

  return <ReportBar {...reportBarProps} />;
};
