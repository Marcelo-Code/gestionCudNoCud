import { useContext, useEffect, useState } from "react";
import "./footer.css";
import { GeneralContext } from "../../../context/GeneralContext";
import { getReportData } from "../../../services/api/reportData";
import { Icons } from "../../../assets/Icons";
import { Footer } from "./Footer";

export const FooterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const { updateFooter } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    getReportData()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateFooter]);

  const FOOTER_DATA = [
    {
      title: "E-mail para recepción CVs: ",
      text: (
        <a href={`mailto:${data.emailrecepcioncvs}`} style={{ color: "blue" }}>
          {data.emailrecepcioncvs}
        </a>
      ),
      icon: (
        <Icons.AlternateEmailIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
    {
      title: "E-mail para administración: ",

      text: (
        <a
          href={`mailto:${data.emailadministracion}`}
          style={{ color: "blue" }}
        >
          {data.emailadministracion}
        </a>
      ),

      icon: (
        <Icons.AlternateEmailIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
    {
      title:
        "E-mail para coordinación clínica -informes institucionales e interinstitucionales-: ",

      text: (
        <a href={`mailto:${data.emailcoordinacion}`} style={{ color: "blue" }}>
          {data.emailcoordinacion}
        </a>
      ),

      icon: (
        <Icons.AlternateEmailIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
    {
      title: "E-mail inscripción a espacios de formación: ",

      text: (
        <a href={`mailto:${data.emailinscripcion}`} style={{ color: "blue" }}>
          {data.emailinscripcion}
        </a>
      ),
      icon: (
        <Icons.AlternateEmailIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
    {
      title: "Teléfono administración: ",

      text: (
        <a
          href={`https://wa.me/${data.telefonoadministracion}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          {data.telefonoadministracion}
        </a>
      ),
      icon: (
        <Icons.WhatsAppIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
    {
      title: "Horarios de atención administración: ",

      text: data.horariosatencion,
      icon: (
        <Icons.QueryBuilderIcon
          sx={{ color: "white", verticalAlign: "middle", mr: 1 }}
        />
      ),
    },
  ];

  const footerProps = {
    isLoading,
    FOOTER_DATA,
  };

  return <Footer {...footerProps} />;
};
