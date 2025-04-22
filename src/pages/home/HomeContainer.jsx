import React, { useContext, useEffect, useState } from "react";
import { Home } from "./Home";
import { getTotalStorageAndDbSize } from "../../services/api/generalFunctions";
import { LoadingContainer } from "../loading/LoadingContainer";
import { GeneralContext } from "../../context/GeneralContext";

export const HomeContainer = () => {
  const [totalSize, setTotalSize] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUpdateUserProfile } = useContext(GeneralContext);
  useEffect(() => {
    setUpdateUserProfile((prev) => !prev);
    setIsLoading(true);
    getTotalStorageAndDbSize()
      .then((res) => {
        console.log(res.data);
        setTotalSize(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const homeProps = {
    totalSize,
  };

  return <Home {...homeProps} />;
};
