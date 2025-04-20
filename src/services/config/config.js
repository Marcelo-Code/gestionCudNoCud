import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_DB_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROL;
export const authToken = import.meta.env.VITE_SUPABASE_AUTH_TOKEN;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const bucketName = "ImagesPatientAdministration";
export const patientDocumentationFolder = "testFolder";
export const professionalDocumentationFolder = "testFolder1";
export const documentationCudBillingFolder = "testFolderCudBilling";
export const documentationNoCudBillingFolder = "testFolderNoCudBilling";
