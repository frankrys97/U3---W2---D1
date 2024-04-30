import CommentList from "./MyCommentList";
import CustomComment from "./CustomComment";
import { Component } from "react";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    elements: [],
    isLoading: false,
    isError: false,
  };

  getComment = () => {
    const myKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmOGE2NjI4MzJlODAwMTk4NzMwOWEiLCJpYXQiOjE3MTQzOTE2NTQsImV4cCI6MTcxNTYwMTI1NH0.8LJndh4fAd8e9THgG8NnG1HZNV-PJ1_p9RlB9odR_Hc";

    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((elements) => {
        console.log(elements);
        this.setState({ elements, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isError: true, isLoading: false });
      });
  };

  // componentDidMount() {
  //   console.log(this.props.asin, "inizio didmount");
  //   this.getComment();
  //   console.log("fine didmount");
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({ isLoading: true, isError: false });
      this.getComment();
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        )}

        {this.state.isError && <Error />}

        {!this.state.isLoading && !this.state.isError && (
          <div className="m-2">
            <h4>Comments:</h4>
            <CommentList
              asin={this.props.asin}
              elements={this.state.elements}
              updateComment={this.getComment}
              isLoading={this.state.isLoading}
            />
            <h4>Add a comment</h4>
            <CustomComment
              asin={this.props.asin}
              updateComment={this.getComment}
            />
          </div>
        )}
      </>
    );
  }
}

export default CommentArea;
