import { Box, Button, FormGroup, TextField } from "@mui/material";
import "../../assets/css/globalFormat.css";
import "./settings.css";
import DonutChart from "../../components/common/donutChart/DonutChart";
import { generalBackgroundColor, generalColor } from "../../utils/helpers";
import { BackButtonContainer } from "../../components/common/backButton/BackButtonContainer";
import { Icons } from "../../assets/Icons";

export const Settings = (settingsProps) => {
  const {
    data,
    totalSize,
    handleDataChange,
    isLoadingButton,
    modifiedFlag,
    handleSubmit,
  } = settingsProps;

  const EMAILS = [
    {
      name: "emailrecepcioncvs",
      label: "E-mail de recepción de CVs",
    },
    {
      name: "emailadministracion",
      label: "E-mail administración",
    },
    {
      name: "emailcoordinacion",
      label: "E-mail coordinación",
    },
    {
      name: "emailinscripcion",
      label: "E-mail inscripción",
    },
  ];

  const TEXTS = [
    {
      name: "encabezadoinforme",
      label: "Texto encabezado",
    },
    {
      name: "datosinstitucioninforme",
      label: "Institucionales encabezado",
    },
    {
      name: "politicaconfidencialidadinforme",
      label: "Texto confidencialidad",
    },
    {
      name: "tituloinforme",
      label: "Título",
    },
    {
      name: "observacionesinforme",
      label: "Texto observaciones",
    },
    {
      name: "pieinforme",
      label: "Texto pie",
    },
  ];

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Ajustes</Box>
      <Box className="generalSubTitle" sx={{ margin: "10px" }}>
        Espacio utilizado en Supabase
      </Box>
      <Box className="sizeDataContainer">
        <DonutChart
          usedSize={totalSize.database_size_mb}
          totalSize={500}
          nameChart={"Base de Datos"}
        />
        <DonutChart
          usedSize={totalSize.storage_size_mb}
          totalSize={1000}
          nameChart={"Storage"}
        />
      </Box>

      <Box className="generalSubTitle" sx={{ margin: "10px" }}>
        Textos Formato Informe
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {TEXTS.map((text) => (
          <TextField
            key={text.name}
            margin="normal"
            required
            fullWidth
            name={text.name}
            label={text.label}
            type="text"
            multiline
            rows={3}
            id={text.name}
            sx={{
              backgroundColor: "white",
              width: "90%",
              minwidth: "300px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: generalBackgroundColor,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // color normal
                "&.Mui-focused": {
                  color: generalColor, // color al enfocar
                },
              },
            }}
            value={data[text.name]}
            onChange={(e) => handleDataChange(e)}
          />
        ))}
      </Box>

      <Box className="generalSubTitle" sx={{ margin: "10px" }}>
        E-mails
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {EMAILS.map((email) => (
          <TextField
            key={email.name}
            margin="normal"
            required
            name={email.name}
            label={email.label}
            type="text"
            id={email.name}
            sx={{
              backgroundColor: "white",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: generalBackgroundColor,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // color normal
                "&.Mui-focused": {
                  color: generalColor, // color al enfocar
                },
              },
            }}
            value={data[email.name]}
            onChange={(e) => handleDataChange(e)}
          />
        ))}
      </Box>

      <Box className="generalSubTitle" sx={{ margin: "10px" }}>
        Teléfono Administración
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        name="telefonoadministracion"
        label="Teléfono Administración"
        type="text"
        id="telefonoadministracion"
        sx={{
          backgroundColor: "white",
          width: "300px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: generalBackgroundColor,
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray", // color normal
            "&.Mui-focused": {
              color: generalColor, // color al enfocar
            },
          },
        }}
        value={data.telefonoadministracion}
        onChange={(e) => handleDataChange(e)}
      />
      <Box className="generalSubTitle" sx={{ margin: "10px" }}>
        Horarios de Atención
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        name="horariosatencion"
        label="Horarios de Atención"
        type="text"
        multiline
        rows={3}
        id="horariosatencion"
        sx={{
          backgroundColor: "white",
          width: "90%",
          minwidth: "300px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: generalBackgroundColor,
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray", // color normal
            "&.Mui-focused": {
              color: generalColor, // color al enfocar
            },
          },
        }}
        value={data.horariosatencion}
        onChange={(e) => handleDataChange(e)}
      />

      <Box
        sx={{
          minWidth: "300px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Box sx={{ width: "280px" }}>
          <Button
            onClick={() => handleSubmit()}
            loading={isLoadingButton}
            size="small"
            fullWidth
            variant="contained"
            startIcon={<Icons.SaveIcon />}
            disabled={!modifiedFlag}
          >
            Guardar
          </Button>
        </Box>
        <Box sx={{ width: "300px" }}>
          <BackButtonContainer />
        </Box>
      </Box>
    </Box>
  );
};
