import { FormControl, Typography, Select, MenuItem } from "@mui/material";

export const FilterSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = null,
  showIfEmpty = false,
  sx = {},
}) => {
  if (!showIfEmpty && options.length === 0) return null;

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      {label && (
        <Typography sx={{ color: "black", mb: 1, textAlign: "center" }}>
          {label}
        </Typography>
      )}
      <Select
        value={value === "all" ? "" : value} // Si el valor es "all", mostrar el placeholder
        onChange={(e) => onChange(name, e.target.value)}
        displayEmpty
        sx={{
          color: "black",
          backgroundColor: "white",
          "& .MuiSelect-select": {
            padding: "6px 14px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          ...sx,
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
