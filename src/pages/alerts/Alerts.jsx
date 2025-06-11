import * as React from "react";
import {
  Box,
  Badge,
  IconButton,
  Tooltip,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import "./alerts.css";
import { Icons } from "../../assets/Icons";

export const Alerts = (alertsProps) => {
  const {
    professionalsExpirationRnpRecords,
    patientsExpirationCudRecords,
    totalRecordsQuantity,
    toggleDrawer,
    open,
  } = alertsProps;

  const list = () => (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "aqua",
        color: "black",
        // px: 2,
        // py: 2,
      }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Tooltip title="Cerrar" placement="top-end" arrow>
          <IconButton onClick={toggleDrawer(false)}>
            <Icons.CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        variant="h6"
        align="center"
        sx={{
          mb: 3,
          borderBottom: "1px solid white",
          pb: 2,
          fontFamily: "broughton",
        }}
      >
        Documentos a expirar
      </Typography>

      <Section
        title="CUD"
        records={patientsExpirationCudRecords}
        label="Paciente"
        daysKey="diasexpiracioncud"
        nameKey="nombreyapellidopaciente"
      />

      <Divider sx={{ my: 4, borderColor: "white" }} />

      <Section
        title="RNP"
        records={professionalsExpirationRnpRecords}
        label="Profesional"
        daysKey="diasexpiracionrnp"
        nameKey="nombreyapellidoprofesional"
      />
    </Box>
  );

  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <Tooltip title="Alertas" placement="top-end" arrow>
        <IconButton onClick={toggleDrawer(true)}>
          <Badge badgeContent={totalRecordsQuantity} color="primary">
            <Icons.NotificationsActiveIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const Section = ({ title, records, label, daysKey, nameKey }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ fontFamily: "broughton" }}
      >
        {title}
      </Typography>
      {records.length === 0 ? (
        <Typography align="center">No hay vencimientos</Typography>
      ) : (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              mb: 1,
              pl: 2,
              pr: 1,
            }}
          >
            <Typography variant="subtitle2">{label}</Typography>
            <Typography variant="subtitle2" align="right">
              Días
            </Typography>
          </Box>
          {records.map((record, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                mb: 0.5,
                pl: 2,
                pr: 1,
              }}
            >
              <Typography variant="body2">{record[nameKey]}</Typography>
              <Typography variant="body2" align="right">
                {record[daysKey]}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
