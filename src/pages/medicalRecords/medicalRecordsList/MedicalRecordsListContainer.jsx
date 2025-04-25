import { useContext, useEffect, useState } from "react";
import { MedicalRecordsList } from "./MedicalRecordsList";
import { useParams } from "react-router-dom";
import {
  deleteMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsByPatient,
  getMedicalRecordsByPatientAndByProfessional,
  getMedicalRecordsByProfessional,
} from "../../../services/api/medicalRecords";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getPatient } from "../../../services/api/patients";
import {
  getProfessional,
  getProfessionals,
} from "../../../services/api/professionals";
import { GeneralContext } from "../../../context/GeneralContext";

export const MedicalRecordsListContainer = () => {
  //hook para obtener el id del paciente o profesional
  const { patientId = null, professionalId = null } = useParams();

  //hook para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

  //hook para guardar el paciente en caso de exista
  const [patient, setPatient] = useState({});

  //hook para guardar el profesinal en caso de exista
  const [professional, setProfessional] = useState({});

  //hook para actualizar la lista luego de una acción
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el array de consultas
  const [medicalRecords, setMedicalRecords] = useState([]);

  //Importa variables de contexto para la selección de registros para el informe
  const {
    handleCheckboxChange,
    selectedRecords,
    userProfessionalId,
    userProfile,
  } = useContext(GeneralContext);

  //Función para eliminar una consulta
  const handleDeleteMedicalRecord = (medicalRecordId) => {
    deleteMedicalRecord(medicalRecordId, setUpdateList)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchData = async () => {
      let action;
      if (patientId && professionalId) {
        action = () =>
          getMedicalRecordsByPatientAndByProfessional(
            patientId,
            professionalId
          );
      } else if (patientId) {
        action = () => getMedicalRecordsByPatient(patientId);
      } else if (professionalId) {
        action = () => getMedicalRecordsByProfessional(professionalId);
      } else {
        action = () => getMedicalRecords();
      }

      setIsLoading(true);

      Promise.all([
        action(),
        patientId ? getPatient(patientId) : Promise.resolve[{ data: [null] }],
        professionalId
          ? getProfessional(professionalId)
          : Promise.resolve[{ data: [null] }],
        getProfessionals(),
      ])
        .then(
          ([
            medicalRecordsResponse,
            patientResponse,
            professionalResponse,
            professionalsResponse,
          ]) => {
            setMedicalRecords(medicalRecordsResponse.data);

            if (patientResponse) setPatient(patientResponse.data[0]);

            console.log(
              medicalRecordsResponse,
              patientResponse,
              professionalResponse,
              professionalsResponse
            );

            if (professionalResponse) {
              setProfessional(professionalResponse.data[0]);
            }
            if (professionalsResponse) {
              setProfessionals(professionalsResponse.data);
            }
          }
        )
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [patientId, professionalId, updateList]);

  if (isLoading) return <LoadingContainer />;

  //Define el nombre del título de la página
  let titleName;
  if (patientId && professionalId) {
    titleName = `paciente ${patient.nombreyapellidopaciente} y profesional ${professional.nombreyapellidoprofesional}`;
  } else if (patientId) {
    titleName = `paciente ${patient.nombreyapellidopaciente}`;
  } else if (professionalId) {
    titleName = `profesional ${professional.nombreyapellidoprofesional}`;
  }

  //Lista de profesionales para el menu del informe
  const professionalsList = Array.from(
    new Map(
      medicalRecords.map(({ idprofesional, profesionales }) => [
        idprofesional,
        {
          id: idprofesional,
          nombreyapellidoprofesional: profesionales.nombreyapellidoprofesional,
          matriculaprofesional: profesionales.matriculaprofesional,
          cuitprofesional: profesionales.cuitprofesional,
          especialidadprofesional: profesionales.especialidadprofesional,
        },
      ])
    ).values()
  ).sort((a, b) =>
    a.nombreyapellidoprofesional.localeCompare(b.nombreyapellidoprofesional)
  );

  const medicalRecordsListProps = {
    medicalRecords,
    professionalsList,
    handleDeleteMedicalRecord,
    editMode,
    setEditMode,
    patientId,
    professionalId,
    titleName,
    handleCheckboxChange,
    selectedRecords,
    patient,
    professionals,
    userProfessionalId,
    userProfile,
  };
  return <MedicalRecordsList {...medicalRecordsListProps} />;
};
