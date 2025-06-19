import { Modal, Button, Form } from "react-bootstrap";
import "../addpost/addpost.css";
import { useState } from "react";

const AddPost = ({ show, handleClose }) => {
  const token = localStorage.getItem("token");
  const authorId = localStorage.getItem("authorId");

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    cover: null,
    readTime: {
      value: "",
      unit: "minutes",
    },
  });

  const resetForm = () => {
    setFormData({
      category: "",
      title: "",
      content: "",
      cover: null,
      readTime: {
        value: "",
        unit: "minutes",
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReadTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      readTime: {
        ...prev.readTime,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cover: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postPayload = {
      category: formData.category,
      title: formData.title,
      content: formData.content,
      readTime: {
        value: formData.readTime.value,
        unit: formData.readTime.unit,
      },
      author: authorId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogPosts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },

          body: JSON.stringify(postPayload),
        }
      );

      const data = await response.json();
      const postId = data.post.post._id;

      if (!postId) {
        console.error("Errore nella creazione del post");
        return;
      }

      if (formData.cover) {
        await uploadCover(postId, formData.cover);
      }

      console.log("Post e cover caricati con successo!");
      resetForm();
    } catch (error) {
      console.error("Errore durante la creazione del post:", error);
    }
  };

  const uploadCover = async (postId, file) => {
    const url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/blogPosts/${postId}/cover`;

    const coverPayload = new FormData();
    coverPayload.append("cover", file);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: coverPayload,
      });

      alert("Post create! We are directing you to the blog...");
      window.location.href = "/blog"; // Reindirizza alla pagina del blog
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-white">Create a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-white">Category</Form.Label>
            <Form.Control
              required
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-white">Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-white">
              Reading Time
            </Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                required
                type="number"
                min="1"
                name="value"
                value={formData.readTime.value}
                onChange={handleReadTimeChange}
              />
              <Form.Select
                required
                name="unit"
                value={formData.readTime.unit}
                onChange={handleReadTimeChange}
              >
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-white">Cover</Form.Label>
            <Form.Control
              required
              type="file"
              name="cover"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-white">Content</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              onClick={() => {
                resetForm();
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Public
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPost;
