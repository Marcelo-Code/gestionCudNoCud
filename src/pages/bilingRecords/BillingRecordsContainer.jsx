import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../../services/api/patients";
import { getProfessional } from "../../services/api/professionals";
import {
  deleteNoCudBillingRecord,
  getNoCudBillingRecords,
  getNoCudBillingRecordsByPatient,
  getNoCudBillingRecordsByProfessional,
} from "../../services/api/noCudBillingRecords";
import { LoadingContainer } from "../loading/LoadingContainer";
import { CudBillingRecordsListContainer } from "./cudBillingRecords/cudBillingRecordsList/CudBillingRecordsListContainer";
import {
  deleteCudBillingRecord,
  getCudBillingRecords,
  getCudBillingRecordsByPatient,
  getCudBillingRecordsByProfessional,
} from "../../services/api/cudBillingRecords";
import { BillingRecords } from "./BillingRecords";
import { NoCudBillingRecordsListContainer } from "./noCudBillingRecords/noCudBillingRecordsList/NoCudBillingRecordsListContainer";

export const BillingRecordsContainer = () => {
  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  const [cudBillingRecords, setCudBillingRecords] = useState([]);
  const [noCudBillingRecords, setNoCudBillingRecords] = useState([]);
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let cudBillingResponse;
        let noCudBillingResponse;

        if (patientId) {
          const patientResponse = await getPatient(patientId);
          setPatient(patientResponse.data[0]);

          [cudBillingResponse, noCudBillingResponse] = await Promise.all([
            getCudBillingRecordsByPatient(patientId),
            getNoCudBillingRecordsByPatient(patientId),
          ]);
        } else if (professionalId) {
          const professionalResponse = await getProfessional(professionalId);
          setProfessional(professionalResponse.data[0]);

          [cudBillingResponse, noCudBillingResponse] = await Promise.all([
            getCudBillingRecordsByProfessional(professionalId),
            getNoCudBillingRecordsByProfessional(professionalId),
          ]);
        } else {
          [cudBillingResponse, noCudBillingResponse] = await Promise.all([
            getCudBillingRecords(),
            getNoCudBillingRecords(),
          ]);
        }

        setCudBillingRecords(cudBillingResponse.data);
        setNoCudBillingRecords(noCudBillingResponse.data);

        console.log(cudBillingResponse);
        console.log(noCudBillingResponse);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [updateList, patientId, professionalId]);

  if (isLoading) return <LoadingContainer />;

  console.log(noCudBillingRecords);

  const cudBillingRecordsListContainerProps = {
    cudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteCudBillingRecord,
  };

  const noCudBillingRecordsListContainerProps = {
    noCudBillingRecords,
    editMode,
    setEditMode,
    handleDeleteNoCudBillingRecord,
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
    noCudBillingRecords,
    professional,
    patient,
    tabs,
  };

  return <BillingRecords {...billingRecordsProps} />;
};
