import { useContext, useEffect, useState } from "react";
import { MedicalRecordsList } from "./MedicalRecordsList";
import { useParams } from "react-router-dom";
import {
  deleteMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsByPatient,
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

  //hook para mostrar datos de la persona referenciada, paciente o profesional
  const [referencedPerson, setReferencedPerson] = useState({});

  //hook para guardar el paciente en caso de exista
  const [patient, setPatient] = useState({});

  //hook para actualizar la lista luego de una acción
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el array de consultas
  const [medicalRecords, setMedicalRecords] = useState([]);

  const { handleCheckboxChange, selectedRecords } = useContext(GeneralContext);

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
      setIsLoading(true);
      try {
        const professionalsResponse = await getProfessionals();
        setProfessionals(professionalsResponse.data);

        let medicalRecordsResponseData;
        let personData;

        if (patientId) {
          const [medicalRecordsResponse, patientResponse] = await Promise.all([
            getMedicalRecordsByPatient(patientId),
            getPatient(patientId),
          ]);

          console.log(medicalRecordsResponse);
          medicalRecordsResponseData = medicalRecordsResponse.data;
          personData = patientResponse.data[0];
          setPatient(personData);
        } else if (professionalId) {
          const [medicalRecordsResponse, professionalResponse] =
            await Promise.all([
              getMedicalRecordsByProfessional(professionalId),
              getProfessional(professionalId),
            ]);

          console.log(medicalRecordsResponse),
            (medicalRecordsResponseData = medicalRecordsResponse.data);
          personData = professionalResponse.data[0];
        } else {
          const medicalRecordsResponse = await getMedicalRecords();
          medicalRecordsResponseData = medicalRecordsResponse.data;
          console.log(medicalRecordsResponse);
        }
        setMedicalRecords(medicalRecordsResponseData);
        setReferencedPerson(personData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [patientId, professionalId, updateList]);

  if (isLoading) return <LoadingContainer />;

  //Obtiene el nombre del paciente o profesional
  let titleName;
  if (patientId) {
    titleName = `paciente ${referencedPerson.nombreyapellidopaciente}`;
  }
  if (professionalId) {
    titleName = `profesional ${referencedPerson.nombreyapellidoprofesional}`;
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
  };
  return <MedicalRecordsList {...medicalRecordsListProps} />;
};
