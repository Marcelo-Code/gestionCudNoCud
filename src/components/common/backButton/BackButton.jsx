import { Box, Button } from "@mui/material";
import "./backButton.css";

export const BackButton = (BackButtonProps) => {
  const { handleGoBack, modifiedFlag } = BackButtonProps;
  return (
    <Box className="backButtonContainer">
      <Button
        size="small"
        variant="outlined"
        sx={{ width: "90%", maxWidth: "400px", margin: "10px" }}
        onClick={() => handleGoBack(modifiedFlag)}
      >
        Volver
      </Button>
    </Box>
  );
};
