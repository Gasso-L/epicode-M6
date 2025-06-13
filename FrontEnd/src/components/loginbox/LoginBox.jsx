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
      navigate("/blog");
    }

    return jsonResponse;
  };

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

          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
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
