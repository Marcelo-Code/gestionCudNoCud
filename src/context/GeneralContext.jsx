/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmationAlert } from "../components/common/alerts/alerts";
import { checkAuth } from "../services/api/log";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [updateFooter, setUpdateFooter] = useState(false);

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

  //hook para guardar las consultas seleccionadas para el informe
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

  //hook para actualizar la importación de datos
  const [updateList, setUpdateList] = useState(false);

  //Lógica para setear el estado de isLoggedIn, y recuperar datos del usuario autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true" ? true : false;
  });

  const [authUser, setAuthUser] = useState({});
  const [userProfile, setUserProfile] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfessionalId, setUserProfessionalId] = useState(null);

  //Obtener los datos del usuario autenticado cuando se monta el componente
  //o cuando se actualiza la pantalla, de lo contrario quedaría sin datos y habría que logearse nuevamente

  const verifyAuth = async () => {
    try {
      const response = await checkAuth();

      if (response.status !== 200 || !response.userData) {
        setAuthUser(null);
        setUserProfile(null);
        setUserName(null);
        setUserProfessionalId(null);
        setIsLoggedIn(false);
        localStorage.clear();
        return { success: false, status: response.status };
      }

      const { perfil, nombreyapellidousuario, professionalid } =
        response.userData;

      setUserProfile(perfil);
      setUserName(nombreyapellidousuario);
      setUserProfessionalId(parseInt(professionalid));
      setAuthUser(response.userData);

      return { success: true, userData: response.userData };
    } catch (error) {
      console.error("Error en verifyAndSetAuth:", error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const data = {
    handleGoBack,
    cancelAction,
    textSize,
    setTextSize,
    updateList,
    setUpdateList,
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    setAuthUser,
    userProfile,
    setUserProfile,
    userName,
    setUserName,
    userProfessionalId,
    setUserProfessionalId,
    handleCheckboxChange,
    selectedRecords,
    verifyAuth,
    updateFooter,
    setUpdateFooter,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
