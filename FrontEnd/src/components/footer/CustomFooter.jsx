import { Container, Row, Col } from "react-bootstrap";
import "./customfooter.css";

const CustomFooter = () => {
  return (
    <footer className="py-4">
      <Container>
        <Row>
          <Col
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <h4>Strive Blog | Lorenzo | 2025</h4>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomFooter;
