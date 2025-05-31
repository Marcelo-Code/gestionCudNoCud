//Función para formatear fechas
export const dateFormat = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    // month: "2-digit",
    month: "long",
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

//Función para exptraer la ruta relativa de un archivo a partir de un nombre de carpeta conocido
export const extractPath = (url, folder) => {
  if (!url) return null;
  const start = url.indexOf(folder);
  return start !== -1 ? url.substring(start) : null;
};

//Función para formatear fechas YYYY-MM
export const formatToInputMonth = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${year}-${month}`; // "01-04-2025" → "2025-04"
};

//Función para obtener la fecha y hora actual
export const getCurrentDateTimeString = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // enero = 0
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
};

//Función para normalizar mayúsculas en nombres
export const normalizeName = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
