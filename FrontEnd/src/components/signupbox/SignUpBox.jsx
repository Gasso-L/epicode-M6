import { Form, Button } from "react-bootstrap";
import "../signupbox/signupbox.css";
import logo from "../../assets/logo.png";
import { useState } from "react";

const SignUpBox = () => {
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="d-flex justify-content-center pb-4">
          <img src={logo} className="img-fluid w-50"></img>
        </div>
        <Form className="login-form" /* onSubmit={onSubmit} */>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              /* onChange={onChangeInput} */
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              /* onChange={onChangeInput} */
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              /* onChange={onChangeInput} */
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob" /* onChange={onChangeInput} */
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Load your avatar</Form.Label>
            <Form.Control
              type="file"
              name="avatar" /* onChange={onChangeInput} */
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose Password"
              name="password"
              /* onChange={onChangeInput} */
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpBox;
