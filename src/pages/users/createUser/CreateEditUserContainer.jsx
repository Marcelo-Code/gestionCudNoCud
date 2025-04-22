import { useContext, useEffect, useState } from "react";

import { LoadingContainer } from "../../loading/LoadingContainer";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../../../context/GeneralContext";
import { userInitialState } from "../../../data/models";
import {
  createAuthUser,
  getAllUsers,
  getAuthUser,
  updateAuthUser,
} from "../../../services/api/users";
import { CreateEditUser } from "./CreateEditUser";
import { getProfessionals } from "../../../services/api/professionals";

export const CreateEditUserContainer = () => {
  //Valores iniciales para el formulario
  const initialState = userInitialState;

  //hooks para guardar los usuarios
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  //hooks para guardar los profesionales
  const [professionals, setProfessionals] = useState([]);

  // hook para obtener el id del usuario
  const { userId = null } = useParams();

  //Importa variables de context
  const { handleGoBack } = useContext(GeneralContext);

  //hooks para el loading
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //hook para detectar si el dni ya existe
  const [emailMatch, setEmailMatch] = useState(false);
  const [foundUser, setFoundUser] = useState({});
  const [activeEmails, setActiveEmails] = useState([]);

  //hooks para detectar los cambios
  const [modifiedFlag, setModifiedFlag] = useState(false);

  //hooks para guardar los datos del formulario
  const [formData, setFormData] = useState({});

  //Función para guardar los cambios en el registro
  const handleChange = (e) => {
    const { value, name } = e.target;

    let updatedFormData = {
      ...formData,
      [name]: name === "email" ? value.toLowerCase() : value,
    };

    if (name === "professionalid") {
      const selectedProfessional = professionals.find(
        (professional) => professional.id === parseInt(value)
      );

      const asignedUserName = selectedProfessional
        ? selectedProfessional.nombreyapellidoprofesional
        : "";

      const asignedUserEmail = selectedProfessional
        ? selectedProfessional.emailprofesional.toLowerCase()
        : "";

      updatedFormData = {
        ...formData,
        nombreyapellidousuario: asignedUserName,
        email: asignedUserEmail,
        professionalid: value,
      };
    }

    //Verifica si el email ya está asociado a otro usuario
    if (name === "email") {
      if (
        activeEmails.some(
          (email) => email.toLowerCase() === value.toLowerCase()
        )
      ) {
        const foundUser = users.find(
          (user) => user.email === value.toLowerCase()
        );
        setFoundUser(foundUser);
        setEmailMatch(true);
      } else setEmailMatch(false);
    }
    setFormData(updatedFormData);

    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Si el dni existe no ejecuta el submit
    if (emailMatch) {
      return;
    }

    const updatedFormData = { ...formData };

    const action = userId ? updateAuthUser : createAuthUser;

    setIsLoadingButton(true);
    action(updatedFormData)
      .then((response) => {
        console.log(response);
        handleGoBack();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingButton(false));
  };

  //Obtener lista de pacientes
  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getAllUsers(),
      getProfessionals(),
      userId ? getAuthUser(userId) : Promise.resolve({ data: [null] }),
    ])
      .then(([usersResponse, professionalsResponse, userResponse]) => {
        const usersResponseData = usersResponse.data;
        const professionalsResponseData = professionalsResponse.data;
        const userResponseData = userResponse.data[0];
        setUsers(usersResponseData);

        //Realiza una lista de los emails de los usuarios activos
        const activeEmails = usersResponseData
          .filter((user) => user.auth_user_id !== null)
          .map((user) => user.email);

        setActiveEmails(activeEmails);

        //Lista los profesionales sin un auth.user asociado
        const professionalsWithoutUser = professionalsResponseData.filter(
          (professional) =>
            !activeEmails.includes(professional.emailprofesional)
        );

        setProfessionals(professionalsWithoutUser);
        setUser(userResponseData);

        let baseData = userResponseData || initialState;

        setFormData(baseData);
      })

      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [userId]);

  if (isLoading) return <LoadingContainer />;

  const createEditUserProps = {
    handleSubmit,
    handleChange,
    isLoadingButton,
    modifiedFlag,
    formData,
    emailMatch,
    foundUser,
    userId,
    professionals,
  };

  return <CreateEditUser {...createEditUserProps} />;
};
