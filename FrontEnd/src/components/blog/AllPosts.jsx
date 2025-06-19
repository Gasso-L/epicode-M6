import SinglePost from "./partials/singlepost/SinglePost";
import { Col, Container, Row } from "react-bootstrap";
import useSession from "../../../hooks/useSession";
import { useState, useEffect } from "react";
import SearchBar from "./partials/searchbar/SearchBar";

const AllPosts = () => {
  const token = localStorage.getItem("token");
  const session = useSession();

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogPosts`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Container>
      <Row className="pb-4">
        <h1 className="fw-bold fs-5 my-2 text-white">
          Welcome to the Strive Blog {session && session.firstName}
        </h1>
        <div className="d-flex justify-content-center">
          <SearchBar />
        </div>
        {posts &&
          posts.map((post, id) => {
            return (
              <Col key={`item-${id}`} md={4} className="pt-4">
                <SinglePost {...post} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default AllPosts;
