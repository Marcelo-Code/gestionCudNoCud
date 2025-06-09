import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Icons } from "../../../assets/Icons";
export const FooterData = (data) => {
  return (
    <Accordion slotProps={{ heading: { component: "h4" } }}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        style={{
          backgroundColor: "aqua",
          display: "flex", // Asegura que el contenido se distribuya con Flexbox
          flexDirection: "row-reverse", // Coloca el icono al lado izquierdo
        }}
      >
        <span
          style={{
            width: "100%",
            textAlign: "left",
            fontWeight: "bold",
            textShadow: "0 0 20px black",
          }}
        >
          Canales de Contacto
        </span>
      </AccordionSummary>
      <AccordionDetails
        style={{
          backgroundColor: "aqua",
        }}
      >
        <div>
          <b>E-mail para recepción CVs: </b>
          {data.emailrecepcioncvs}
        </div>
        <div>
          <b>E-mail para administración: </b>
          {data.emailadministracion}
        </div>
        <div>
          <b>
            E-mail para coordinación clínica -informes institucionales e
            interinstitucionales-:{" "}
          </b>
          {data.emailcoordinacion}
        </div>
        <div>
          <b>E-mail inscripción a espacios de-formación: </b>
          {data.emailinscripcion}
        </div>
        <div style={{ marginTop: "20px" }}>
          <b>Teléfono administración: </b>
          {data.telefonoadministracion}
        </div>
        <div>
          <b>Horarios de atención administración: </b>
          {data.horariosatencion}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
