import PizZip from "pizzip";
import { Buffer } from "node:buffer";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import ImageModule from "docxtemplater-image-module-free";

// Función auxiliar para obtener el arrayBuffer de la imagen
async function loadImageBinary(path) {
  const response = await fetch(path);
  const buffer = await response.arrayBuffer();
  const base64Flag = "data:image/png;base64,";
  const imageStr = Buffer.from(buffer).toString("base64");
  return base64Flag + imageStr;
}

export const generateDoc = async () => {
  // Cargamos la plantilla .docx
  const content = await fetch("/template.docx").then((res) =>
    res.arrayBuffer()
  );
  const zip = new PizZip(content);

  // Configuramos el módulo de imágenes
  const imageModule = new ImageModule({
    centered: false,
    getImage: function (tagValue) {
      return tagValue;
    },
    getSize: function () {
      return [411, 411];
    },
  });
  const doc = new Docxtemplater(zip, {
    modules: [imageModule],
  });

  // Cargamos la imagen sin codificar
  const imageBuffer = await loadImageBinary("/images/elReinoDelReves.png");

  try {
    // Renderizamos directamente con los datos
    doc.render({
      image: imageBuffer,
    });

    const out = doc.getZip().generate({ type: "blob" });
    saveAs(out, "output.docx");
  } catch (e) {
    console.error("Error al renderizar:", e);
  }
};
