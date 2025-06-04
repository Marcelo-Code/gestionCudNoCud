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

    const userResponse = await getUserByEmail(email);

    if (!userResponse || userResponse.length === 0) {
      errorAlert("El usuario no existe o se encuentra inactivo");
      return;
    }

    setButtonIsLoading(true);
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          setUserProfile(response.userData.perfil);
          setUserProfessionalId(response.userData.idprofesional);
          setUserName(response.userData.nombreyapellidousuario);
          setAuthUser(response.userData);
          console.log(response);

          navigate("/");
        } else {
          errorAlert(response.message);
        }
      })
      .catch((error) => {
        errorAlert(error.message);
      })
      .finally(() => {
        setButtonIsLoading(false);
      });
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
