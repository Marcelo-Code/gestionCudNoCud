import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import "../../../../assets/css/globalFormat.css";
import "./noCudBillingRecordsList.css";
import { Icons } from "../../../../assets/Icons";
import { dateFormat } from "../../../../utils/helpers";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { useState } from "react";
import { GridPagination, DataGridPro } from "@mui/x-data-grid-pro";
import { currencyFormat } from "../../../../components/common/currencyFormat/CurrencyFormatContainer";
import { getDocument } from "../../../../components/common/getDocument/GetDocument";
import { GeneralBarContainer } from "../../../../components/layouts/generalToolsBar/GeneralBarContainer";
import {
  cudBillingRecordsFilterOptions,
  noCudBillingRecordsfieldsToSearch,
} from "./filtersNoCudBillingRecordsList";
import { allowCondition } from "../../../../routes/allowedConditions";
import { EditModeButtonGroupContainer } from "../../../../components/common/editModeButtonGroup/EditModeButtonGroupContainer";

export const NoCudBillingRecordsList = (cudBillingRecordsListProps) => {
  const {
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
    totalMontoSesion,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    userProfessionalId,
    userProfile,
    records,
    setFilteredRecords,
    filteredNoCudBillingRecords,
  } = cudBillingRecordsListProps;

  let createRoute =
    "/billingRecords/noCudBillingRecords/createNoCudBillingRecord";
  let editRoute = "/billingRecords/noCudBillingRecords/edit";

  if (professionalId) {
    createRoute += `/professional/${professionalId}`;
    editRoute += `/professional/${professionalId}`;
  } else if (userProfessionalId && userProfile !== "admin") {
    //Si no se ingresa por el perfil del profesional y el usuario no es admin se utiliza el id del profesional del contexto
    createRoute += `/professional/${userProfessionalId}`;
    editRoute += `/professional/${userProfessionalId}`;
  }
  if (patientId) {
    createRoute += `/patient/${patientId}`;
    editRoute += `/patient/${patientId}`;
  }

  //Se deshabilita el boton de edicion si el paciente es CUD
  const disableEditionBarButton = !!(patientId && patient.cud);

  const generalBarContainerProps = {
    buttonText: "Factura No CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: `${createRoute}`,
    disableEditionBarButton: disableEditionBarButton,
    tooltipMessage: disableEditionBarButton
      ? "El paciente es CUD"
      : "Crear factura no CUD",
    FIELDS_TO_SEARCH: noCudBillingRecordsfieldsToSearch,
    FILTER_OPTIONS: cudBillingRecordsFilterOptions,
    setFilteredRecords,
    records,
  };

  const inLineStyle = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "right",
    alignItems: "center",
    gap: "8px",
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      headerAlign: "center",
      width: 65,
      pinned: true,
      align: "right",
      renderCell: (params) => {
        return (
          <Box sx={inLineStyle}>
            {params.row.id}
            <TrafficLightStatus status={params.row.estadopago} />
          </Box>
        );
      },
    },

    {
      field: "nombreyapellidoprofesional",
      headerName: "Profesional",
      headerAlign: "center",
      width: 150,
      align: "right",
    },
    {
      field: "especialidadprofesional",
      headerName: "Prestación",
      headerAlign: "center",
      width: 150,
      align: "right",
    },
    {
      field: "nombreyapellidopaciente",
      headerName: "Paciente",
      headerAlign: "center",
      width: 150,
      align: "right",
    },
    {
      field: "fechasesion",
      headerName: "Fecha Sesión",
      headerAlign: "center",
      width: 150,
      align: "right",
      renderCell: (params) => {
        if (params.value) {
          return dateFormat(params.value);
        } else {
          return "Sin fecha";
        }
      },
    },
    {
      field: "estadopago",
      headerName: "Estado Pago",
      headerAlign: "center",
      width: 150,
      align: "right",

      renderCell: (params) => {
        return (
          <Box sx={inLineStyle}>
            {params.row.estadopago}
            <TrafficLightStatus status={params.row.estadopago} />
          </Box>
        );
      },
    },
    {
      field: "fechadepago",
      headerName: "Fecha de Pago",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => dateFormat(params.value),
      align: "right",
    },
    {
      field: "mediopago",
      headerName: "Medio de Pago",
      headerAlign: "center",
      width: 150,
      align: "right",
    },
    {
      field: "montosesion",
      headerName: "Monto Sesión",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "retencion",
      headerName: "35% Retención",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              textAlign: "right",
              textDecoration: params.row.documentocomprobantepagoretencion
                ? "line-through"
                : "none",
            }}
          >
            {currencyFormat(params.value)}
          </Box>
        );
      },
    },
    {
      field: "montofinalprofesional",
      headerName: "Monto Final Profesional",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "documentofactura",
      headerName: "Factura Familiar",
      headerAlign: "center",
      width: 150,

      renderCell: (params) => getDocument(params.row.documentofactura),
    },
    {
      field: "documentocomprobantepagoretencion",
      headerName: "Documento Pago Retención",
      headerAlign: "center",
      width: 150,
      renderCell: (params) =>
        getDocument(params.row.documentocomprobantepagoretencion),
    },
    {
      field: "edicion",
      headerName: "",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
      cellClassName: "sticky-col-edicion",
      headerClassName: "sticky-col-edicion",

      renderCell: (params) => {
        const record = params.row;
        const editAllowed = allowCondition(
          userProfile,
          userProfessionalId,
          params.row.idprofesional
        );

        return (
          <EditModeButtonGroupContainer
            deleteFunction={() => handleDeleteNoCudBillingRecord(record.id)}
            editLink={`${editRoute}/${record.id}`}
            isAllowed={editAllowed}
          />
        );
      },
    },
  ];

  const rows = filteredNoCudBillingRecords.map((record) => ({
    id: record.id,
    nombreyapellidoprofesional: record.profesionales.nombreyapellidoprofesional,
    especialidadprofesional: record.profesionales.especialidadprofesional,
    nombreyapellidopaciente: record.pacientes.nombreyapellidopaciente,
    periodofacturado: record.periodofacturado,
    idprofesional: record.idprofesional,
    fechasesion: record.fechasesion,
    estadopago: record.estadopago,
    fechadepago: record.fechadepago,
    mediopago: record.mediopago,
    montosesion: record.montosesion,
    retencion: record.retencion,
    montofinalprofesional: record.montofinalprofesional,
    documentofactura: record.documentofactura,
    documentocomprobantepagoretencion: record.documentocomprobantepagoretencion,
  }));

  const localeText = {
    // Menú de columnas
    columnMenuSortAsc: "Ordenar ascendente",
    columnMenuSortDesc: "Ordenar descendente",
    columnMenuFilter: "Filtrar",
    columnMenuHideColumn: "Ocultar columna",
    columnMenuManageColumns: "Administrar columnas",

    // Toolbar
    toolbarColumns: "Columnas",
    toolbarColumnsLabel: "Seleccionar columnas",
    toolbarFilters: "Filtros",
    toolbarFiltersLabel: "Mostrar filtros",
    toolbarDensity: "Densidad",
    toolbarDensityLabel: "Densidad",
    toolbarDensityCompact: "Compacta",
    toolbarDensityStandard: "Estándar",
    toolbarDensityComfortable: "Cómoda",
    toolbarExport: "Exportar",
    toolbarExportLabel: "Exportar",
    toolbarExportCSV: "Descargar como CSV",
    toolbarExportPrint: "Imprimir",

    // Panel de filtros
    filterPanelAddFilter: "Agregar filtro",
    filterPanelDeleteIconLabel: "Eliminar",
    filterPanelLinkOperator: "Operador lógico",
    filterPanelOperators: "Operadores",
    filterPanelOperatorAnd: "Y",
    filterPanelOperatorOr: "O",
    filterPanelColumns: "Columnas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Valor del filtro",

    // Footer
    footerRowSelected: (count) =>
      count === 1 ? "1 fila seleccionada" : `${count} filas seleccionadas`,
    footerTotalRows: "Filas totales:",
    footerPaginationRowsPerPage: "Filas por página",

    // Sin datos
    noRowsLabel: "Sin filas",
    noResultsOverlayLabel: "No se encontraron resultados",

    //Pines
    pinToLeft: "Fijar a la izquierda",
    pinToRight: "Fijar a la derecha",
    unpin: "Desfijar",

    // Paginación
    footerRowsPerPage: "Filas por página:",
  };

  const filteredColumns = editMode
    ? columns
    : columns.filter((col) => col.field !== "edicion");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {`${filteredNoCudBillingRecords.length} registros obtenidos`}
      </Box>

      <Box className="billingRecordsListContainer">
        <Box sx={{ maxWidth: "98.5vw" }}>
          <Paper sx={{ width: "100%", height: 390 }}>
            <DataGridPro
              localeText={localeText}
              rows={rows}
              columns={filteredColumns}
              pageSizeOptions={[5, 10, 15]}
              paginationModel={paginationModel}
              onPaginationModelChange={(newModel) =>
                setPaginationModel(newModel)
              }
              pagination
              initialState={{
                pinnedColumns: { left: ["id"], right: ["edicion"] },
              }}
              components={{
                Pagination: GridPagination,
              }}
              componentsProps={{
                pagination: {
                  labelRowsPerPage: "Filas por página",
                },
              }}
              slotProps={{
                pagination: {
                  labelRowsPerPage: "Filas por página",
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Box className="billingRecordsListFooter">
        <Box>
          <strong>Total Monto Sesión:</strong>{" "}
          {currencyFormat(totalMontoSesion)}
        </Box>
        <Box>
          <strong>Total Retención:</strong> {currencyFormat(totalRetencion)}
        </Box>
        <Box>
          <strong>Total Profesional:</strong> {currencyFormat(totalProfesional)}
        </Box>
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "90%",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      >
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
