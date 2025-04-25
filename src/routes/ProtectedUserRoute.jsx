import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { LoadingContainer } from "../pages/loading/LoadingContainer";

export const ProtectedUserRoute = ({ children }) => {
  const { userProfile = null, userProfessionalId = null } =
    useContext(GeneralContext);
  const { professionalId } = useParams();

  //Espera a que se cargue el perfil del usuario desde el contexto
  if (!userProfile) {
    return <LoadingContainer />;
  }

  const isAllowed =
    userProfile === "admin" ||
    (userProfile === "profesional" &&
      userProfessionalId?.toString() === professionalId);

  return isAllowed ? children : <Navigate to="/unauthorized" />;
};
