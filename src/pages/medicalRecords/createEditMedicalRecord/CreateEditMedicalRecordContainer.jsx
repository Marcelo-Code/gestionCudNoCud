import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { medicalRecordInitialState } from "../../../data/models";
import { getPatients } from "../../../services/api/patients";
import { getProfessionals } from "../../../services/api/professionals";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { meetings } from "../../../data/documentData";
import {
  createMedicalRecord,
  getMedicalRecords,
} from "../../../services/api/medicalRecords";
import { CreateEditMedicalRecord } from "./CreateEditMedicalRecord";
import { GeneralContext } from "../../../context/GeneralContext";

export const CreateEditMedicalRecordContainer = () => {
  //hooks para cargar pacientes, profesionales y consultas
  const [patients, setPatients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Importa variables de context
  const { handleGoBack, textSize, setTextSize } = useContext(GeneralContext);

  //hook para obtener el id de la consulta
  const { medicalRecordId = null } = useParams();

  //hook para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

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
    createMedicalRecord(formData)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingButton(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getPatients(), getProfessionals(), getMedicalRecords()])
      .then(
        ([patientsResponse, professionalsResponse, medicalRecordsResponse]) => {
          setPatients(patientsResponse.data);
          setProfessionals(professionalsResponse.data);
          setMedicalRecords(medicalRecordsResponse.data);

          if (medicalRecordId) {
            const medicalRecordToEdit = medicalRecordsResponse.data.find(
              (medicalRecord) => medicalRecord.id === parseInt(medicalRecordId)
            );
            console.log(medicalRecordToEdit);
            setFormData(medicalRecordToEdit);
          } else {
            setFormData(medicalRecordInitialState);
          }
        }
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [medicalRecordId]);

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
  };
  return <CreateEditMedicalRecord {...createMedicalRecordProps} />;
};
