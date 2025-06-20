import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import LoginSuccess from "../components/loginsucess/LoginSuccess";

const Success = () => {
  const [queryParams] = useSearchParams();
  const token = queryParams.get("token");
  const decodedToken = jwtDecode(token);
  const authorId = decodedToken.id;
  const navigate = useNavigate();

  const saveTokenToLocalStorage = () => {
    localStorage.setItem("token", token);
    localStorage.setItem("authorId", authorId);

    setTimeout(() => {
      navigate("/blog", { replace: true });
    }, 3000);
  };

  useEffect(() => {
    saveTokenToLocalStorage();
  }, [token]);

  return <LoginSuccess />;
};

export default Success;
