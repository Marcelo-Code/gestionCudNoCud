import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PatientsListContainer } from "./pages/patiens/patientsList/PatientsListContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { PatientDetailContainer } from "./pages/patiens/patientDetail/PatientDetailContainer";
import { CreateEditPatientContainer } from "./pages/patiens/createEditPatient/CreateEditPatientContainer";
import { ScrollToTop } from "./components/common/scrollToTop/ScrollToTop";
import { DocumentationContainer } from "./pages/documentation/DocumentationContainer";
import { GeneralContextProvider } from "./context/GeneralContext";
import { ProfessionalsListContainer } from "./pages/professionals/professionalsList/ProfessionalsListContainer";
import { CreateEditProfessionalContainer } from "./pages/professionals/createEditProfessional/CreateEditProfessionalContainer";
import { ProfessionalDetailContainer } from "./pages/professionals/professionalDetail/ProfessionalDetailContainer";
import { HomeContainer } from "./pages/home/HomeContainer";
import { CreateEditMedicalRecordContainer } from "./pages/medicalRecords/createEditMedicalRecord/CreateEditMedicalRecordContainer";
import { MedicalRecordsListContainer } from "./pages/medicalRecords/medicalRecordsList/MedicalRecordsListContainer";
import { MedicalRecordDetailContainer } from "./pages/medicalRecords/medicalRecordDetail/MedicalRecordDetailContainer";
import { BillingRecordsContainer } from "./pages/bilingRecords/BillingRecordsContainer";
import { CreateEditCudBillingRecordContainer } from "./pages/bilingRecords/cudBillingRecords/createEditCudBillingRecord/CreateEditCudBillingRecordContainer";
import { CreateEditNoCudBillingRecordContainer } from "./pages/bilingRecords/noCudBillingRecords/createEditNoCudBillingRecord/CreateEditNoCudBillingRecordContainer";
function App() {
  return (
    <>
      <BrowserRouter>
        <GeneralContextProvider>
          <NavBarContainer />
          {/* Scrollea al inicio de la pantalla cuando se navega */}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            {/* ---------- Pacientes ----------*/}
            <Route
              path="/patients/createPatient"
              element={<CreateEditPatientContainer />}
            />
            <Route
              path="/patients/list/:active"
              element={<PatientsListContainer />}
            />
            <Route
              path="/patients/detail/:patientId"
              element={<PatientDetailContainer />}
            />
            <Route
              path="/patients/documentation/:patientId"
              element={<DocumentationContainer />}
            />
            <Route
              path="/patients/edit/:patientId"
              element={<CreateEditPatientContainer />}
            />
            {/* ---------- Profesionales ----------*/}
            <Route
              path="/professionals/createProfessional"
              element={<CreateEditProfessionalContainer />}
            />
            <Route
              path="/professionals/list/:active"
              element={<ProfessionalsListContainer />}
            />
            <Route
              path="/professionals/detail/:professionalId"
              element={<ProfessionalDetailContainer />}
            />
            <Route
              path="/professionals/documentation/:professionalId"
              element={<DocumentationContainer />}
            />
            <Route
              path="/professionals/edit/:professionalId"
              element={<CreateEditProfessionalContainer />}
            />
            {/* ---------- Consultas Médicas ----------*/}

            {/* Crear consulta */}
            <Route
              path="/medicalRecords/createMedicalRecord"
              element={<CreateEditMedicalRecordContainer />}
            />

            {/* Crear consulta con profesional */}
            <Route
              path="/medicalRecords/createMedicalRecord/professional/:professionalId"
              element={<CreateEditMedicalRecordContainer />}
            />

            {/* Crear consulta con paciente */}
            <Route
              path="/medicalRecords/createMedicalRecord/patient/:patientId"
              element={<CreateEditMedicalRecordContainer />}
            />

            {/* Lista de consultas */}
            <Route
              path="/medicalRecords/list"
              element={<MedicalRecordsListContainer />}
            />

            {/* Lista de consultas por profesional */}
            <Route
              path="/medicalRecords/list/professional/:professionalId"
              element={<MedicalRecordsListContainer />}
            />

            {/* Lista de consultas por paciente */}
            <Route
              path="/medicalRecords/list/patient/:patientId"
              element={<MedicalRecordsListContainer />}
            />

            {/* Detalle consulta */}
            <Route
              path="/medicalRecords/detail/:medicalRecordId"
              element={<MedicalRecordDetailContainer />}
            />

            {/* Editar consulta */}
            <Route
              path="/medicalRecords/edit/:medicalRecordId"
              element={<CreateEditMedicalRecordContainer />}
            />

            {/* Editar consulta con paciente*/}
            <Route
              path="/medicalRecords/edit/patient/:patientId/:medicalRecordId"
              element={<CreateEditMedicalRecordContainer />}
            />
            {/* Editar consulta con profesional */}
            <Route
              path="/medicalRecords/edit/professional/:professionalId/:medicalRecordId"
              element={<CreateEditMedicalRecordContainer />}
            />

            {/* ---------- Facturación  ----------*/}
            <Route
              path="/billingRecords/list"
              element={<BillingRecordsContainer />}
            />
            <Route
              path="/billingRecords/list/patient/:patientId"
              element={<BillingRecordsContainer />}
            />
            <Route
              path="/billingRecords/list/professional/:professionalId"
              element={<BillingRecordsContainer />}
            />
            {/* ---------- Facturación CUD  ----------*/}
            {/* Crear facturación CUD */}
            <Route
              path="/billingRecords/createCudBillingRecord"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* Crear facturación CUD con profesional */}
            <Route
              path="/billingRecords/createCudBillingRecord/professional/:professionalId"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* Crear facturación CUD con paciente */}
            <Route
              path="/billingRecords/createCudBillingRecord/patient/:patientId"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* Editar facturación CUD */}
            <Route
              path="/billingRecords/cudBillingRecords/edit/:cudBillingRecordId"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* Editar facturación CUD con paciente*/}
            <Route
              path="/billingRecords/cudBillingRecords/edit/patient/:patientId/:cudBillingRecordId"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* Editar facturación CUD con profesional */}
            <Route
              path="/billingRecords/cudBillingRecords/edit/professional/:professionalId/:cudBillingRecordId"
              element={<CreateEditCudBillingRecordContainer />}
            />
            {/* ---------- Facturación NO CUD ----------*/}

            {/* Crear factura no CUD */}
            <Route
              path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord"
              element={<CreateEditNoCudBillingRecordContainer />}
            />

            {/* Crear factura no CUD con paciente */}
            <Route
              path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord/patient/:patientId"
              element={<CreateEditNoCudBillingRecordContainer />}
            />

            {/* Crear factura no CUD con profesional */}
            <Route
              path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord/professional/:professionalId"
              element={<CreateEditNoCudBillingRecordContainer />}
            />

            {/* Editar factura no CUD */}
            <Route
              path="/billingRecords/noCudBillingRecords/edit/:noCudBillingRecordId"
              element={<CreateEditNoCudBillingRecordContainer />}
            />

            {/* Editar factura no CUD con profesional */}
            <Route
              path="/billingRecords/noCudBillingRecords/edit/professional/:professionalId/:noCudBillingRecordId"
              element={<CreateEditNoCudBillingRecordContainer />}
            />

            {/* Editar factura no CUD con paciente */}
            <Route
              path="/billingRecords/noCudBillingRecords/edit/patient/:patientId/:noCudBillingRecordId"
              element={<CreateEditNoCudBillingRecordContainer />}
            />
          </Routes>
          <FooterContainer />
        </GeneralContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
