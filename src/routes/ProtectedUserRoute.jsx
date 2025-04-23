import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

export const ProtectedUserRoute = ({ children }) => {
  const { userProfile, userProfessionalId } = useContext(GeneralContext);
  const { professionalId } = useParams();

  const isAllowed =
    userProfile === "admin" ||
    (userProfile === "profesional" &&
      userProfessionalId?.toString() === professionalId);

  return isAllowed ? children : <Navigate to="/unauthorized" />;
};
