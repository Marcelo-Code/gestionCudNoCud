//Función para formatear fechas
export const dateFormat = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  return formattedDate;
};

export const monthFormat = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long", // mes completo en español
    timeZone: "UTC",
  });

  return formattedDate;
};

//Función para obtener la extensión de un archivo
export const getExtension = (fileName) => {
  const extension = fileName.split(".").pop();
  return extension;
};

//Función para formatear moneda
export const currencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

//Función para limpiar el nombre de un archivo, elimina los acentos y carácteres especiales
export const sanitizeFileName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]/g, "_");
};
