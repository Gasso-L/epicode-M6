import SinglePost from "./partials/singlepost/SinglePost";
import { Col, Container, Row } from "react-bootstrap";
import posts from "../../data/posts.json";
import useSession from "../../../hooks/useSession";

const AllPosts = () => {
  const session = useSession();
  return (
    <Container>
      <Row className="pb-4">
        <h1 className="fw-bold my-3">
          Welcome to the Strive Blog {session && session.firstName}
        </h1>
        {posts.map((post, i) => {
          return (
            <Col key={`item-${i}`} md={4} className="pt-4">
              <SinglePost key={post.title} {...post} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AllPosts;
