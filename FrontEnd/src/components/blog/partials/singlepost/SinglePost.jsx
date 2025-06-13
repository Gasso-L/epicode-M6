import PostAuthor from "../postauthor/PostAuthor";
import { Card } from "react-bootstrap";
import "../singlepost/singlepost.css";

const SinglePost = (post) => {
  const { title, cover, author, _id } = post;
  return (
    <Card className="post-card ">
      <Card.Img variant="top" src={cover} className="post-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <PostAuthor {...author} />
      </Card.Footer>
    </Card>
  );
};

export default SinglePost;
