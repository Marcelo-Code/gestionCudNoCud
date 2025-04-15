import { Tooltip } from "@mui/material";
import React from "react";

const getGradient = (status) => {
  switch (status) {
    case "pendiente":
      return "radial-gradient(circle, #ff4d4d 0%, #990000 100%)"; // red gradient
    case "recibido":
      return "radial-gradient(circle, #ffe066 0%, #bfa600 100%)"; // yellow gradient
    case "pagado":
      return "radial-gradient(circle, #66ff66 0%, #009933 100%)"; // green gradient
    default:
      return "radial-gradient(circle, #ccc 0%, #666 100%)"; // gray for unknown
  }
};

export const TrafficLightStatus = ({ status }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Tooltip
        title={
          status === "pendiente"
            ? "Pendiente aviso recepción O.S."
            : status === "recibido"
            ? "Recibido por O.S. pendiente de cobro"
            : status === "pagado"
            ? "Cobrado"
            : "Estado desconocido"
        }
        placement="top-end"
        arrow
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: getGradient(status),
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
        />{" "}
        <span></span>
      </Tooltip>
    </div>
  );
};
