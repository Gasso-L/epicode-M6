import { Container, Navbar, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Plus } from "lucide-react";
import "../navbar/customnav.css";
import useSession from "../../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import AddPost from "../blog/partials/addpost/AddPost";
import { useState } from "react";

const CustomNav = () => {
  const session = useSession();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Navbar expand="lg" className="nav-after py-4" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Strive Blog" className="logo-navbar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
            <Button
              variant="success"
              className="d-flex align-items-center d-lg-none "
              onClick={handleOpen}
            >
              <Plus size={20} />
              <p className="m-auto">Post Article</p>
            </Button>

            <Button
              variant="danger"
              className="d-flex align-items-center d-lg-none "
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Navbar.Collapse>

        {session && (
          <div className="d-none d-lg-flex justify-content-center gap-2">
            <Button
              variant="success"
              className="d-none d-lg-flex align-items-center"
              onClick={handleOpen}
            >
              <Plus size={20} />
              <p className="m-auto">Post Article</p>
            </Button>
            <Button
              variant="danger"
              className="d-none d-lg-flex align-items-center"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
      <AddPost show={showModal} handleClose={handleClose} />
    </Navbar>
  );
};

export default CustomNav;
