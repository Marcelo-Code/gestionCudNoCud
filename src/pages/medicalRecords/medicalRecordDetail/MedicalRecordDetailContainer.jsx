import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MedicalRecordDetail } from "./MedicalRecordDetail";
import { getMedicalRecord } from "../../../services/api/medicalRecords";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";

export const MedicalRecordDetailContainer = () => {
  //hook para obtener el id de la consulta
  const { medicalRecordId } = useParams();

  //hook para mostrar datos del formulario
  const [formData, setFormData] = useState({});

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //Importa variables de context
  const { textSize, setTextSize } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    getMedicalRecord(medicalRecordId)
      .then((response) => {
        setFormData(response.data);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [medicalRecordId]);

  if (isLoading) return <LoadingContainer />;

  const medicalRecordDetailProps = {
    formData,
    textSize,
    setTextSize,
  };

  return <MedicalRecordDetail {...medicalRecordDetailProps} />;
};
