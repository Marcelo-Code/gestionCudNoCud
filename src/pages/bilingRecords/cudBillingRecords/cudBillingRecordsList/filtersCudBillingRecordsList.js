//Campos a filtrar
const STATUS_OPTIONS_1 = [
  { value: "pagado", label: "Factura pagada" },
  { value: "recibido", label: "Factura recibida por O.S." },
  { value: "pendiente", label: "Factura pendiente aviso recepción" },
  { value: null, label: "Factura sin estado" },
];

//Define los campos a buscar por el filtro de cudBillingRecords
export const cudBillingRecordsfieldsToSearch = [
  (r) => r.profesionales.nombreyapellidoprofesional,
  (r) => r.pacientes.nombreyapellidopaciente,
  (r) => r.pacientes.obrasocialpaciente,
  (r) => r.prestacion,
  (r) => r.nrofactura,
  (r) => r.estadofacturacion,
];

//Parámetros de filtrado
export const cudBillingRecordsFilterOptions = [
  {
    name: "estadofacturacion",
    label: "Estado de factura",
    options: STATUS_OPTIONS_1,
    placeholder: "Seleccioná un estado",
  },
];
