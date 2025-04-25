import { UnauthorizedUserPage } from "./UnauthorizedUserPage";
import { useNavigate } from "react-router-dom";

export const UnauthorizedUserPageContainer = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-3);
  };

  const unauthorizedUserPageProps = {
    handleGoBack,
  };
  return <UnauthorizedUserPage {...unauthorizedUserPageProps} />;
};
