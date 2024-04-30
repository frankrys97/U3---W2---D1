import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class CustomComment extends Component {
  state = {
    comment: "",
    rate: "1",
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const myKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmOGE2NjI4MzJlODAwMTk4NzMwOWEiLCJpYXQiOjE3MTQzOTE2NTQsImV4cCI6MTcxNTYwMTI1NH0.8LJndh4fAd8e9THgG8NnG1HZNV-PJ1_p9RlB9odR_Hc";

    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myKey}`,
      },
      body: JSON.stringify({
        comment: this.state.comment,
        elementId: this.props.asin,
        rate: this.state.rate,
      }),
    })
      .then((response) => {
        if (response.ok) {
          this.props.updateComment(this.props.asin);

          this.setState({ comment: "", rate: "1" });
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="mt-4">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="commentText">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating ⭐️</Form.Label>
            <Form.Control
              as="select"
              name="rate"
              value={this.state.rate}
              onChange={this.handleChange}
              required
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3">
            Add a comment
          </Button>
        </Form>
      </div>
    );
  }
}

export default CustomComment;
