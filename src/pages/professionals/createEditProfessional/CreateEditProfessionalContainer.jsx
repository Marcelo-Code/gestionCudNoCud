import { useContext, useEffect, useState } from "react";

import { LoadingContainer } from "../../loading/LoadingContainer";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { GeneralContext } from "../../../context/GeneralContext";
import {
  createProfessional,
  getProfessionals,
  updateProfessional,
} from "../../../services/api/professionals";
import { CreateEditProfessional } from "./CreateEditProfessional";
import { professionalInitialState } from "../../../data/models";

export const CreateEditProfessionalContainer = () => {
  const { handleGoBack, updateList, setUpdateList } =
    useContext(GeneralContext);

  //Valores iniciales para el formulario
  const initialState = professionalInitialState;

  //hooks para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

  //hooks para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //hook para detectar si el dni ya existe
  const [dniMatch, setDniMatch] = useState(false);
  const [foundProfessional, setFoundProfessional] = useState({});

  //hooks para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  //hook para obtener el id del paciente
  const { professionalId = null } = useParams();

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "dniprofesional") {
      if (
        professionals.some(
          (professional) => professional.dniprofesional === value
        )
      ) {
        const foundProfessional = professionals.find(
          (professional) => professional.dniprofesional === value
        );
        setFoundProfessional(foundProfessional);
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

    //Actualiza las listas
    //Hace actualizar también las alertas
    setUpdateList(!updateList);

    //Si el id del profesional no existe se crea el profesional
    if (!professionalId) {
      setIsLoadingButton(true);
      createProfessional(updatedFormData)
        .then((response) => {
          console.log(response);
          handleGoBack();
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingButton(false));
    } else {
      //Si el id del profesional existe se actualiza el profesional
      setIsLoadingButton(true);
      updateProfessional(updatedFormData)
        .then((response) => {
          console.log(response);
          handleGoBack();
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadingButton(false));
    }
  };

  //Obtener lista de profesionales
  useEffect(() => {
    setIsLoading(true);
    getProfessionals()
      .then((response) => {
        setProfessionals(response.data);

        console.log(response);

        //Si existe el id del profesional se cargan los datos en el formulario
        //Si no se carga el formulario con los datos iniciales
        if (professionalId) {
          const professionalToEdit = response.data.find(
            (professional) => professional.id === parseInt(professionalId)
          );
          setFormData(professionalToEdit);
        } else {
          setFormData(initialState);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [initialState, professionalId]);

  if (isLoading) return <LoadingContainer />;

  const createEditProfessionalProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    dniMatch,
    foundProfessional,
    professionalId,
  };
  return <CreateEditProfessional {...createEditProfessionalProps} />;
};
