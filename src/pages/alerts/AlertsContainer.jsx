import { useContext, useEffect, useState } from "react";
import { Alerts } from "./Alerts";
import { getPatients } from "../../services/api/patients";
import { getProfessionals } from "../../services/api/professionals";
import { LoadingContainer } from "../loading/LoadingContainer";
import dayjs from "dayjs";
import { GeneralContext } from "../../context/GeneralContext";

export function AlertsContainer() {
  //hook para los pacientes
  const [patients, setPatients] = useState([]);

  //hook para los profesionales
  const [professionals, setProfessionals] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el drawer
  const [open, setOpen] = useState(false);

  const { updateList } = useContext(GeneralContext);

  //Función para abrir y cerrar el drawer
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getPatients(), getProfessionals()])
      .then(([patientsResponse, professionalsResponse]) => {
        const patients = patientsResponse.data;
        const professionals = professionalsResponse.data;
        setPatients(patients);
        setProfessionals(professionals);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList]);

  if (isLoading) return <LoadingContainer />;

  const professionalsExpirationRnpRecords = professionals
    .map((record) => {
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientornpprofesional);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidoprofesional: record.nombreyapellidoprofesional,
        diasexpiracionrnp: daysOfDifference,
      };
    })
    .filter((record) => record !== null) // Filtra los nulls
    .filter((record) => record.diasexpiracionrnp < 30);

  const filteredPatientsRecords = patients.filter((record) => record.cud);

  const patientsExpirationCudRecords = filteredPatientsRecords
    .map((record) => {
      const currentDate = dayjs();
      const expirationDate = dayjs(record.fechavencimientocud);
      const daysOfDifference = expirationDate.diff(currentDate, "day");
      return {
        nombreyapellidopaciente: record.nombreyapellidopaciente,
        diasexpiracioncud: daysOfDifference,
      };
    })
    .filter((record) => record.diasexpiracioncud < 30);

  const totalRecordsQuantity =
    patientsExpirationCudRecords.length +
    professionalsExpirationRnpRecords.length;

  const alertsProps = {
    professionalsExpirationRnpRecords,
    patientsExpirationCudRecords,
    totalRecordsQuantity,
    toggleDrawer,
    open,
  };

  return <Alerts {...alertsProps} />;
}
