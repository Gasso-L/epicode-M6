import { Container, Navbar, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Plus } from "lucide-react";
import "../navbar/customnav.css";
import useSession from "../../../hooks/useSession";
import { useNavigate } from "react-router-dom";

const CustomNav = () => {
  const session = useSession();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="nav-after py-4" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Strive Blog" className="logo-navbar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Button
            variant="dark"
            className="d-flex align-items-center d-lg-none mt-5"
          >
            <Plus size={20} />
            <p className="m-auto">Post Article</p>
          </Button>

          <Button
            variant="dark"
            className="d-flex align-items-center d-lg-none mt-1"
          >
            Logout
          </Button>
        </Navbar.Collapse>
        {session && (
          <div className="d-none d-lg-flex justify-content-center gap-2">
            <Button
              variant="dark"
              className="d-none d-lg-flex align-items-center"
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="dark"
              className="d-none d-lg-flex align-items-center"
            >
              <Plus size={20} />
              <p className="m-auto">Post Article</p>
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNav;
