import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";

export const NavBarContainer = () => {
  const [showLogo, setShowLogo] = useState(false);

  //Lógica para retrasar el renderizado del logo, ya que se renderiza antes que el resto de los componentes
  // apareciendo momenttaneamente en la mitad del DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const navBarProps = {
    showLogo,
  };

  return <NavBar {...navBarProps} />;
};
