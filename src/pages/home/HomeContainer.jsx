import React, { useEffect, useState } from "react";
import { Home } from "./Home";
import { getTotalStorageAndDbSize } from "../../services/api/generalFunctions";
import { LoadingContainer } from "../loading/LoadingContainer";

export const HomeContainer = () => {
  const [totalSize, setTotalSize] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
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
