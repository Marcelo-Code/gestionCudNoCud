import React, { useContext, useEffect, useState } from "react";
import { ProfessionalsList } from "./ProfessionalsList";
import { LoadingContainer } from "../../loading/LoadingContainer";
import {
  getInactiveProfessionals,
  getProfessionals,
  softDeleteProfessional,
  softUndeleteProfessional,
} from "../../../services/api/professionals";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../../../context/GeneralContext";

export const ProfessionalsListContainer = () => {
  //hook para determinar si se piden parámetros activos o inactivos
  const { active } = useParams();

  //hook para el array de profesionales
  const [professionals, setProfessionals] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  const { updateList, setUpdateList } = useContext(GeneralContext);

  //Función para eliminar un profesional
  const handleDeleteProfessional = (professionalId, professionalName) => {
    softDeleteProfessional(professionalId, professionalName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Función para restaurar un profesional
  const handleUndeleteProfessional = (professionalId, professionalName) => {
    softUndeleteProfessional(professionalId, professionalName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Obtener profesionales
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response =
          active === "active"
            ? await getProfessionals()
            : await getInactiveProfessionals();
        console.log(response);
        setProfessionals(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [active, updateList]);

  if (isLoading) {
    return <LoadingContainer />;
  }

  const professionalsListProps = {
    professionals,
    editMode,
    setEditMode,
    handleDeleteProfessional,
    handleUndeleteProfessional,
    active,
  };

  return <ProfessionalsList {...professionalsListProps} />;
};
