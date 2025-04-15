export const professionalInitialState = {
  nombreyapellidoprofesional: "",
  especialidadprofesional: "",
  matriculaprofesional: "",
  cuitprofesional: "",
  dniprofesional: "",
  direccionprofesional: "",
  ciudadprofesional: "",
  telefonoprofesional: "",
  emailprofesional: "",
  fechavencimientornpprofesional: "",
  activo: true,

  //documentos
  documentoconstanciamatriculaprofesional: "",
  documentocertificadornpprofesional: "",
  documentotitulofrenteprofesional: "",
  documentotitulodorsoprofesional: "",
  documentocvprofesional: "",
  documentoconstanciaafipprofesional: "",
  documentoconstanciacbuprofesional: "",
  documentodnifrenteprofesional: "",
  documentodnidorsoprofesional: "",
  documentoseguroprofesional: "",
  documentofirmaprofesional: "",
  documentoselloprofesional: "",
  documentoselloyfirmaprofesional: "",
  documentoingresosbrutosprofesional: "",
  fechaultimaactualizacion: null,
};

export const patientInitialState = {
  nombreyapellidopaciente: "",
  obrasocialpaciente: "",
  telefonoobrasocial: "",
  email1obrasocial: "",
  email2obrasocial: "",
  email3obrasocial: "",
  nombreyapellidoreferenteobrasocial: "",
  nroafiliadopaciente: "",
  dnipaciente: "",
  fechanacimientopaciente: "",
  diagnosticoprevio: "",
  direccionpaciente: "",
  ciudadpaciente: "",
  nombreyapellidoresponsable: "",
  telefonoresponsable: "",
  escuela: "",
  direccionescuela: "",
  telefonoescuela: "",
  aniogradosala: "",
  nombreyapellidodocentereferenteescuela: "",
  nombreyapellidodirectivoescuela: "",
  escuelaespecial: "",
  nombreyapellidodocentereferenteescuelaespecial: "",
  telefonodocentereferenteescuelaespecial: "",
  cud: false,
  fechavencimientocud: "",
  fechainiciotto: "",
  fechaultimaactualizacion: null,
  activo: true,

  //Documentos
  imgdnifrentepaciente: "",
  imgdnidorsopaciente: "",
  imgdnifrentetitularos: "",
  imgdnidorsotitularos: "",
  imgcarnetospaciente: "",
  imgcarnetostitular: "",
  imgconstanciaalumnoregular: "",
  imglibretasanitaria: "",
  imgcud: "",
  imgcertificadoeventual: "",
  imgactaacuerdo: "",
  imgseguroescuelaat: "",
};

export const medicalRecordInitialState = {
  idpaciente: "",
  idprofesional: "",
  fechaconsulta: null,
  tipoconsulta: "",
  descripcion: "",
};

export const cudBillingRecordInitialState = {
  idprofesional: "",
  prestacion: "",
  idpaciente: "",
  obrasocialpaciente: "",
  imgasistenciamensual: "",
  documentofacturamensual: "",
  periodofacturado: null,
  nrofactura: "",
  montofacturado: 0,
  fechapresentacionos: null,
  fecharecepcionos: null,
  fechacobro: null,
  estadofacturacion: "pendiente",
  montopercibido: 0,
  retencion: 0,
  montofinalprofesional: 0,
};
