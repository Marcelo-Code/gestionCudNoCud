import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/common/alerts/alerts";
import { supabaseClient } from "../config/config";

export const createAuthUser = async (newUser) => {
  const {
    email,
    password,
    nombreyapellidousuario,
    professionalid,
    perfil,
    activo,
  } = newUser;

  console.log(password);

  try {
    //Crear un usuario en la tabla auth.users
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/updatePassword`,
        },
      });

    if (authError) throw authError;

    const auth_user_id = authData.user.id;

    //Si el auth.user se crea correctamente, se inserta en la tabla 'usuarios'
    const { error: insertError } = await supabaseClient
      .from("usuarios")
      .insert([
        {
          auth_user_id,
          nombreyapellidousuario,
          professionalid,
          perfil,
          email,
          activo,
        },
      ]);

    if (insertError) throw insertError;

    successAlert(`Usuario ${nombreyapellidousuario} creado con éxito`);

    return {
      status: 201,
      message: "Usuario creado correctamente en Auth y en la tabla usuarios",
    };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    errorAlert("No se pudo crear el usuario");
    return {
      status: 400,
      message: "Error al crear usuario",
      error: error.message,
    };
  }
};

export const updateAuthUser = async (updatedUser) => {
  const {
    auth_user_id,
    email,
    nombreyapellidousuario,
    professionalid,
    perfil,
  } = updatedUser;

  try {
    // 1. Actualizar la información del usuario en la tabla 'usuarios'
    const { data, error: updateError } = await supabaseClient
      .from("usuarios")
      .update({
        nombreyapellidousuario,
        professionalid,
        perfil,
        email, // si deseas permitir la actualización del email
      })
      .eq("auth_user_id", auth_user_id); // Actualiza según el auth_user_id

    if (updateError) throw updateError;

    // Usa RPC para actualizar la tabla auth.users (a través de una función definida en la base de datos)
    // const { error: rpcError } = await supabaseClient.rpc("admin_update_user", {
    //   auth_user_id,
    //   new_email: email,
    // });

    // if (rpcError) {
    //   console.error("Error al actualizar usuario en auth:", rpcError);
    //   return {
    //     status: 400,
    //     message: "No se pudo actualizar el usuario en auth",
    //     error: rpcError.message,
    //   };
    // }

    successAlert(`Usuario ${nombreyapellidousuario} actualizado con éxito`);

    return {
      status: 200,
      message:
        "Usuario actualizado correctamente en Auth y en la tabla usuarios",
    };
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    errorAlert("No se pudo actualizar el usuario");
    return {
      status: 400,
      message: "Error al actualizar usuario",
      error: error.message,
    };
  }
};

export const updateLoggedInUserPassword = async (newPassword) => {
  try {
    const { data, error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    successAlert("Contraseña actualizada con éxito");
    return {
      status: 200,
      message: "Contraseña actualizada con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar contraseña");
    return {
      status: 400,
      message: "Error al actualizar contraseña",
      error: error.message,
    };
  }
};

export const getAuthUsers = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("public_users")
      .select("*");

    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenidos con éxito",
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

export const getAuthUser = async (userId) => {
  try {
    const { data, error } = await supabaseClient
      .from("usuarios")
      .select("*")
      .eq("id", userId);
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

//Funcion para obtener todos los pacientes
export const getUsers = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("usuarios")
      .select("*, profesionales:professionalid(nombreyapellidoprofesional)")
      .eq("activo", true)
      .order("nombreyapellidousuario", { ascending: true });

    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenidos con éxito",
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

export const getInactiveUsers = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("usuarios")
      .select("*, profesionales:professionalid(nombreyapellidoprofesional)")
      .eq("activo", false)
      .order("nombreyapellidousuario", { ascending: true });
    if (error) throw error;
    return {
      status: 201,
      message: "Registros obtenidos con éxito",
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

export const getUserByEmail = async (emailUser) => {
  try {
    const { data, error } = await supabaseClient
      .from("usuarios")
      .select("*")
      .eq("activo", true)
      .eq("email", emailUser);

    // Verificación si ocurrió un error en la consulta
    if (error) {
      console.error("Error en la consulta:", error);
      throw new Error("Hubo un problema al obtener el usuario.");
    }

    // Verificar si 'data' es un array y si está vacío
    if (Array.isArray(data) && data.length === 0) {
      console.warn("El usuario no existe o está inactivo.");
      return false;
    }

    return data; // Si se encuentran datos, retornarlos
  } catch (error) {
    // Capturar cualquier otro error
    console.error("Error en getUserByEmail:", error.message || error);
    return false;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const { id, ...fieldsToUpdate } = updatedUser;

    const { data, error } = await supabaseClient
      .from("usuarios")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    successAlert(
      `Usuario ${fieldsToUpdate.nombreyapellidousuario} actualizado con éxito`
    );

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorAlert("Error al actualizar usuario");

    return {
      status: 400,
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};

//Funcion para eliminar un paciente
export const softDeleteUser = async (userId, userName, setUpdateList) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de desactivar el usuario ${userName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("usuarios")
      .update({ activo: false })
      .match({ id: userId });
    if (error) throw error;
    successAlert("Usiario desactivado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro desactivado con éxito",
    };
  } catch (error) {
    errorAlert("Error al desctivar usuario");
    return {
      status: 404,
      message: "Error al desactivar registro",
      error: error.message,
    };
  }
};

export const softUnDeleteUser = async (userId, userName, setUpdateList) => {
  const confirm = await confirmationAlert(
    `¿Estás seguro de activar el usuario ${userName}?`
  );
  if (!confirm) return;
  try {
    const { error } = await supabaseClient
      .from("usuarios")
      .update({ activo: true })
      .match({ id: userId });
    if (error) throw error;
    successAlert("Usiario activado con éxito");
    setUpdateList((prev) => !prev);

    return {
      status: 201,
      message: "Registro activado con éxito",
    };
  } catch (error) {
    errorAlert("Error al activar usuario");
    return {
      status: 404,
      message: "Error al activar registro",
      error: error.message,
    };
  }
};

const handleErrors = (error, defaultMessage = "Error en la operación") => {
  console.error(defaultMessage, error);
  errorAlert(defaultMessage);
  return {
    status: 400,
    message: defaultMessage,
    error: error.message,
  };
};
