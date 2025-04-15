import { useEffect, useState } from "react";
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
import { getProfessional } from "../../../services/api/professionals";

export const MedicalRecordsListContainer = () => {
  //hook para obtener el id del paciente o profesional
  const { patientId = null, professionalId = null } = useParams();

  //hook para mostrar datos de la persona referenciada, paciente o profesional
  const [referencedPerson, setReferencedPerson] = useState({});

  //hook para actualizar la lista luego de una acción
  const [updateList, setUpdateList] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el array de consultas
  const [medicalRecords, setMedicalRecords] = useState([]);

  //Hook para seleccionar registros para el informe
  const [reportTitle, setReportTitle] = useState({
    tipoconsulta: "",
    nombreyapellidoprofesional: "",
    matriculaprofesional: "",
    especialidadprofesional: "",
    periodoabordaje: "",
  });

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
        let response;
        let personData;
        if (patientId) {
          response = await getMedicalRecordsByPatient(patientId);
          const res = await getPatient(patientId);
          personData = res.data[0];
        } else if (professionalId) {
          response = await getMedicalRecordsByProfessional(professionalId);
          const res = await getProfessional(professionalId);
          personData = res.data[0];
        } else {
          response = await getMedicalRecords();
        }
        setMedicalRecords(response.data);
        setReferencedPerson(personData);
        console.log(response);
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
          name: profesionales.nombreyapellidoprofesional,
          value: profesionales.matriculaprofesional,
          cuitprofesional: profesionales.cuitprofesional,
          especialidadprofesional: profesionales.especialidadprofesional,
        },
      ])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  const medicalRecordsListProps = {
    medicalRecords,
    professionalsList,
    handleDeleteMedicalRecord,
    editMode,
    setEditMode,
    patientId,
    professionalId,
    titleName,
  };
  return <MedicalRecordsList {...medicalRecordsListProps} />;
};
