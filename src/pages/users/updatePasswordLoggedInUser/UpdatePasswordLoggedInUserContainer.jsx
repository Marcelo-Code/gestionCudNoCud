import { useContext, useState } from "react";
import { supabaseClient } from "../../../services/config/config";
import { UpdatePasswordLoggedInUser } from "./UpdatePasswordLoggedInUser";
import {
  errorAlert,
  successAlert,
} from "../../../components/common/alerts/alerts";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";

export const UpdatePasswordLoggedInUserContainer = () => {
  // hook para el antiguo password
  const [oldPassword, setOldPassword] = useState("");

  // hook para el nuevo password
  const [newPassword, setNewPassword] = useState("");

  // hook para confirmar el nuevo password
  const [confirmPassword, setConfirmPassword] = useState("");

  // hook para el loading en el botón
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Se importan datos del usuario autenticado y el handleGoBack del GeneralContext
  const { authUser, handleGoBack } = useContext(GeneralContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      errorAlert("Las contraseñas no coinciden.");
      return;
    }

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // Reautenticamos al usuario con su email y contraseña actual
    const { error: signInError } = await supabaseClient.auth.signInWithPassword(
      {
        email: user.email,
        password: oldPassword,
      }
    );

    if (signInError) {
      errorAlert("La contraseña actual es incorrecta.");
      return;
    }

    // Si la reautenticación fue exitosa, se cambia la contraseña
    setIsLoadingButton(true);
    supabaseClient.auth
      .updateUser({
        password: newPassword,
      })
      .then((response) => {
        console.log(response, "Contraseña actualizada");
        successAlert("Contraseña actualizada con éxito.");
        handleGoBack();
      })
      .catch((error) => {
        console.log(error, "Error al actualizar la contraseña");
      })
      .finally(() => {
        setIsLoadingButton(false);

        //Se limpian los campos
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
  };

  const updatePasswordLoggedInUserProps = {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    isLoadingButton,
    authUser,
  };

  return <UpdatePasswordLoggedInUser {...updatePasswordLoggedInUserProps} />;
};
