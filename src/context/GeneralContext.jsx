/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmationAlert } from "../components/common/alerts/alerts";

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

  const [updateAlertsList, setUpdateAlertsList] = useState(false);

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

  const data = {
    handleGoBack,
    cancelAction,
    textSize,
    setTextSize,
    handleCheckboxChange,
    selectedRecords,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
