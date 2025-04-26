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
import { ErrorPageContainer } from "../../errorPage/ErrorPageContainer";

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

  //hook para capturar el error
  const [error, setError] = useState(null);

  //hook para el array de consultas
  const [medicalRecords, setMedicalRecords] = useState([]);

  //hook para el array de consultas filtradas
  const [filteredMedicalRecords, setFilteredMedicalRecords] = useState([]);

  //Importa variables de contexto para la selección de registros para el informe
  const {
    handleCheckboxChange,
    selectedRecords,
    userProfessionalId,
    userProfile,
  } = useContext(GeneralContext);

  //Función para eliminar una consulta
  const handleDeleteMedicalRecord = async (medicalRecordId) => {
    try {
      const response = await deleteMedicalRecord(
        medicalRecordId,
        setUpdateList
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
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

        const [
          medicalRecordsResponse,
          patientResponse,
          professionalResponse,
          professionalsResponse,
        ] = await Promise.all([
          action(),
          patientId ? getPatient(patientId) : Promise.resolve({ data: [null] }),
          professionalId
            ? getProfessional(professionalId)
            : Promise.resolve({ data: [null] }),
          getProfessionals(),
        ]);

        setMedicalRecords(medicalRecordsResponse.data);
        setFilteredMedicalRecords(medicalRecordsResponse.data);

        if (patientResponse?.data[0]) {
          setPatient(patientResponse.data[0]);
        }

        if (professionalResponse?.data[0]) {
          setProfessional(professionalResponse.data[0]);
        }

        if (professionalsResponse?.data) {
          setProfessionals(professionalsResponse.data);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientId, professionalId, updateList]);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorPageContainer error={error} />;

  //Define los campos a buscar por el filtro
  const fieldsToSearch = [
    (r) => r.descripcion,
    (r) => r.tipoconsulta,
    (r) => r.pacientes?.nombreyapellidopaciente,
    (r) => r.profesionales?.nombreyapellidoprofesional,
  ];

  //Define los campos a ordenar en el menú de filtros
  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    {
      value: "alphabetical-asc-paciente",
      label: "Paciente (A-Z)",
      name: "pacientes.nombreyapellidopaciente",
    },
    {
      value: "alphabetical-desc-paciente",
      label: "Paciente (Z-A)",
      name: "pacientes.nombreyapellidopaciente",
    },
    {
      value: "alphabetical-asc-profesional",
      label: "Profesional (A-Z)",
      name: "profesionales.nombreyapellidoprofesional",
    },
    {
      value: "alphabetical-desc-profesional",
      label: "Profesional (Z-A)",
      name: "profesionales.nombreyapellidoprofesional",
    },
    {
      value: "date-desc",
      label: "Fecha consulta (más recientes)",
      name: "fechaconsulta",
    },
    {
      value: "date-asc",
      label: "Fecha consulta (más antiguos)",
      name: "fechaconsulta",
    },
  ];

  //Define el nombre del título de la página
  let titleName = "Consultas ";
  if (patientId && professionalId) {
    titleName += `paciente ${patient.nombreyapellidopaciente} y profesional ${professional.nombreyapellidoprofesional}`;
  } else if (patientId) {
    titleName += `paciente ${patient.nombreyapellidopaciente}`;
  } else if (professionalId) {
    titleName += `profesional ${professional.nombreyapellidoprofesional}`;
  }

  //Define la lista de profesionales para el menu del informe
  const professionalsList = Array.from(
    new Map(
      filteredMedicalRecords.map(({ idprofesional, profesionales }) => [
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
    medicalRecords: filteredMedicalRecords,
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

    fieldsToSearch,
    setFilteredRecords: setFilteredMedicalRecords,
    records: medicalRecords,
    DEFAULT_SORT_OPTIONS,
  };
  return <MedicalRecordsList {...medicalRecordsListProps} />;
};
