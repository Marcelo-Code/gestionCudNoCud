import { useState, useContext } from "react";
import { supabaseClient } from "../../services/config/config";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { GeneralContext } from "../../context/GeneralContext";

export const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();

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

  return (
    <Login
      handleLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
};
