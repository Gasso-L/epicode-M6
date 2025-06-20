import { Form, Button } from "react-bootstrap";
import "../loginbox/loginbox.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginBox = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const jsonResponse = await response.json();

    if (response.ok) {
      localStorage.setItem("token", jsonResponse.token);
      localStorage.setItem("authorId", jsonResponse.authorId);
      navigate("/blog");
    }

    return jsonResponse;
  };

  /*   const onRedirectGithub = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/github`;
  };

  const onRedirectGoogle = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/google`;
  }; */

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="d-flex justify-content-center pb-4">
          <img src={logo} className="img-fluid w-50"></img>
        </div>
        <Form className="login-form" onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={onChangeInput}
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={onChangeInput}
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="w-100">
            Login
          </Button>
          {/*           <Button
            variant="primary"
            type="button"
            className="login-button mt-2 d-flex justify-content-center align-items-center gap-2"
            onClick={onRedirectGithub}
          >
            <span className="pi pi-github"></span>Login GitHub
          </Button>
          <Button
            variant="danger"
            type="button"
            className="mt-2 d-flex justify-content-center align-items-center gap-2 w-100"
            onClick={onRedirectGoogle}
          >
            <span className="pi pi-google"></span>Login Google
          </Button> */}
          <div className="d-flex justify-content-center mt-4">
            <p>
              Don't have an Account? <Link to="/signup">Create it now</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginBox;
