import { Box, Button } from "@mui/material";
import "./backButton.css";

export const BackButton = (BackButtonProps) => {
  const { handleGoBack, modifiedFlag } = BackButtonProps;
  return (
    <Box className="backButtonContainer">
      <Button
        size="small"
        fullWidth
        variant="outlined"
        onClick={() => handleGoBack(modifiedFlag)}
      >
        Volver
      </Button>
    </Box>
  );
};
