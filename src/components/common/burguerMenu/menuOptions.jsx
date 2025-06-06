import { Icons } from "../../../assets/Icons";

export const adminOptions = [
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
    icon: <Icons.PersonIcon />,
    option: "Usuarios",
    link: "/users/list/active",
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
  {
    icon: <Icons.PersonIcon />,
    option: "Usuarios Inactivos",
    link: "/users/list/inactive",
  },
  {
    icon: <Icons.KeyIcon />,
    option: "Actualizar contraseña",
    link: `/users/updatePasswordLoggedInUser`,
  },
];

export const userOptions = ({ professionalId }) => {
  return [
    {
      icon: <Icons.PersonIcon />,
      option: "Pacientes",
      link: "/patients/list/active",
    },
    {
      icon: <Icons.PersonIcon />,
      option: "Perfil/datos profesional",
      link: `/professionals/detail/${professionalId}`,
    },
    {
      icon: <Icons.GroupsIcon />,
      option: "Consultas/Report grales",
      link: `/medicalRecords/list/professional/${professionalId}`,
    },
    {
      icon: <Icons.ReceiptIcon />,
      option: "Facturación general",
      link: `/billingRecords/list/professional/${professionalId}`,
    },
    {
      icon: <Icons.KeyIcon />,
      option: "Actualizar contraseña",
      link: `/users/updatePasswordLoggedInUser`,
    },

    {
      icon: <Icons.ErrorIcon />,
      option: "Reclamos",
      link: `/paymentRequests/list/professional/${professionalId}`,
    },
  ];
};
