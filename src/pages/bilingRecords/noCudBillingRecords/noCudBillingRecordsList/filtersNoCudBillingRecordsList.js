//Campos a filtrar
const STATUS_OPTIONS_1 = [
  { value: "pagado", label: "Pagado" },
  { value: "pendiente", label: "Pendiente" },
  { value: null, label: "Sin estado" },
];

export const noCudBillingRecordsfieldsToSearch = [
  (r) => r.profesionales?.nombreyapellidoprofesional,
  (r) => r.pacientes?.nombreyapellidopaciente,
  (r) => r.prestacion,
  (r) => r.estadopago,
  (r) => r.mediopago,
];

//Parámetros de filtrado
export const cudBillingRecordsFilterOptions = [
  {
    name: "estadopago",
    label: "Estado de pago",
    options: STATUS_OPTIONS_1,
    placeholder: "Seleccioná un estado",
  },
];
