import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LoadingContainer } from "../pages/loading/LoadingContainer";
import { checkAuth } from "../services/api/log";
import { allowCondition } from "./allowedConditions";

export const ProtectedUserRoute = ({ children }) => {
  const { professionalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [professionalUserId, setProfessionalUserId] = useState(null);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const response = await checkAuth();

      console.log(response);

      // Si el status es 401, no hay sesión activa, redirigir al login
      if (response.status === 401) {
        navigate("/login");
      }

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

  const isAllowed = allowCondition(
    userProfile,
    professionalUserId,
    professionalId
  );

  return isAllowed ? children : <Navigate to="/unauthorized" />;
};
