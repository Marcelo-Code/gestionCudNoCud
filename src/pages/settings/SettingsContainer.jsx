import { useContext, useEffect, useState } from "react";
import { getReportData, updateReportData } from "../../services/api/reportData";
import { LoadingContainer } from "../loading/LoadingContainer";
import { Settings } from "./Settings";
import { getTotalStorageAndDbSize } from "../../services/api/generalFunctions";
import { GeneralContext } from "../../context/GeneralContext";
import {
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";

export const SettingsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [totalSize, setTotalSize] = useState({});

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const { setUpdateFooter } = useContext(GeneralContext);

  const handleDataChange = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = () => {
    setIsLoadingButton(true);

    updateReportData(data)
      .then(() => {
        successAlert("Datos actualizados con exito");
        setUpdateFooter((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        errorAlert("Error al actualizar datos");
      })
      .finally(() => setIsLoadingButton(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getReportData(), getTotalStorageAndDbSize()])
      .then(([reportDataresponse, totalSizeResponse]) => {
        setData(reportDataresponse.data);
        setTotalSize(totalSizeResponse.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const settingsProps = {
    data,
    totalSize,
    handleDataChange,
    isLoadingButton,
    modifiedFlag,
    handleSubmit,
  };

  return <Settings {...settingsProps} />;
};
