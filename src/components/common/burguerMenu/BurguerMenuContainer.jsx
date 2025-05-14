import { useContext, useEffect, useState } from "react";
import { BurguerMenu } from "./BurguerMenu";
import { GeneralContext } from "../../../context/GeneralContext";
import { adminOptions, userOptions } from "./menuOptions";
import { confirmationAlert } from "../alerts/alerts";

export const BurguerMenuContainer = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const {
    userProfile = "profesional",
    userName,
    userProfessionalId,
    setIsLoggedIn,
  } = useContext(GeneralContext);

  //Función para cerrar sesión
  const handleLogout = async () => {
    const confirmed = await confirmationAlert(
      "¿Estás seguro de que deseas salir?"
    );
    if (confirmed) {
      setIsLoggedIn(false);
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (userProfile === "admin") setOptions(adminOptions);
    if (userProfile === "profesional")
      setOptions(userOptions({ professionalId: userProfessionalId }));
  }, [userProfile, userProfessionalId]);

  const burguerMenuProps = {
    toggleDrawer,
    options,
    open,
    userName,
    userProfile,
    handleLogout,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
