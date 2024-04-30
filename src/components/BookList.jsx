import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import SingleBook from "./SingleBook.jsx";
import React from "react";
import allBooks from "../books/allBooks.json";
import fantasy from "../books/fantasy.json";
import history from "../books/history.json";
import horror from "../books/horror.json";
import romance from "../books/romance.json";
import scifi from "../books/scifi.json";

// const myBookList = ({ books }) => {
//   return (
//     <Container>
//       <Row>
//         {books.map((book) => (
//           <SingleBook key={book.id} book={book} />
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default myBookList;

class MyBookList extends React.Component {
  state = {
    searchInput: "",
    selectedJson: [],
    uniqueBooks: [],
  };

  // Con removeDuplicates creo un metodo interno alla classe che grazie al metodo reduce degli array, restituisce
  // un array senza duplicati, in base all'elemento 'asin' dello stesso oggetto
  // In pratica in questo caso l'accumulatore è un array vuoto in cui io vado ad inserire tutti gli elementi che
  // non sono duplicati, utilizzando il metodo findIndex, che restituisce -1 se l'elemento non esiste
  // infatti in questo caso ho confrontato l'asin dei libri presenti nell'array acc con l'asin dell'elemento corrente
  // dicendogli che se il valore di findIndex restituisce -1 allora l'elemento corrente non è duplicato
  // quindi me lo puoi inserire in acc
  removeDuplicates(arr) {
    return arr.reduce((acc, book) => {
      if (acc.findIndex((x) => x.asin === book.asin) === -1) {
        acc.push(book);
      }
      return acc;
    }, []);
  }

  // Con componentDidMount(), ovvero quando il componente viene montato, faccio partire il metodo removeDuplicates
  // in modo da creare un array di libri senza duplicati e creare una sorta di Shuffle per l'array
  // Successivamente imposto lo stato selectedJson con questo nuovo array e imposto anche un nuovo stato uniqueBooks
  // con questo nuovo array, poichè mi servirà in seguito al click del bottone "all"
  componentDidMount() {
    const uniqueBooks = this.removeDuplicates(allBooks).sort(
      () => Math.random() - 0.5
    );
    this.setState({ selectedJson: uniqueBooks, uniqueBooks: uniqueBooks });
  }
  render() {
    console.log(this.state.selectedJson);
    const searchedBook = this.state.selectedJson.filter((book) => {
      return book.title
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase());
    });

    return (
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <ButtonGroup aria-label="Basic example" className="my-3">
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({
                  selectedJson: this.state.uniqueBooks,
                  activeButton: "all",
                });
              }}
              className={this.state.activeButton === "all" ? "active" : ""}
            >
              All
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({
                  selectedJson: fantasy,
                  activeButton: "fantasy",
                });
              }}
              className={this.state.activeButton === "fantasy" ? "active" : ""}
            >
              Fantasy
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({
                  selectedJson: history,
                  activeButton: "history",
                });
              }}
              className={this.state.activeButton === "history" ? "active" : ""}
            >
              History
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({
                  selectedJson: horror,
                  activeButton: "horror",
                });
              }}
              className={this.state.activeButton === "horror" ? "active" : ""}
            >
              Horror
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({
                  selectedJson: romance,
                  activeButton: "romance",
                });
              }}
              className={this.state.activeButton === "romance" ? "active" : ""}
            >
              Romance
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.setState({ selectedJson: scifi, activeButton: "scifi" });
              }}
              className={this.state.activeButton === "scifi" ? "active" : ""}
            >
              Scifi
            </Button>
          </ButtonGroup>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.searchInput}
            onChange={(e) => this.setState({ searchInput: e.target.value })}
            className="rounded rounded-2 p-1 border border-1 border-dark"
          />
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {searchedBook.map((book) => (
            <SingleBook
              key={book.asin}
              book={book}
              setNewAsin={this.props.setNewAsin}
              selectedAsin={this.props.selectedAsin}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default MyBookList;
