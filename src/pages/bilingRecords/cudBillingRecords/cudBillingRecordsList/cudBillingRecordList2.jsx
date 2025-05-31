import { Box, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import "../../../../assets/css/globalFormat.css";
import "./cudBillingRecordsList.css";
import { GeneralBarContainer } from "../../../../components/layouts/generalBar/GeneralBarContainer";
import { Icons } from "../../../../assets/Icons";
import {
  dateFormat,
  getExtension,
  monthFormat,
} from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { errorAlert } from "../../../../components/common/alerts/alerts";

import Paper from "@mui/material/Paper";
import { currencyFormat } from "../../../../components/common/currencyFormat/CurrencyFormatContainer";
import { GridPagination, DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";

export const CudBillingRecordsList2 = (cudBillingRecordsListProps) => {
  const {
    cudBillingRecords,
    setEditMode,
    editMode,
    handleDeleteCudBillingRecord,
    totalMontoFacturado,
    totalMontoPercibido,
    totalProfesional,
    totalRetencion,
    patientId,
    professionalId,
    patient,
    paymentRequests,
    userProfessionalId,
    userProfile,
    cudBillingRecordsfieldsToSearch,
    setFilteredCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
    sortedRecords,
  } = cudBillingRecordsListProps;

  let createRoute = "/billingRecords/createCudBillingRecord";
  let editRoute = "/billingRecords/cudBillingRecords/edit";

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

  //Se deshabilita la barra de edición si el paciente no es CUD
  const disableEditionBarButton = !!(patientId && !patient.cud);

  const navigate = useNavigate();

  const generalBarContainerProps = {
    buttonText: "Factura CUD",
    buttonIcon: <Icons.AddIcon />,
    enableReportBar: false,
    setEditMode,
    to: `${createRoute}`,
    disableEditionBarButton: disableEditionBarButton,
    tooltipMessage: disableEditionBarButton
      ? "El paciente no es CUD"
      : "Crear factura CUD",
    fieldsToSearch: cudBillingRecordsfieldsToSearch,
    setFilteredRecords: setFilteredCudBillingRecords,
    records,
    DEFAULT_SORT_OPTIONS,
  };

  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "5px" };
  const inLineStyle = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "left",
    alignItems: "center",
    gap: "8px",
    verticalAlign: "middle",
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      pinned: true,
    },

    {
      field: "nombreyapellidoprofesional",
      headerName: "Profesional",
      width: 150,
    },
    {
      field: "nombreyapellidopaciente",
      headerName: "Paciente",
      width: 150,
    },
    {
      field: "especialidadprofesional",
      headerName: "Prestación",
      width: 150,
    },
    {
      field: "periodofacturado",
      headerName: "Período Facturado",
      width: 150,
      renderCell: (params) => monthFormat(params.value),
    },
    {
      field: "fechapresentacionos",
      headerName: "Fecha Presentación O.S.",
      width: 150,
      renderCell: (params) => dateFormat(params.value),
    },
    {
      field: "estadofacturacion",
      headerName: "Estado Facturación",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={inLineStyle}>
            <TrafficLightStatus status={params.row.estadofacturacion} />
            {params.row.estadofacturacion}
          </Box>
        );
      },
    },
    {
      field: "documentofacturamensual",
      headerName: "Factura Mensual",
      width: 150,
      ...getDocument(),
    },
    {
      field: "imgasistenciamensual",
      headerName: "Asistencia Mensual",
      width: 150,
      ...getDocument(),
    },
    {
      field: "montofacturado",
      headerName: "Monto Facturado",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
    },
    { field: "nrofactura", headerName: "Nro. Factura", width: 130 },
    { field: "obrasocialpaciente", headerName: "Obra Social", width: 130 },
    {
      field: "fecharecepcionos",
      headerName: "Fecha Aviso Recepción O.S.",
      width: 130,
      renderCell: (params) => dateFormat(params.value),
    },
    {
      field: "reclamos",
      headerName: "Reclamos",
      width: 100,
      renderCell: (params) => {
        const paymentRequestsCount = paymentRequests.filter(
          (request) => request.idfacturacioncud === parseInt(params.row.id)
        ).length;

        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "5px",
            }}
          >
            <Tooltip
              title={`${paymentRequestsCount} reclamos`}
              placement="top-end"
              arrow
            >
              <Link
                to={`/paymentRequests/list/cudBillingRecords/${params.row.id}`}
              >
                <Icons.ErrorIcon />
              </Link>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "fechacobro",
      headerName: "Fecha de Cobro",
      width: 130,
      renderCell: (params) => {
        if (params.row.fechacobro) {
          return dateFormat(params.row.fechacobro);
        } else {
          return "Sin fecha";
        }
      },
    },
    {
      field: "montopercibido",
      headerName: "Monto Percibido",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
    },
    {
      field: "retencion",
      headerName: "35% Retención",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
    },
    {
      field: "montofinalprofesional",
      headerName: "Monto Final Profesional",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
    },
    {
      field: "documentocomprobrantepagoretencion",
      headerName: "Pago Retención",
      width: 130,
      ...getDocument(),
    },
    {
      field: "edicion",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
      cellClassName: "sticky-col-edicion",
      headerClassName: "sticky-col-edicion",

      renderCell: (params) => {
        const record = params.row;
        const editAllowed =
          userProfile === "admin" ||
          userProfessionalId === params.row.idprofesional;
        return (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1px" }}>
            <Tooltip title="Editar" placement="top-end" arrow>
              <IconButton
                onClick={(e) => {
                  if (editAllowed) {
                    navigate(`${editRoute}/${record.id}`);
                  } else {
                    e.preventDefault();
                    errorAlert("Usuario no autorizado, solamente lectura");
                  }
                }}
              >
                <Icons.EditIcon sx={iconStyle} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar" placement="top-end" arrow>
              <IconButton
                onClick={() => {
                  editAllowed
                    ? handleDeleteCudBillingRecord(record.id)
                    : errorAlert("Usuario no autorizado, solo lectura");
                }}
              >
                <Icons.DeleteIcon sx={{ ...iconStyle, color: "red" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const filteredColumns = editMode
    ? columns
    : columns.filter((col) => col.field !== "edicion");

  const rows = sortedRecords.map((record) => ({
    id: record.id,
    nombreyapellidoprofesional: record.profesionales.nombreyapellidoprofesional,
    nombreyapellidopaciente: record.pacientes.nombreyapellidopaciente,
    especialidadprofesional: record.profesionales.especialidadprofesional,
    periodofacturado: record.periodofacturado,
    fechapresentacionos: record.fechapresentacionos,
    estadofacturacion: record.estadofacturacion,
    documentofacturamensual: record.documentofacturamensual,
    imgasistenciamensual: record.imgasistenciamensual,
    montofacturado: record.montofacturado,
    nrofactura: record.nrofactura,
    obrasocialpaciente: record.obrasocialpaciente,
    fecharecepcionos: record.fecharecepcionos,
    reclamos: record.Reclamos,
    fechacobro: record.fechacobro,
    montopercibido: record.montopercibido,
    retencion: record.retencion,
    montofinalprofesional: record.montofinalprofesional,
    documentocomprobrantepagoretencion:
      record.documentocomprobrantepagoretencion,
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

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {`${cudBillingRecords.length} registros obtenidos`}
      </Box>

      <Box className="billingRecordsListContainer">
        <Card sx={{ maxWidth: "98.5vw" }}>
          <CardContent>
            <Paper sx={{ height: 400, width: "100%" }}>
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

            {/* Fila de totales */}

            <Box
              sx={{
                display: "flex",
                p: 2,
                backgroundColor: "#f9f9f9",
                borderTop: "1px solid #ccc",
                borderRadius: "0 0 4px 4px",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <strong>Total Facturado:</strong>{" "}
                {currencyFormat(totalMontoFacturado)}
              </Box>
              <Box>
                <strong>Total Percibido:</strong>{" "}
                {currencyFormat(totalMontoPercibido)}
              </Box>
              <Box>
                <strong>Total Retención:</strong>{" "}
                {currencyFormat(totalRetencion)}
              </Box>
              <Box>
                <strong>Total Profesional:</strong>{" "}
                {currencyFormat(totalProfesional)}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <BackButtonContainer />
    </Box>
  );
};

const getDocument = () => ({
  renderCell: (params) => {
    const url = params.value;
    if (!url) return "Sin Documento";

    const extension = getExtension(url).toLowerCase();

    const iconDocumentStyle = {
      margin: "10px",
      fontSize: "2em",
      verticalAlign: "middle",
    };

    return (
      <Link
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        {["jpg", "png", "jpeg"].includes(extension) && (
          <Icons.ImageIcon sx={iconDocumentStyle} />
        )}
        {["doc", "docx"].includes(extension) && (
          <Icons.ArticleIcon sx={iconDocumentStyle} />
        )}
        {["pdf"].includes(extension) && (
          <Icons.PictureAsPdfIcon sx={iconDocumentStyle} />
        )}
        {extension.toUpperCase()}
      </Link>
    );
  },
});
