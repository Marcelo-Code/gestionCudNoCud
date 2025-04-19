import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { supabaseClient } from "../config/config";

export const createPaymentRequest = async (newPaymentRequest) => {
  try {
    const { data, error } = await supabaseClient
      .from("reclamos")
      .insert([newPaymentRequest]);
    if (error) {
      throw error;
    }

    successAlert("Reclamo creado con éxito");

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al crear reclamo");
    return {
      status: 404,
      message: "Error al crear el registro",
      error: error.message,
    };
  }
};

export const getPaymentRequests = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("reclamos")
      .select("*, facturacioncud: idfacturacioncud(nrofactura)")
      .order("fechareclamo", { ascending: false });

    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registros",
      error: error.message,
    };
  }
};

export const getPaymentRequest = async (paymentRequestId) => {
  try {
    const { data, error } = await supabaseClient
      .from("reclamos")
      .select("*, facturacioncud: idfacturacioncud(nrofactura)")
      .eq("id", paymentRequestId)
      .order("fechareclamo", { ascending: false });

    if (error) throw error;
    return {
      status: 201,
      message: "Registro obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};

export const deletePaymentRequestRecord = async (
  paymentRequestRecordId,
  setUpdateList
) => {
  const confirm = await confirmationAlert(
    "¿Estás seguro de eliminar el reclamo?"
  );
  if (!confirm) return;
  try {
    const { data, error } = await supabaseClient
      .from("reclamos")
      .delete()
      .eq("id", paymentRequestRecordId);

    if (error) throw error;

    successAlert("Reclamo eliminado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 200,
      message: "Registro eliminado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al eliminar reclamo");
    return {
      status: 400,
      message: "Error al eliminar registro",
      error: error.message,
    };
  }
};
