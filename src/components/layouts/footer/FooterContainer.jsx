import "./footer.css";
import { FooterData } from "./FooterData";

export const FooterContainer = () => {
  return (
    <div className="footerContainer">
      <div className="footerTitle">Gestión Cudnocud</div>
      <FooterData />
      <div className="footerNameDeveloper">
        Marcelo Feltes Dos Mil Veinticinco
      </div>
    </div>
  );
};
