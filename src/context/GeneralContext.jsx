/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmationAlert } from "../components/common/alerts/alerts";
import { supabaseClient } from "../services/config/config";
import { getUsers } from "../services/api/users";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para cambiar el tamaño de la fuente
  const [textSize, setTextSize] = useState(15);

  //Función para regresar a la pantalla anterior
  const handleGoBack = async (modifiedFlag) => {
    if (modifiedFlag) {
      const confirm = await confirmationAlert(
        "¿Desea salir sin guardar los cambios?"
      );
      if (confirm) navigate(-1);
      return;
    } else {
      navigate(-1);
    }
  };

  //Función para restaurar los valores originales
  const cancelAction = async () => {
    const confirm = await confirmationAlert(
      "¿Desea salir volver a los valores originales?"
    );
    if (confirm) {
      window.location.reload();
    }
  };
  const [pageIsLoading, setPageIsLoading] = useState(false);

  //hook para actualizar la importación de datos
  const [updateList, setUpdateList] = useState(false);

  const trimUrl = (url) => {
    if (url && typeof url === "string") {
      // Obtener todo después de la última barra diagonal
      const lastSlashIndex = url.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        return url.slice(lastSlashIndex + 1); // Recorta todo lo que está después de la última barra
      }
      return url; // Si no hay barra diagonal, devolvemos la URL original
    }
    return "";
  };

  //Función para aplicar fomato al período facturado
  //------------------------------------------------

  const formatPeriod = (datePeriod) => {
    const date = new Date(datePeriod);
    // Crear el formateador para el mes y el año
    const formatter = new Intl.DateTimeFormat("es-AR", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

    // Formatear la fecha
    const formattedDate = formatter.format(date);

    // Capitalizar el mes
    const formattedDateCapitalized =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return formattedDateCapitalized;
  };

  // Dentro de tu componente:
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleCheckboxChange = (record) => {
    setSelectedRecords((prevSelected) => {
      const alreadySelected = prevSelected.find((r) => r.id === record.id);
      if (alreadySelected) {
        return prevSelected.filter((r) => r.id !== record.id); // lo deselecciona
      } else {
        return [...prevSelected, record]; // lo selecciona
      }
    });
  };

  //Lógica para setear el estado de isLoggedIn, y recuperar datos del usuario autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true" ? true : false;
  });

  const [authUser, setAuthUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfessionalId, setUserProfessionalId] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    Promise.all([supabaseClient.auth.getUser(), getUsers()])
      .then(([responseAuthUser, responseUsers]) => {
        const responseAuthUserData = responseAuthUser.data.user;
        const responseUsersData = responseUsers.data;

        const user = responseUsersData.find(
          (user) => user.email === responseAuthUserData.email
        );

        setUserProfile(user.perfil);
        setUserName(user.nombreyapellidousuario);
        setUserProfessionalId(user.professionalid);

        setAuthUser(responseAuthUserData);
        setUsers(responseUsersData);
      })
      .catch((error) => console.log(error));
  }, [isLoggedIn]);

  const data = {
    handleGoBack,
    cancelAction,
    textSize,
    setTextSize,
    handleCheckboxChange,
    selectedRecords,
    updateList,
    setUpdateList,
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    users,
    userProfile,
    userName,
    userProfessionalId,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
