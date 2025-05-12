import {
  AlignmentType,
  BorderStyle,
  Document,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Footer,
} from "docx";
import { saveAs } from "file-saver";
import {
  adressHeaderText,
  confidentialityPolicy,
  footerText,
  observations,
  title1,
  titleHeaderText,
} from "./reportTexts";
import { useEffect, useState } from "react";

import logo from "/images/elReinoDelReves.png";
import { getAge } from "../../../../../utils/mathUtils";
import { errorAlert, successAlert } from "../../../../common/alerts/alerts";
import { ExportToWord } from "./ExportToWord";
import { dateFormat } from "../../../../../utils/helpers";

export const ExportToWordContainer = ({
  patient,
  selectedRecords,
  professional,
  signature,
}) => {
  console.log(professional);
  console.log(signature.value);

  const getDateRange = (records) => {
    if (records.length === 0) return { minDate: null, maxDate: null };

    const fechas = records.map((r) => new Date(r.fechaconsulta));

    const minDate = dateFormat(new Date(Math.min(...fechas)));
    const maxDate = dateFormat(new Date(Math.max(...fechas)));

    return { minDate, maxDate };
  };

  const generateDoc = async () => {
    try {
      const response = await fetch(logo);
      const imageBlob = await response.blob();
      const docParagraphs = selectedRecords.map((record) => {
        const dateRecord = dateFormat(record.fechaconsulta);

        const dateParagraph = new Paragraph({
          children: [
            new TextRun({
              text: `Fecha: ${dateRecord}`,
              font: "Arial",
              size: 24,
              bold: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360, before: 180 },
        });

        const descriptionParagraph = new Paragraph({
          children: [
            new TextRun({
              text: `${record.descripcion}`,
              font: "Arial",
              size: 24,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360 },
        });

        return [dateParagraph, descriptionParagraph];
      });

      const flattenedParagraphs = docParagraphs.flat();

      const confidentialityParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `IMPORTANTE: `,
            font: "Arial",
            size: 24,
            bold: true,
          }),
          new TextRun({
            text: `${confidentialityPolicy}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const observationsParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `OBSERVACIONES: `,
            font: "Arial",
            size: 24,
            bold: true,
          }),
          new TextRun({
            text: `${observations}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, before: 480, after: 480 },
      });

      const lineSignatureParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `_____________________`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 0, after: 180 },
      });

      const signatureParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `Firma Profesional`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const imageResponse = await fetch(`${professional[signature.value]}`);
      const buffer = await imageResponse.arrayBuffer();

      // Firma como imagen
      const signatureImage = new Paragraph({
        children: [
          new ImageRun({
            data: buffer,
            transformation: {
              width: 150,
              height: 100,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 1000, after: 180 },
      });

      const title = new Paragraph({
        children: [
          new TextRun({
            text: `${title1}`,
            font: "Arial",
            size: 24,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { line: 360, before: 180, after: 180 },
      });

      const patientData = [
        {
          label: "Nombre y Apellido Pcte.: ",
          value: patient.nombreyapellidopaciente,
        },
        {
          label: "Edad: ",
          value: getAge(patient.fechanacimientopaciente),
        },
        {
          label: "Fecha de Nacimiento: ",
          value: dateFormat(patient.fechanacimientopaciente),
        },
        { label: "Diagnóstico Previo: ", value: patient.diagnosticoprevio },
        { label: "Obra Social: ", value: patient.obrasocialpaciente },
        { label: "Nro. Afiliado: ", value: patient.nroafiliadopaciente },
        { label: "DNI: ", value: patient.dnipaciente },
        {
          label: "Profesional: ",
          value: professional.nombreyapellidoprofesional,
        },
        {
          label: "Especialidad: ",
          value: professional.especialidadprofesional,
        },
        { label: "Matrícula: ", value: professional.matriculaprofesional },
        { label: "CUIT: ", value: professional.cuitprofesional },
        {
          label: "Período Abarcado: ",
          value: `${getDateRange(selectedRecords).minDate} - ${
            getDateRange(selectedRecords).maxDate
          }`,
        },
      ];

      const patientDataList = patientData.map((data) => {
        return new Paragraph({
          bullet: {
            level: 0,
            type: "bullet",
          },
          children: [
            new TextRun({
              text: `${data.label}`,
              font: "Arial",
              size: 24,
              bold: true,
            }),
            new TextRun({
              text: `${data.value}`,
              font: "Arial",
              size: 24,
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { line: 360 },
        });
      });

      const today = dateFormat(new Date());

      const todayParagraph = new Paragraph({
        children: [
          new TextRun({
            text: `Rosario ${today}`,
            font: "Arial",
            size: 24,
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { line: 360, before: 180 },
      });

      const doc = new Document({
        sections: [
          {
            headers: {
              default: new Header({
                children: [
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE,
                    },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  // new ImageRun({
                                  //   data: imageBlob,
                                  //   transformation: {
                                  //     width: 100,
                                  //     height: 100,
                                  //   },
                                  // }),
                                ],
                                spacing: { after: 10 },
                              }),
                            ],
                            borders: {
                              top: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              left: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              right: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              bottom: {
                                style: BorderStyle.SINGLE,
                                size: 20,
                                color: "000000",
                              },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${titleHeaderText}`,
                                    font: "Arial",
                                    size: 32,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${adressHeaderText}`,
                                    font: "Arial",
                                    size: 17,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: { line: 240, before: 300, after: 10 },
                              }),
                            ],
                            verticalAlign: "bottom",
                            borders: {
                              top: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              left: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              right: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              bottom: {
                                style: BorderStyle.SINGLE,
                                size: 20,
                                color: "000000",
                              },
                            },
                          }),
                        ],
                      }),
                    ],
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.SINGLE,
                        size: 20,
                        color: "000000",
                      },
                    },
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE,
                    },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `${footerText}`,
                                    font: "Arial",
                                    size: 16,
                                    bold: true,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                              }),
                            ],
                            borders: {
                              top: {
                                style: BorderStyle.SINGLE,
                                size: 20, // ajustá el grosor
                                color: "000000",
                              },
                              bottom: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              left: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                              right: {
                                style: BorderStyle.NONE,
                                size: 0,
                                color: "FFFFFF",
                              },
                            },
                          }),
                        ],
                      }),
                    ],
                    borders: {
                      top: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      bottom: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      left: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                      right: {
                        style: BorderStyle.NONE,
                        size: 0,
                        color: "FFFFFF",
                      },
                    },
                  }),
                ],
              }),
            },
            children: [
              todayParagraph,
              confidentialityParagraph,
              ...patientDataList,
              title,
              ...flattenedParagraphs,
              observationsParagraph,
              signatureImage,
              lineSignatureParagraph,
              signatureParagraph,
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const filename = `Informe ${
        patient.nombreyapellidopaciente
      } ${new Date().toLocaleDateString()}.docx`;
      saveAs(blob, filename);
      return "Informe generado exitosamente";
    } catch (error) {
      console.log("Error al generar informe: ", error);
      throw error;
    }
  };

  const handleGenerateDoc = async () => {
    generateDoc()
      .then((res) => {
        console.log(res);
        successAlert("Informe generado exitosamente");
      })
      .catch((error) => {
        console.log(error);
        errorAlert("Error al generar informe");
      });
  };

  const [enableReportButton, setEnableReportButton] = useState(false);

  useEffect(() => {
    if (selectedRecords.length > 0 && !!professional.id) {
      setEnableReportButton(true);
    } else {
      setEnableReportButton(false);
    }
  }, [selectedRecords, professional, patient]);

  const exportToWordProps = {
    handleGenerateDoc,
    enableReportButton,
  };

  return <ExportToWord {...exportToWordProps} />;
};
