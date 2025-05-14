import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../../context/GeneralContext";

export const NavBarContainer = () => {
  const [showLogo, setShowLogo] = useState(false);

  const { userName, userProfile } = useContext(GeneralContext);

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
    userProfile,
    userName,
  };

  return <NavBar {...navBarProps} />;
};
