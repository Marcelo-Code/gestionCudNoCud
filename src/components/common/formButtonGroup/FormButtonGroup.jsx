import { Box, Button } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";

export const FormButtonGroup = (formButtonGroupProps) => {
  const { modifiedFlag, cancelAction, isLoadingButton, handleGoBack } =
    formButtonGroupProps;

  return (
    <Box sx={{ width: "90%", margin: "20px auto" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <Button
            fullWidth
            disabled={!modifiedFlag}
            onClick={() => {
              cancelAction();
            }}
            size="small"
            variant="contained"
            startIcon={<Icons.CancelIcon />}
          >
            Descartar Cambios
          </Button>
        </Box>
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <Button
            fullWidth
            type="submit"
            loading={isLoadingButton}
            size="small"
            variant="contained"
            startIcon={<Icons.SaveIcon />}
            disabled={!modifiedFlag}
          >
            Guardar
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={() => handleGoBack(modifiedFlag)}
          size="small"
          variant="outlined"
          sx={{ width: "100%", marginTop: "10px" }}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
};
