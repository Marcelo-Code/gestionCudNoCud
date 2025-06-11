import { useContext } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../../context/GeneralContext";

export const NavBarContainer = () => {
  const { userName, userProfile } = useContext(GeneralContext);

  const navBarProps = {
    userProfile,
    userName,
  };

  return <NavBar {...navBarProps} />;
};
