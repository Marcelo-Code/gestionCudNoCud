import { Icons } from "../../../assets/Icons";
import { use, useContext, useEffect, useState } from "react";
import { BurguerMenu } from "./BurguerMenu";
import { GeneralContext } from "../../../context/GeneralContext";
import { adminOptions, userOptions } from "./menuOptions";

export const BurguerMenuContainer = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { userProfile = "profesional", userProfessionalId } =
    useContext(GeneralContext);

  console.log(userProfessionalId);

  useEffect(() => {
    if (userProfile === "admin") setOptions(adminOptions);
    if (userProfile === "profesional")
      setOptions(userOptions({ professionalId: userProfessionalId }));
  }, [userProfile, userProfessionalId]);

  const burguerMenuProps = {
    toggleDrawer,
    options,
    open,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
