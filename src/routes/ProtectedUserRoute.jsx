import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LoadingContainer } from "../pages/loading/LoadingContainer";
import { checkAuth } from "../services/api/log";

export const ProtectedUserRoute = ({ children }) => {
  const { professionalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [professionalUserId, setProfessionalUserId] = useState(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const response = await checkAuth();

      console.log(response);

      if (response.status !== 200 || !response.userData) {
        setAuthError(true);
        return;
      }

      setUserProfile(response.userData.perfil);
      setProfessionalUserId(response.userData.idprofesional);
    };

    verifyUser().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (authError) return <Navigate to="/unauthorized" />;

  console.log(professionalId, professionalUserId);

  const isAllowed =
    userProfile === "admin" ||
    (userProfile === "profesional" &&
      String(professionalUserId) === String(professionalId));

  return isAllowed ? children : <Navigate to="/unauthorized" />;
};
