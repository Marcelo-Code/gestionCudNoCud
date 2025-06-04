import { supabaseClient } from "../config/config";

export const checkAuth = async () => {
  try {
    // Obtener la sesión actual
    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();

    if (sessionError) {
      throw new Error("Error al obtener la sesión");
    }

    if (!sessionData?.session) {
      return { status: 401, message: "No hay sesión activa" };
    }

    const userId = sessionData.session.user.id;

    // Buscar datos del usuario en la tabla 'usuarios'
    const { data: userData, error: userError } = await supabaseClient
      .from("usuarios")
      .select("*")
      .eq("auth_user_id", userId)
      .single();

    if (userError || !userData) {
      return { status: 404, message: "Usuario no encontrado" };
    }

    if (userData.activo === false) {
      return { status: 403, message: "Usuario inactivo" };
    }

    return { status: 200, userData, message: "Sesión activa" };
  } catch (error) {
    return { status: 500, message: error.message || "Error inesperado" };
  }
};
