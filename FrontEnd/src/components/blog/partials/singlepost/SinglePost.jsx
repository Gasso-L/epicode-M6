import PostAuthor from "../postauthor/PostAuthor";
import { Card } from "react-bootstrap";
import "../singlepost/singlepost.css";

const SinglePost = (post) => {
  const { title, cover, author, content } = post;
  return (
    <Card className="post-card ">
      <Card.Img variant="top" src={cover} className="post-img" />
      <Card.Body>
        <Card.Title className="text-truncate">{title}</Card.Title>
        <Card.Text className="text-truncate">{content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <PostAuthor {...author} />
      </Card.Footer>
    </Card>
  );
};

export default SinglePost;
