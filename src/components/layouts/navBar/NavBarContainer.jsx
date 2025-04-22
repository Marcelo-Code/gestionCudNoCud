import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../../context/GeneralContext";
import { confirmationAlert } from "../../common/alerts/alerts";

export const NavBarContainer = () => {
  const [showLogo, setShowLogo] = useState(false);

  const { setIsLoggedIn, userName, userProfile } = useContext(GeneralContext);

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

  //Lógica para retrasar el renderizado del logo, ya que se renderiza antes que el resto de los componentes
  // apareciendo momenttaneamente en la mitad del DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navBarProps = {
    showLogo,
    handleLogout,
    userProfile,
    userName,
  };

  return <NavBar {...navBarProps} />;
};
