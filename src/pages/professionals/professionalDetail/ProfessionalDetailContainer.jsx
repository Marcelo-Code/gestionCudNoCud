import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getProfessional } from "../../../services/api/professionals";
import { ProfessionalDetail } from "./ProfessionalDetail";
import { GeneralContext } from "../../../context/GeneralContext";

export const ProfessionalDetailContainer = () => {
  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para mostrar datos del formulario
  const [formData, setFormData] = useState({});

  //hook para obtener el id del paciente
  const { professionalId } = useParams();

  const { userProfile, userProfessionalId } = useContext(GeneralContext);

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
    userProfile,
    userProfessionalId,
  };

  return <ProfessionalDetail {...professionalDetailProps} />;
};
