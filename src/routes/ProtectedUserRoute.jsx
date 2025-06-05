import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LoadingContainer } from "../pages/loading/LoadingContainer";
import { allowCondition } from "./allowedConditions";
import { GeneralContext } from "../context/GeneralContext";

export const ProtectedUserRoute = ({ children }) => {
  const { professionalId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { userProfile, userProfessionalId, verifyAuth } =
    useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      setIsLoading(true);
      const response = await verifyAuth();

      if (!response.success) {
        if (response.status === 401 || response.status === 404) {
          navigate("/login");
        }
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  if (isLoading) return <LoadingContainer />;

  const isAllowed = allowCondition(
    userProfile,
    userProfessionalId,
    professionalId
  );

  return isAllowed ? children : <Navigate to="/unauthorized" />;
};
