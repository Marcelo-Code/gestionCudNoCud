import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getPatient } from "../../../services/api/patients";
import { getAge } from "../../../utils/mathUtils";
import { PatientDetail } from "./PatientDetail";

export const PatientDetailContainer = () => {
  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para mostrar datos del formulario
  const [formData, setFormData] = useState({});

  //hook para obtener el id del paciente
  const { patientId } = useParams();

  //Obtener paciente
  useEffect(() => {
    setIsLoading(true);
    getPatient(patientId)
      .then((response) => {
        setFormData(response.data[0]);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [patientId]);

  if (isLoading || !formData) return <LoadingContainer />;

  const patientBirthDate = new Date(formData.fechanacimientopaciente);
  const patientAge = getAge(patientBirthDate);

  const patientDetailProps = {
    formData,
    patientAge,
  };

  return <PatientDetail {...patientDetailProps} />;
};
