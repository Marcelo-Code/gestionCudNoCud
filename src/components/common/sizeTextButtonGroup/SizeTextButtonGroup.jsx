import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";
import "./sizeTextButtonGroup.css";

export const SizeTextButtonGroup = (sizeTextButtonGroupProps) => {
  const { textSizeIncrease, textSizeDecrease, textSize } =
    sizeTextButtonGroupProps;

  const iconsStyle = { fontSize: "1.5em", color: "gray" };
  const textSizeStyle = { color: "black", fontSize: "1em" };

  return (
    <Box className="sizeTextButtonGroupContainer">
      <Tooltip title="Aumentar tamaño texto" placement="top-end" arrow>
        <IconButton onClick={textSizeIncrease}>
          <Icons.TextIncreaseIcon sx={iconsStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Disminuir tamaño texto" placement="top-end" arrow>
        <IconButton onClick={textSizeDecrease}>
          <Icons.TextDecreaseIcon sx={iconsStyle} />
        </IconButton>
      </Tooltip>
      <Typography sx={textSizeStyle}>{textSize}px</Typography>
    </Box>
  );
};
