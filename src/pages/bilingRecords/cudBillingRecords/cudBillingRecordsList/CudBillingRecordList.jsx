import { Box, IconButton, Tooltip } from "@mui/material";
import "../../../../assets/css/globalFormat.css";
import "./cudBillingRecordsList.css";
import { Icons } from "../../../../assets/Icons";
import { dateFormat, monthFormat } from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { TrafficLightStatus } from "../../../../components/common/trafficLightStatus/TrafficLight";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { errorAlert } from "../../../../components/common/alerts/alerts";

import Paper from "@mui/material/Paper";
import { currencyFormat } from "../../../../components/common/currencyFormat/CurrencyFormatContainer";
import { GridPagination, DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { getDocument } from "../../../../components/common/getDocument/GetDocument";
import { GeneralBarContainer } from "../../../../components/layouts/generalToolsBar/GeneralBarContainer";
import {
  cudBillingRecordsfieldsToSearch,
  cudBillingRecordsFilterOptions,
} from "./filtersCudBillingRecordsList";

export const CudBillingRecordsList = (cudBillingRecordsListProps) => {
  const {
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
    setFilteredRecords,
    records,
    filteredCudBillingRecords,
  } = cudBillingRecordsListProps;

  console.log(userProfessionalId);

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
    FIELDS_TO_SEARCH: cudBillingRecordsfieldsToSearch,
    FILTER_OPTIONS: cudBillingRecordsFilterOptions,
    setFilteredRecords,
    records,
    filteredCudBillingRecords,
  };

  const iconStyle = { color: "blue", fontSize: "1.2em", margin: "5px" };
  const inLineStyle = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "right",
    alignItems: "center",
    gap: "8px",
    verticalAlign: "middle",
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
            <TrafficLightStatus status={params.row.estadofacturacion} />
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
      field: "nombreyapellidopaciente",
      headerName: "Paciente",
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
      field: "periodofacturado",
      headerName: "Período Facturado",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => monthFormat(params.value),
      align: "right",
    },
    {
      field: "fechapresentacionos",
      headerName: "Fecha Presentación O.S.",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => dateFormat(params.value),
      align: "right",
    },
    {
      field: "estadofacturacion",
      headerName: "Estado Facturación",
      headerAlign: "center",
      width: 150,
      align: "right",

      renderCell: (params) => {
        return (
          <Box sx={inLineStyle}>
            {params.row.estadofacturacion}
            <TrafficLightStatus status={params.row.estadofacturacion} />
          </Box>
        );
      },
    },
    {
      field: "documentofacturamensual",
      headerName: "Factura Mensual",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => getDocument(params.row.documentofacturamensual),
    },
    {
      field: "imgasistenciamensual",
      headerName: "Asistencia Mensual",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => getDocument(params.row.imgasistenciamensual),
    },
    {
      field: "montofacturado",
      headerName: "Monto Facturado",
      headerAlign: "center",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "nrofactura",
      headerName: "Nro. Factura",
      headerAlign: "center",
      width: 130,
      align: "right",
    },
    {
      field: "obrasocialpaciente",
      headerName: "Obra Social",
      headerAlign: "center",
      width: 130,
      align: "right",
    },
    {
      field: "fecharecepcionos",
      headerName: "Fecha Aviso Recepción O.S.",
      headerAlign: "center",
      width: 130,
      renderCell: (params) => dateFormat(params.value),
    },
    {
      field: "reclamos",
      headerName: "Reclamos",
      headerAlign: "center",
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
      headerAlign: "center",
      width: 130,
      align: "right",

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
      headerAlign: "center",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "retencion",
      headerName: "35% Retención",
      headerAlign: "center",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "montofinalprofesional",
      headerName: "Monto Final Profesional",
      headerAlign: "center",
      width: 130,
      renderCell: (params) => currencyFormat(params.value),
      align: "right",
    },
    {
      field: "documentocomprobrantepagoretencion",
      headerName: "Pago Retención",
      headerAlign: "center",
      width: 130,
      renderCell: (params) =>
        getDocument(params.row.documentocomprobrantepagoretencion),
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

  const rows = filteredCudBillingRecords.map((record) => ({
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
        {`${filteredCudBillingRecords.length} registros obtenidos`}
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
          <strong>Total Facturado:</strong>{" "}
          {currencyFormat(totalMontoFacturado)}
        </Box>
        <Box>
          <strong>Total Percibido:</strong>{" "}
          {currencyFormat(totalMontoPercibido)}
        </Box>
        <Box>
          <strong>Total Retención:</strong> {currencyFormat(totalRetencion)}
        </Box>
        <Box>
          <strong>Total Profesional:</strong> {currencyFormat(totalProfesional)}
        </Box>
      </Box>
      <BackButtonContainer />
    </Box>
  );
};
