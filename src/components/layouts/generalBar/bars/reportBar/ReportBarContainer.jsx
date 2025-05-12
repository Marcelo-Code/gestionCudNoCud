import { useState } from "react";
import { ReportBar } from "./ReportBar";
import { signatureData } from "../../../../../data/documentsData";

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
  const [signature, setSignature] = useState({});

  //hook para el formulario
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "idprofesional")
      setProfessional(
        professionalsList.find((professional) => professional.id === value)
      );
    if (name === "signatureDataId")
      setSignature(signatureData.find((signature) => signature.id === value));
    setFormData({ ...formData, [name]: value });

    console.log(professional);
  };

  const reportBarProps = {
    activeBar,
    setActiveBar,
    professionalsList,
    signatureData,
    enableSearchFilterBar,
    selectedRecords,
    patient,
    handleChange,
    professional,
    signature,
    formData,
  };

  return <ReportBar {...reportBarProps} />;
};
