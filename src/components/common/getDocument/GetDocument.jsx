import { Link } from "react-router-dom";
import { getExtension } from "../../../utils/helpers";
import { Icons } from "../../../assets/Icons";

export const getDocument = (url) => {
  if (!url) return "Sin Documento";

  const extension = getExtension(url).toLowerCase();

  const iconDocumentStyle = {
    margin: "10px",
    fontSize: "2em",
    verticalAlign: "middle",
  };

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", alignItems: "center", gap: "4px" }}
    >
      {["jpg", "png", "jpeg"].includes(extension) && (
        <Icons.ImageIcon sx={iconDocumentStyle} />
      )}
      {["doc", "docx"].includes(extension) && (
        <Icons.ArticleIcon sx={iconDocumentStyle} />
      )}
      {["pdf"].includes(extension) && (
        <Icons.PictureAsPdfIcon sx={iconDocumentStyle} />
      )}
      {extension.toUpperCase()}
    </Link>
  );
};
