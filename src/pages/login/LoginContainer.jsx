import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { GeneralContext } from "../../context/GeneralContext";
import { getUserByEmail } from "../../services/api/users";
import { errorAlert } from "../../components/common/alerts/alerts";
import { login } from "../../services/api/log";

export const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    setUserProfile,
    setUserProfessionalId,
    setUserName,
    setAuthUser,
  } = useContext(GeneralContext);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obtener usuario por email
      const userResponse = await getUserByEmail(email);

      // Verificar si el usuario existe o está activo
      if (!userResponse || userResponse.length === 0) {
        return errorAlert("El usuario no existe o se encuentra inactivo");
      }

      // Iniciar carga de botón
      setButtonIsLoading(true);

      // Intentar login
      const response = await login(email, password);
      const { status, userData, message } = response;

      if (status !== 200) {
        return errorAlert(message); // Muestra el error si no es exitoso
      }

      // Guardar estado y datos en localStorage
      const { perfil, idprofesional, nombreyapellidousuario } = userData;
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); // Guardar como string "true"
      setUserProfile(perfil);
      setUserProfessionalId(idprofesional);
      setUserName(nombreyapellidousuario);
      setAuthUser(userData);

      // Redirigir al usuario
      navigate("/");
    } catch (error) {
      errorAlert(error.message || "Error inesperado");
      setError(error);
    } finally {
      setButtonIsLoading(false); // Restablecer el estado de carga
    }
  };

  const loginProps = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    error,
    buttonIsLoading,
  };

  return <Login {...loginProps} />;
};
