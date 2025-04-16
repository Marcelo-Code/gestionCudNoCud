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
            <Route
              path="/medicalRecords/createMedicalRecord"
              element={<CreateEditMedicalRecordContainer />}
            />
            <Route
              path="/medicalRecords/list"
              element={<MedicalRecordsListContainer />}
            />
            <Route
              path="/medicalRecords/list/professional/:professionalId"
              element={<MedicalRecordsListContainer />}
            />
            <Route
              path="/medicalRecords/list/patient/:patientId"
              element={<MedicalRecordsListContainer />}
            />
            <Route
              path="/medicalRecords/detail/:medicalRecordId"
              element={<MedicalRecordDetailContainer />}
            />
            <Route
              path="/medicalRecords/edit/:medicalRecordId"
              element={<CreateEditMedicalRecordContainer />}
            />
            {/* ---------- Facturación  ----------*/}

            <Route
              path="/billingRecords/list"
              element={<BillingRecordsContainer />}
            />

            {/* ---------- Facturación  ----------*/}

            <Route
              path="/billingRecords/createCudBillingRecord"
              element={<CreateEditCudBillingRecordContainer />}
            />

            <Route
              path="/billingRecords/createCudBillingRecord"
              element={<CreateEditCudBillingRecordContainer />}
            />

            <Route
              path="/billingRecords/cudBillingRecords/edit/:cudBillingRecordId"
              element={<CreateEditCudBillingRecordContainer />}
            />

            {/* ---------- Facturación NO CUD ----------*/}

            <Route
              path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord"
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
