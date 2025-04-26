import React, { useEffect, useState } from "react";
import {
  getInactivePatients,
  getPatients,
  softDeletePatient,
  softUndeletePatient,
} from "../../../services/api/patients";
import { PatientsList } from "./PatientsList";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ErrorPageContainer } from "../../errorPage/ErrorPageContainer";

export const PatientsListContainer = () => {
  //hook para determinar si se piden parámetros activos o inactivos
  const { active } = useParams();

  //hook para el array de pacientes
  const [patients, setPatients] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para capturar el error
  const [error, setError] = useState(null);

  const { handleGoBack, updateList, setUpdateList, userProfile } =
    useContext(GeneralContext);

  //Función para eliminar un paciente
  const handleDeletePatient = async (patientId, patientName) => {
    try {
      const response = await softDeletePatient(
        patientId,
        patientName,
        setUpdateList
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUndeletePatient = (patientId, patientName) => {
    softUndeletePatient(patientId, patientName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Obtener pacientes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let action;
      if (active === "active") {
        action = () => getPatients();
      } else {
        action = () => getInactivePatients();
      }
      try {
        const [patientsResponse] = await Promise.all([action()]);
        const patientsResponseData = patientsResponse.data;
        setPatients(patientsResponseData);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [active, updateList]);

  if (isLoading) {
    return <LoadingContainer />;
  }
  if (error) {
    return <ErrorPageContainer error={error} />;
  }

  const patientsListProps = {
    patients,
    editMode,
    setEditMode,
    handleDeletePatient,
    handleGoBack,
    active,
    handleUndeletePatient,
    userProfile,
  };

  return <PatientsList {...patientsListProps} />;
};
