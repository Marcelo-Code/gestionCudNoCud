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
import { UpdatePasswordLoggedInUserContainer } from "./pages/users/updatePasswordLoggedInUser/UpdatePasswordLoggedInUserContainer";
import { ProtectedUserRoute } from "./routes/ProtectedUserRoute";
import { UnauthorizedUserPageContainer } from "./pages/unauthorizedUserPage/UnauthorizedUserPageContainer";
import { SettingsContainer } from "./pages/settings/SettingsContainer";
import { PaymentRequestDetailContainer } from "./pages/paymentRequests/paymentRequestDetail/PaymentRequestDetailContainer";

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

                {/*---------- Unauthorized page ----------*/}
                <Route
                  path="/unauthorized"
                  element={<UnauthorizedUserPageContainer />}
                />

                {/* ---------- Home ----------*/}
                <Route path="/" element={<HomeContainer />} />

                {/* ---------- Pacientes ----------*/}

                {/*  Crear pacientes */}
                <Route
                  path="/patients/createPatient"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPatientContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/*  Lista de pacientes */}
                <Route
                  path="/patients/list/:active"
                  element={<PatientsListContainer />}
                />

                {/* Detalle de pacientes */}
                <Route
                  path="/patients/detail/:patientId"
                  element={<PatientDetailContainer />}
                />

                {/* Documentación de pacientes */}
                <Route
                  path="/patients/documentation/:patientId"
                  element={<DocumentationContainer />}
                />

                {/* Edición de pacientes */}
                <Route
                  path="/patients/edit/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPatientContainer />
                    </ProtectedUserRoute>
                  }
                />
                {/* ---------- Profesionales ----------*/}
                {/* Crear profesional */}
                <Route
                  path="/professionals/createProfessional"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditProfessionalContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Lista de profesionales activos */}
                <Route
                  path="/professionals/list/:active"
                  element={
                    <ProtectedUserRoute>
                      <ProfessionalsListContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Detalle de profesional */}
                <Route
                  path="/professionals/detail/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <ProfessionalDetailContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Documentación de profesional */}
                <Route
                  path="/professionals/documentation/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <DocumentationContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Edición de profesional */}
                <Route
                  path="/professionals/edit/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditProfessionalContainer />
                    </ProtectedUserRoute>
                  }
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
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear consulta con paciente */}
                <Route
                  path="/medicalRecords/createMedicalRecord/patient/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear consulta con profesional y con paciente */}
                <Route
                  path="/medicalRecords/createMedicalRecord/professional/:professionalId/patient/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
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
                {/* Lista de consultas por paciente y por profesional */}
                <Route
                  path="/medicalRecords/list/professional/:professionalId/patient/:patientId"
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
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar consulta con paciente*/}
                <Route
                  path="/medicalRecords/edit/patient/:patientId/:medicalRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
                />
                {/* Editar consulta con profesional */}
                <Route
                  path="/medicalRecords/edit/professional/:professionalId/:medicalRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditMedicalRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* ---------- Facturación  ----------*/}

                {/* Lista de facturaciones */}
                <Route
                  path="/billingRecords/list"
                  element={<BillingRecordsContainer />}
                />

                {/* Lista de facturaciones por paciente */}
                <Route
                  path="/billingRecords/list/patient/:patientId"
                  element={<BillingRecordsContainer />}
                />

                {/* Lista de facturaciones por profesional */}
                <Route
                  path="/billingRecords/list/professional/:professionalId"
                  element={<BillingRecordsContainer />}
                />

                {/* Lista de facturaciones por paciente y profesional */}
                <Route
                  path="/billingRecords/list/professional/:professionalId/patient/:patientId"
                  element={<BillingRecordsContainer />}
                />
                {/* ---------- Facturación CUD  ----------*/}
                {/* Crear facturación CUD */}
                <Route
                  path="/billingRecords/createCudBillingRecord"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear facturación CUD con profesional */}
                <Route
                  path="/billingRecords/createCudBillingRecord/professional/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear facturación CUD con paciente */}
                <Route
                  path="/billingRecords/createCudBillingRecord/patient/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear facturación CUD con profesional y con paciente */}
                <Route
                  path="/billingRecords/createCudBillingRecord/professional/:professionalId/patient/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar facturación CUD */}
                <Route
                  path="/billingRecords/cudBillingRecords/edit/:cudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar facturación CUD con paciente*/}
                <Route
                  path="/billingRecords/cudBillingRecords/edit/patient/:patientId/:cudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar facturación CUD con profesional */}
                <Route
                  path="/billingRecords/cudBillingRecords/edit/professional/:professionalId/:cudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar facturación CUD con profesional y con paciente */}
                <Route
                  path="/billingRecords/cudBillingRecords/edit/professional/:professionalId/patient/:patientId/:cudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />
                {/* ---------- Facturación NO CUD ----------*/}

                {/* Crear factura no CUD */}
                <Route
                  path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear factura no CUD con paciente */}
                <Route
                  path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord/patient/:patientId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear factura no CUD con profesional */}
                <Route
                  path="/billingRecords/noCudBillingRecords/createNoCudBillingRecord/professional/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar factura no CUD */}
                <Route
                  path="/billingRecords/noCudBillingRecords/edit/:noCudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar factura no CUD con profesional */}
                <Route
                  path="/billingRecords/noCudBillingRecords/edit/professional/:professionalId/:noCudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar factura no CUD con paciente */}
                <Route
                  path="/billingRecords/noCudBillingRecords/edit/professional/:professionalId/patient/:patientId/:noCudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar factura no CUD con profesional y con paciente */}
                <Route
                  path="/billingRecords/noCudBillingRecords/edit/patient/:patientId/:noCudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditNoCudBillingRecordContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/*---------- Reclamos ----------*/}

                {/* Crear reclamo */}
                <Route
                  path="/paymentRequests/createPaymentRequest"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear reclamo con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/createPaymentRequest/cudBillingRecords/:cudBillingRecordId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear reclamo con facturación CUD (con nro factura) y profesional*/}
                <Route
                  path="/paymentRequests/createPaymentRequest/cudBillingRecords/:cudBillingRecordId/professional/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Crear reclamo con profesional*/}
                <Route
                  path="/paymentRequests/createPaymentRequest/professional/:professionalId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar reclamo */}
                <Route
                  path="/paymentRequests/edit/:paymentRequestId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar reclamo con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/edit/cudBillingRecords/:cudBillingRecordId/:paymentRequestId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar reclamo con facturación CUD (con nro factura) y profesional*/}
                <Route
                  path="/paymentRequests/edit/cudBillingRecords/:cudBillingRecordId/professional/:professionalId/:paymentRequestId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar reclamo con profesional*/}
                <Route
                  path="/paymentRequests/edit/professional/:professionalId/:paymentRequestId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditPaymentRequestContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Lista de reclamos */}
                <Route
                  path="/paymentRequests/list"
                  element={<PaymentRequestsListContainer />}
                />

                {/* Detalle reclamos */}
                <Route
                  path="/paymentRequests/detail/:paymentRequestId"
                  element={<PaymentRequestDetailContainer />}
                />

                {/* Lista de reclamos con facturación CUD (con nro factura) */}
                <Route
                  path="/paymentRequests/list/cudBillingRecords/:cudBillingRecordId"
                  element={<PaymentRequestsListContainer />}
                />

                {/* Lista de reclamos con profesional */}
                <Route
                  path="/paymentRequests/list/professional/:professionalId"
                  element={<PaymentRequestsListContainer />}
                />

                {/*---------- Usuarios ----------*/}

                {/* Crear usuario */}
                <Route
                  path="/users/createUser"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditUserContainer />
                    </ProtectedUserRoute>
                  }
                />

                {/* Editar usuario */}
                <Route
                  path="/users/edit/:userId"
                  element={
                    <ProtectedUserRoute>
                      <CreateEditUserContainer />
                    </ProtectedUserRoute>
                  }
                />
                {/* Lista de usuarios */}
                <Route
                  path="/users/list/:active"
                  element={
                    <ProtectedUserRoute>
                      <UsersListContainer />
                    </ProtectedUserRoute>
                  }
                />
                {/* Actualizar contraseña de usuario logueado */}
                <Route
                  path="/users/updatePasswordLoggedInUser"
                  element={<UpdatePasswordLoggedInUserContainer />}
                />
                {/* Ajustes */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedUserRoute>
                      <SettingsContainer />
                    </ProtectedUserRoute>
                  }
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
