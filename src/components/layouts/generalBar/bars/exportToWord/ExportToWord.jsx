import { Button, Tooltip } from "@mui/material";
import { Icons } from "../../../../../assets/Icons";
export const ExportToWord = (exportToWordProps) => {
  const { handleGenerateDoc, enableReportButton, buttonIsLoading } =
    exportToWordProps;
  return (
    <Tooltip title="Generar informe" placement="top-end" arrow>
      <span>
        <Button
          onClick={() => handleGenerateDoc()}
          variant="contained"
          startIcon={<Icons.ArticleIcon />}
          disabled={!enableReportButton}
          size="small"
          loading={buttonIsLoading}
        >
          Informe
        </Button>
      </span>
    </Tooltip>
  );
};
