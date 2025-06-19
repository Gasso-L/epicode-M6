import { Col, Image, Row } from "react-bootstrap";
import "../postauthor/postauthor.css";

const PostAuthor = (author) => {
  const { firstName, avatar } = author;
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="img-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>by</div>
        <h6>{firstName}</h6>
      </Col>
    </Row>
  );
};

export default PostAuthor;
