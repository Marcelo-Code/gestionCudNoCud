import { useState, useContext } from "react";
import { supabaseClient } from "../../services/config/config";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { GeneralContext } from "../../context/GeneralContext";
import { getUserByEmail } from "../../services/api/users";
import { errorAlert } from "../../components/common/alerts/alerts";

export const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userResponse = await getUserByEmail(email);

    // setIsLoggedIn(true);
    // navigate("/");

    if (!userResponse || userResponse.length === 0) {
      errorAlert("El usuario no existe o se encuentra inactivo");
      return;
    }

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Successful login
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const loginProps = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    error,
  };

  return <Login {...loginProps} />;
};
