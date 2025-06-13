import { Container, Row, Col } from "react-bootstrap";
import "./customfooter.css";

const CustomFooter = () => {
  return (
    <footer className="pt-5">
      <Container>
        <Row>
          <Col
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <h4>Strive Blog | Lorenzo | 2025</h4>
          </Col>
        </Row>
        <Row className="py-4">
          <Col sm={12} className="footer-list">
            <ul className="d-flex justify-content-center align-items-center gap-4">
              <li>Home</li>
              <li>About</li>
              <li>Browse</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomFooter;
