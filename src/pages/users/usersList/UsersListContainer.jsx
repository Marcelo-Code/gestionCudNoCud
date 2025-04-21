import { useEffect, useState } from "react";
import { UsersList } from "./UsersList";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { useParams } from "react-router-dom";
import {
  getInactiveUsers,
  getUsers,
  softDeleteUser,
  softUnDeleteUser,
} from "../../../services/api/users";

export const UsersListContainer = () => {
  //hook para determinar si se piden parámetros activos o inactivos
  const { active } = useParams();

  //hook para el array de pacientes
  const [users, setUsers] = useState([]);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  //hook para el edit mode
  const [editMode, setEditMode] = useState(false);

  const [updateList, setUpdateList] = useState(false);

  //Función para eliminar un usuario
  const handleDeleteUser = (userId, userName) => {
    softDeleteUser(userId, userName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Función para restaurar un usuario
  const handleUndeleteUser = (userId, userName) => {
    softUnDeleteUser(userId, userName, setUpdateList)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Obtener usuarios
  useEffect(() => {
    setIsLoading(true);

    const action = active === "active" ? getUsers : getInactiveUsers;

    action()
      .then((response) => {
        setUsers(response.data);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateList, active]);

  if (isLoading) {
    return <LoadingContainer />;
  }

  const usersListProps = {
    users,
    editMode,
    setEditMode,
    handleDeleteUser,
    active,
    handleUndeleteUser,
  };

  return <UsersList {...usersListProps} />;
};
