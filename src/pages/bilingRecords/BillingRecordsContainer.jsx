import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../../services/api/patients";
import { getProfessional } from "../../services/api/professionals";
import {
  deleteNoCudBillingRecord,
  getNoCudBillingRecords,
  getNoCudBillingRecordsByPatient,
  getNoCudBillingRecordsByProfessional,
  getNoCudBillingRecordsByProfessionalAndByPatient,
} from "../../services/api/noCudBillingRecords";
import { LoadingContainer } from "../loading/LoadingContainer";
import { CudBillingRecordsListContainer } from "./cudBillingRecords/cudBillingRecordsList/CudBillingRecordsListContainer";
import {
  deleteCudBillingRecord,
  getCudBillingRecords,
  getCudBillingRecordsByPatient,
  getCudBillingRecordsByProfessional,
  getCudBillingRecordsByProfessionalAndByPatient,
} from "../../services/api/cudBillingRecords";
import { BillingRecords } from "./BillingRecords";
import { NoCudBillingRecordsListContainer } from "./noCudBillingRecords/noCudBillingRecordsList/NoCudBillingRecordsListContainer";
import { getPaymentRequests } from "../../services/api/paymentRequest";

export const BillingRecordsContainer = () => {
  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  const [cudBillingRecords, setCudBillingRecords] = useState([]);
  const [filteredCudBillingRecords, setFilteredCudBillingRecords] = useState(
    []
  );
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [noCudBillingRecords, setNoCudBillingRecords] = useState([]);
  const [filteredNoCudBillingRecords, setFilteredNoCudBillingRecords] =
    useState([]);
  const [professional, setProfessional] = useState({});
  const [patient, setPatient] = useState({});

  const [updateList, setUpdateList] = useState(false);

  const { patientId = null, professionalId = null } = useParams();

  const handleDeleteCudBillingRecord = async (cudBillingRecordId) => {
    const deleteResponse = await deleteCudBillingRecord(
      cudBillingRecordId,
      setUpdateList
    );
    console.log(deleteResponse);
  };

  const handleDeleteNoCudBillingRecord = async (noCudBillingRecordId) => {
    const deleteResponse = await deleteNoCudBillingRecord(
      noCudBillingRecordId,
      setUpdateList
    );
    console.log(deleteResponse);
  };

  useEffect(() => {
    let cudBillingRecordAction;
    let noCudBillingRecordAction;

    setIsLoading(true);

    if (patientId && professionalId) {
      cudBillingRecordAction = getCudBillingRecordsByProfessionalAndByPatient(
        professionalId,
        patientId
      );
      noCudBillingRecordAction =
        getNoCudBillingRecordsByProfessionalAndByPatient(
          professionalId,
          patientId
        );
    } else if (patientId) {
      cudBillingRecordAction = getCudBillingRecordsByPatient(patientId);
      noCudBillingRecordAction = getNoCudBillingRecordsByPatient(patientId);
    } else if (professionalId) {
      cudBillingRecordAction =
        getCudBillingRecordsByProfessional(professionalId);
      noCudBillingRecordAction =
        getNoCudBillingRecordsByProfessional(professionalId);
    } else {
      cudBillingRecordAction = getCudBillingRecords();
      noCudBillingRecordAction = getNoCudBillingRecords();
    }

    Promise.all([
      cudBillingRecordAction,
      noCudBillingRecordAction,
      patientId ? getPatient(patientId) : Promise.resolve({ data: [null] }),
      professionalId
        ? getProfessional(professionalId)
        : Promise.resolve({ data: [null] }),
      getPaymentRequests(),
    ])
      .then(
        ([
          cudBillingResponse,
          noCudBillingResponse,
          patientResponse,
          professionalResponse,
          paymentRequestsResponse,
        ]) => {
          const cudBillingResponseData = cudBillingResponse.data;
          const noCudBillingResponseData = noCudBillingResponse.data;
          const patientResponseData = patientResponse.data[0];
          const professionalResponseData = professionalResponse.data[0];
          const paymentRequestsResponseData = paymentRequestsResponse.data;

          setCudBillingRecords(cudBillingResponseData);
          setFilteredCudBillingRecords(cudBillingResponseData);
          setNoCudBillingRecords(noCudBillingResponseData);
          setFilteredNoCudBillingRecords(noCudBillingResponseData);
          setPatient(patientResponseData);
          setProfessional(professionalResponseData);
          setPaymentRequests(paymentRequestsResponseData);
        }
      )
      .catch((error) => {
        console.error("Error al obtener registros:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateList, patientId, professionalId]);

  if (isLoading) return <LoadingContainer />;

  //Define los campos a buscar por el filtro de cudBillingRecords
  const cudBillingRecordsfieldsToSearch = [
    (r) => r.profesionales?.nombreyapellidoprofesional,
    (r) => r.pacientes?.nombreyapellidopaciente,
    (r) => r.pacientes?.obrasocialpaciente,
    (r) => r.prestacion,
    (r) => r.nrofactura,
    (r) => r.estadofacturacion,
  ];

  //Define los campos a buscar por el filtro de noCudBillingRecords
  const noCudBillingRecordsfieldsToSearch = [
    (r) => r.profesionales?.nombreyapellidoprofesional,
    (r) => r.pacientes?.nombreyapellidopaciente,
    (r) => r.prestacion,
    (r) => r.estadopago,
    (r) => r.mediopago,
  ];

  const cudBillingRecordsListContainerProps = {
    patientId,
    professionalId,
    cudBillingRecords: filteredCudBillingRecords,
    handleDeleteCudBillingRecord,
    patient,
    professional,
    paymentRequests,
    cudBillingRecordsfieldsToSearch,
    setFilteredCudBillingRecords,
    records: cudBillingRecords,
  };

  const noCudBillingRecordsListContainerProps = {
    patientId,
    professionalId,
    noCudBillingRecords: filteredNoCudBillingRecords,
    handleDeleteNoCudBillingRecord,
    patient,
    professional,
    noCudBillingRecordsfieldsToSearch,
    setFilteredNoCudBillingRecords,
    records: noCudBillingRecords,
  };

  //Lista de pestañas para el tab
  const tabs = [
    {
      label: "Cud",
      content: (
        <CudBillingRecordsListContainer
          {...cudBillingRecordsListContainerProps}
        />
      ),
    },
    {
      label: "No Cud",
      content: (
        <NoCudBillingRecordsListContainer
          {...noCudBillingRecordsListContainerProps}
        />
      ),
    },
  ];

  const billingRecordsProps = {
    patientId,
    professionalId,
    professional,
    patient,
    tabs,
  };

  return <BillingRecords {...billingRecordsProps} />;
};
