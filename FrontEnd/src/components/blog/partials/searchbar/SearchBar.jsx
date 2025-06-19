import { Form, Button } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Form className="d-flex justify-content-center align-content-center gap-1 py-4 w-100">
      <Form.Control
        type="text"
        placeholder="Search Blog By Title"
        className=" mr-sm-2"
      />

      <Button type="submit" variant="warning">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
