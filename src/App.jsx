import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Router,
} from "react-router-dom";
import { PatientsListContainer } from "./pages/patiens/patientsList/PatientsListContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { PatientDetailContainer } from "./pages/patiens/patientDetail/PatientDetailContainer";
import { CreateEditPatientContainer } from "./pages/patiens/createEditPatient/CreateEditPatientContainer";
import { ScrollToTop } from "./components/common/scrollToTop/ScrollToTop";
import { DocumentationContainer } from "./pages/documentation/DocumentationContainer";
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
import { CreateEditPaymentRequestContainer } from "./pages/paymentRequests/createEditPaymentRequest/CreateEditPaymentRequestContainer";
import { PaymentRequestsListContainer } from "./pages/paymentRequests/paymentRequestsList/PaymentRequestsListContainer";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginContainer } from "./pages/login/LoginContainer";
import { GeneralContextProvider } from "./context/GeneralContext";
import { RecoverPasswordContainer } from "./pages/recoverPassword/RecoverPasswordContainer";
import { UpdatePasswordContainer } from "./pages/updatePassword/UpdatePasswordContainer";
import { UsersListContainer } from "./pages/users/usersList/UsersListContainer";
import { CreateEditUserContainer } from "./pages/users/createUser/CreateEditUserContainer";
import { PageNotFoundContainer } from "./pages/pageNotFound/PageNotFoundContainer";

function App() {
  return (
    <BrowserRouter>
      <GeneralContextProvider>
        <AppContent />
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/recoverPassword" ||
    location.pathname === "/updatePassword";
  return (
    <>
      {!isLoginPage && <NavBarContainer />}

      {/* Scrollea al inicio de la pantalla cuando se navega */}
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/recoverPassword" element={<RecoverPasswordContainer />} />
        <Route path="/updatePassword" element={<UpdatePasswordContainer />} />

        {/* Componente para las rutas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                {/*---------- Not found page ----------*/}
                <Route path="*" element={<PageNotFoundContainer />} />

                {/* ---------- Home ----------*/}
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

                {/*---------- Reclamos ----------*/}

                {/* Crear reclamo */}
                <Route
                  path="/paymentRequests/createPaymentRequest"
                  element={<CreateEditPaymentRequestContainer />}
                />

                {/* Crear reclamo con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/createPaymentRequest/cudBillingRecords/:cudBillingRecordId"
                  element={<CreateEditPaymentRequestContainer />}
                />

                {/* Editar reclamo */}
                <Route
                  path="/paymentRequests/edit/:paymentRequestId"
                  element={<CreateEditPaymentRequestContainer />}
                />

                {/* Editar reclamo con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/edit/cudBillingRecords/:cudBillingRecordId/:paymentRequestId"
                  element={<CreateEditPaymentRequestContainer />}
                />

                {/* Lista de reclamos */}
                <Route
                  path="/paymentRequests/list"
                  element={<PaymentRequestsListContainer />}
                />

                {/* Lista de reclamos con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/list/cudBillingRecords/:cudBillingRecordId"
                  element={<PaymentRequestsListContainer />}
                />

                {/*---------- Usuarios ----------*/}

                {/* Crear usuario */}
                <Route
                  path="/users/createUser"
                  element={<CreateEditUserContainer />}
                />

                {/* Editar usuario */}
                <Route
                  path="/users/edit/:userId"
                  element={<CreateEditUserContainer />}
                />
                {/* Lista de usuarios */}
                <Route
                  path="/users/list/:active"
                  element={<UsersListContainer />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isLoginPage && <FooterContainer />}
    </>
  );
};

export default App;
