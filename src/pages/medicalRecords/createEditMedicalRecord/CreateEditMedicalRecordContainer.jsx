import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { medicalRecordInitialState } from "../../../data/models";
import { getPatient, getPatients } from "../../../services/api/patients";
import {
  getProfessional,
  getProfessionals,
} from "../../../services/api/professionals";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { meetings } from "../../../data/documentsData";
import {
  createMedicalRecord,
  getMedicalRecord,
  getMedicalRecords,
  updateMedicalRecord,
} from "../../../services/api/medicalRecords";
import { CreateEditMedicalRecord } from "./CreateEditMedicalRecord";
import { GeneralContext } from "../../../context/GeneralContext";

export const CreateEditMedicalRecordContainer = () => {
  //hooks para cargar pacientes, profesionales y consultas
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const [professionals, setProfessionals] = useState([]);
  const [professional, setProfessional] = useState({});

  const [medicalRecords, setMedicalRecords] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Importa variables de context
  const { handleGoBack, textSize, setTextSize } = useContext(GeneralContext);

  //hook para obtener el id de la consulta
  const {
    medicalRecordId = null,
    patientId = null,
    professionalId = null,
  } = useParams();

  console.log(professionalId, patientId);

  //hook para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  console.log(formData);

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Activar el flag solo si no se ha activado antes
    if (!modifiedFlag) {
      setModifiedFlag(true);
    }
  };

  //Función submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoadingButton(true);

    delete formData.pacientes;
    delete formData.profesionales;

    const action = medicalRecordId ? updateMedicalRecord : createMedicalRecord;

    console.log(formData);

    action(formData)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingButton(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getPatients(),
      getProfessionals(),
      getMedicalRecords(),
      medicalRecordId
        ? getMedicalRecord(medicalRecordId)
        : Promise.resolve({ data: [null] }),
      patientId ? getPatient(patientId) : Promise.resolve({ data: [null] }),
      professionalId
        ? getProfessional(professionalId)
        : Promise.resolve({ data: [null] }),
    ])
      .then(
        ([
          patientsResponse,
          professionalsResponse,
          medicalRecordsResponse,
          medicalRecordResponse,
          patientResponse,
          professionalResponse,
        ]) => {
          const patientsResponseData = patientsResponse.data;
          const professionalsResponseData = professionalsResponse.data;
          const medicalRecordsResponseData = medicalRecordsResponse.data;
          const medicalRecordResponseData = medicalRecordResponse.data[0];
          const patientResponseData = patientResponse.data[0];
          const professionalResponseData = professionalResponse.data[0];

          setPatients(patientsResponseData);
          setProfessionals(professionalsResponseData);
          setMedicalRecords(medicalRecordsResponseData);

          setPatients(patientsResponseData);
          setProfessional(professionalResponseData);
          setPatient(patientResponseData);

          // baseData será el objeto que se va a cargar en el form
          let baseData = medicalRecordResponseData || {
            ...medicalRecordInitialState,
          };

          // Si hay patientId y/o professionalId, lo agregamos al formData
          // En caso de crear una nueva consulta, se agrega el id correspondiente al formulario
          // quedando fijo el id de la persona referenciada
          if (patientId)
            baseData = {
              ...baseData,
              idpaciente: parseInt(patientId),
            };
          if (professionalId)
            baseData = {
              ...baseData,
              idprofesional: parseInt(professionalId),
            };

          setFormData(baseData);
        }
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [medicalRecordId, patientId, professionalId]);

  if (isLoading) return <LoadingContainer />;

  const createMedicalRecordProps = {
    formData,
    meetings,
    handleChange,
    patients,
    professionals,
    handleSubmit,
    modifiedFlag,
    isLoadingButton,
    textSize,
    setTextSize,
    medicalRecordId,
    patientId,
    professionalId,
    professional,
    patient,
  };

  return <CreateEditMedicalRecord {...createMedicalRecordProps} />;
};
