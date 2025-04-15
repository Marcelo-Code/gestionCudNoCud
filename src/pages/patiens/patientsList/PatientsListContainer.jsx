import React, { useEffect, useState } from "react";
import {
  deletePatient,
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

export const PatientsListContainer = () => {
  //hook para determinar si se piden parámetros activos o inactivos
  const { active } = useParams();

  //hook para el array de pacientes
  const [patients, setPatients] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para actualizar la lista luego de una accion
  const [updateList, setUpdateList] = useState(false);

  const { handleGoBack } = useContext(GeneralContext);

  //Función para eliminar un paciente
  const handleDeletePatient = (patientId, patientName) => {
    softDeletePatient(patientId, patientName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
      try {
        const response =
          active === "active"
            ? await getPatients()
            : await getInactivePatients();
        console.log(response);
        setPatients(response.data);
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

  const patientsListProps = {
    patients,
    editMode,
    setEditMode,
    handleDeletePatient,
    handleGoBack,
    active,
    handleUndeletePatient,
  };

  return <PatientsList {...patientsListProps} />;
};
