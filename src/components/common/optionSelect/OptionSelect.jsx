import { TextField, Autocomplete } from "@mui/material";

// Componente Select con Autocomplete y búsqueda
export const OptionSelect = ({
  clients,
  getOptionLabel,
  name,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  helperText,
  fullWidth = true,
}) => {
  return (
    <Autocomplete
      name={name}
      options={clients}
      getOptionLabel={getOptionLabel}
      value={clients.find((client) => client.id === value) || null}
      onChange={(_, newValue) => {
        onChange({
          target: { name, value: newValue ? newValue.id : "" },
        });
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
          sx={{
            backgroundColor: "white",
            height: "40px", //Ajusta la altura del componente interior
            alignItems: "center", // centra contenido vertical
            "& .MuiInputBase-root": {
              height: "100%", // fuerza la altura del input
            },
            "& label": {
              top: "-6px", // ajusta si el label flotante queda muy bajo
            },
          }}
        />
      )}
    />
  );
};
