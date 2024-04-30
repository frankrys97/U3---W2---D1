import fantasy from "../books/fantasy.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";

const AllBooks = () => {
  return (
    <Container className="mt-3">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {fantasy.map((book) => (
          <Col>
            <Card key={`book ${book.asin}`} className="h-100">
              <Card.Img
                variant="top"
                src={book.img}
                alt={book.title}
                className="cards-image"
              />
              <Card.Body className="d-flex flex-column justify-content-between align-items-start">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  {book.category} - {book.price}€
                </Card.Text>
                <Button variant="primary">Buy It</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllBooks;
