import { Button, Tooltip } from "@mui/material";
import { Icons } from "../../../../../assets/Icons";
export const ExportToWord = (exportToWordProps) => {
  const { handleGenerateDoc, enableReportButton } = exportToWordProps;
  return (
    <Tooltip title="Generar informe" placement="top-end" arrow>
      <span>
        <Button
          onClick={() => handleGenerateDoc()}
          variant="contained"
          startIcon={<Icons.ArticleIcon />}
          disabled={!enableReportButton}
          size="small"
        >
          Informe
        </Button>
      </span>
    </Tooltip>
  );
};
