import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import ImageModule from "docxtemplater-image-module-free";
import { Button } from "@mui/material";

// Configuración para las imágenes
export const DocxGenerator = () => {
  const imageOptions = {
    centered: true,
    getImage: async (tagValue) => {
      const response = await fetch(tagValue); // Descarga la imagen desde la URL
      const blob = await response.blob(); // Convierte la respuesta en un Blob
      return blob; // Devuelve el Blob
    },
    getSize: () => [300, 200], // Tamaño de la imagen (ancho x alto en píxeles)
  };

  // Función para generar el documento
  const generateDocx = async () => {
    try {
      // Carga la plantilla desde la carpeta public
      const response = await fetch("/template.docx"); // Asegúrate de tener el archivo en /public
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        modules: [new ImageModule(imageOptions)], // Usa el módulo de imágenes
      });

      // Datos que reemplazarán los marcadores en la plantilla
      const data = {
        image: "/elReinoDelReves.png", // URL de la imagen
      };

      // Reemplaza los marcadores en la plantilla
      doc.render(data);

      // Genera el archivo final
      const blob = doc.getZip().generate({
        type: "blob",
      });
      saveAs(blob, "DocumentoConImagen.docx"); // Guarda el documento
    } catch (error) {
      console.error("Error generando el documento:", error);
      alert("Hubo un problema generando el documento.");
    }
  };

  return <Button onClick={generateDocx}> generar doc </Button>;
};
