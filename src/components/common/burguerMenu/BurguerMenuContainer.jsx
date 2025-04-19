import { Icons } from "../../../assets/Icons";
import { useState } from "react";
import { BurguerMenu } from "./BurguerMenu";

export const BurguerMenuContainer = () => {
  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: <Icons.PersonIcon />,
      option: "Pacientes",
      link: "/patients/list/active",
    },
    {
      icon: <Icons.PersonIcon />,
      option: "Profesionales",
      link: "/professionals/list/active",
    },
    {
      icon: <Icons.GroupsIcon />,
      option: "Consultas/Report",
      link: "/medicalRecords/list",
    },
    {
      icon: <Icons.ReceiptIcon />,
      option: "Facturación",
      link: "/billingRecords/list",
    },
    {
      icon: <Icons.ErrorIcon />,
      option: "Reclamos",
      link: "/paymentRequests/list",
    },
    {
      icon: <Icons.PersonIcon />,
      option: "Pacientes Inactivos",
      link: "/patients/list/inactive",
    },
    {
      icon: <Icons.PersonIcon />,
      option: "Profesionales Inactivos",
      link: "/professionals/list/inactive",
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const burguerMenuProps = {
    toggleDrawer,
    options,
    open,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
