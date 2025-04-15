import { useContext, useEffect, useState } from "react";
import { CreateEditPatient } from "./CreateEditPatient";
import {
  createPatient,
  getPatients,
  updatePatient,
} from "../../../services/api/patients";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { GeneralContext } from "../../../context/GeneralContext";
import { patientInitialState } from "../../../data/models";

export const CreateEditPatientContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = patientInitialState;

  //hooks para guardar los pacientes
  const [patients, setPatients] = useState([]);

  //hooks para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //hook para detectar si el dni ya existe
  const [dniMatch, setDniMatch] = useState(false);
  const [foundPatient, setFoundPatient] = useState({});

  //hooks para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  //hook para obtener el id del paciente
  const { patientId = null } = useParams();

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name == "cud" && !value) {
      formData.fechavencimientocud = "";
    }
    if (name === "dnipaciente") {
      if (patients.some((patient) => patient.dnipaciente === value)) {
        const foundPatient = patients.find(
          (patient) => patient.dnipaciente === value
        );
        setFoundPatient(foundPatient);
        setDniMatch(true);
      } else setDniMatch(false);
    }

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Si el dni existe no ejecuta el submit
    if (dniMatch) {
      return;
    }

    const today = dayjs().format("YYYY-MM-DD");
    const updatedFormData = { ...formData, fechaultimaactualizacion: today };

    //Si el id del paciente no existe se crea el paciente
    if (!patientId) {
      setIsLoadingButton(true);
      createPatient(updatedFormData)
        .then((response) => {
          console.log(response);
          handleGoBack();
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingButton(false));
    } else {
      //Si el id del paciente existe se actualiza el paciente
      setIsLoadingButton(true);
      updatePatient(updatedFormData)
        .then((response) => {
          console.log(response);
          handleGoBack();
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingButton(false));
    }
  };

  //Obtener lista de pacientes
  useEffect(() => {
    setIsLoading(true);
    getPatients()
      .then((response) => {
        setPatients(response.data);

        //Si existe el id del paciente se cargan los datos en el formulario
        //Si no se carga el formulario con los datos iniciales
        if (patientId) {
          const patientToEdit = response.data.find(
            (patient) => patient.id === parseInt(patientId)
          );
          setFormData(patientToEdit);
        } else {
          setFormData(initialState);
        }
        console.log(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const createPatientsProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    handleGoBack,
    dniMatch,
    foundPatient,
    patientId,
  };
  return <CreateEditPatient {...createPatientsProps} />;
};
