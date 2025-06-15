import "../loginsucess/loginsuccess.css";
import Spinner from "react-bootstrap/Spinner";

const LoginSuccess = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" variant="secondary" />
        <p>You will redirect to blog page...</p>
      </div>
    </div>
  );
};

export default LoginSuccess;
