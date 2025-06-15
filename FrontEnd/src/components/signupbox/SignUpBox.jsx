import { Form, Button } from "react-bootstrap";
import "../signupbox/signupbox.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpBox = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstName.trim()) formErrors.firstName = "Name is required";
    if (!formData.lastName.trim())
      formErrors.lastName = "Il cognome è obbligatorio";
    if (!formData.email.trim()) formErrors.email = "L'email è obbligatoria";
    if (!formData.password.trim() || formData.password.length < 8)
      formErrors.password = "La password deve avere almeno 8 caratteri";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const [authorId, setAuthorId] = useState(null);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/authors`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            dob: formData.dob,
            password: formData.password,
          }),
        }
      );

      const authorData = await response.json();
      setAuthorId(authorData.author.id);

      if (formData.avatar) {
        await uploadAvatar(authorData.author.id, formData.avatar);
      }

      alert(
        "Registration successful! You will be redirected to the login page."
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadAvatar = async (id, avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/authors/${id}/avatar`,
        {
          method: "PATCH",
          body: formData,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="d-flex justify-content-center pb-4">
          <img src={logo} className="img-fluid w-50"></img>
        </div>
        <Form className="login-form" noValidate onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              className={errors.firstName ? "is-invalid" : ""}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              className={errors.lastName ? "is-invalid" : ""}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              className={errors.email ? "is-invalid" : ""}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name="dob" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Load your avatar</Form.Label>
            <Form.Control type="file" name="avatar" onChange={onFileChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose Password"
              name="password"
              className={errors.password ? "is-invalid" : ""}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
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
