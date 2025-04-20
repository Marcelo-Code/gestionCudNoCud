import { useState, useEffect } from "react";
import { authToken, supabaseClient } from "../../services/config/config";
import { useNavigate } from "react-router-dom";
import { UpdatePassword } from "./UpdatePassword";
import { LoadingContainer } from "../loading/LoadingContainer";

export const UpdatePasswordContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const tokenData = localStorage.getItem(authToken);
      if (tokenData) {
        const parsedToken = JSON.parse(tokenData);
        setAccessToken(parsedToken.access_token);
        setIsLoading(false);
      } else {
        setTimeout(checkToken, 100); // Esperar 100ms y volver a intentar
      }
    };

    checkToken();
  }, [accessToken]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { error } = await supabaseClient.auth.updateUser(
        {
          password: newPassword,
        },
        {
          access_token: accessToken,
        }
      );

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <LoadingContainer />;

  const updatePasswordProps = {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    error,
    successMessage,
  };

  return <UpdatePassword {...updatePasswordProps} />;
};
