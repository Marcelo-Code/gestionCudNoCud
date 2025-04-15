import Swal from "sweetalert2";
import "./alerts.css";

export const confirmationAlert = async (message) => {
  const result = await Swal.fire({
    title: `${message}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro",
    cancelButtonText: "Cancelar",
    backdrop: false,
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });
  return result.isConfirmed;
};

export const errorAlert = async (text) => {
  Swal.fire({
    icon: "error",
    title: "Ups...",
    text: `${text}`,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
    didOpen: () => {
      Swal.getPopup().style.fontFamily = "Arial, sans-serif";
    },
  });
};

export const successAlert = (text) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `${text}`,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });
};

export const warningAlert = (text) => {
  return Swal.fire({
    title: "Aviso",
    text: `${text}`,
    icon: "info",
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });
};
