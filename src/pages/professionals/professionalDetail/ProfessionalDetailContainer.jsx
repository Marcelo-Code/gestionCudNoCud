import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getProfessional } from "../../../services/api/professionals";
import { ProfessionalDetail } from "./ProfessionalDetail";

export const ProfessionalDetailContainer = () => {
  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para mostrar datos del formulario
  const [formData, setFormData] = useState({});

  //hook para obtener el id del paciente
  const { professionalId } = useParams();

  //Obtener paciente
  useEffect(() => {
    setIsLoading(true);
    getProfessional(professionalId)
      .then((response) => setFormData(response.data[0]))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [professionalId]);

  if (isLoading || !formData) return <LoadingContainer />;

  const professionalDetailProps = {
    formData,
  };

  return <ProfessionalDetail {...professionalDetailProps} />;
};
