import { Component } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import allBooks from "../books/allBooks.json";

class CarouselHome extends Component {
  state = {
    selectedJson: [],
    uniqueBooks: [],
  };

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
    return (
      <Container fluid style={{ padding: 0 }}>
        <Row xs={12}>
          <Col>
            <Carousel style={{maxHeight: "400px"}}>
              {this.state.selectedJson.map((book) => {
                return (
                  <Carousel.Item style={{ maxHeight: "400px", width: "100%" }} key={book.asin}>
                    <img src={book.img} alt={book.title} style={{ maxHeight: "400px", width: "100%" }} />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.category}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
              {/* <Carousel.Item>
                <ExampleCarouselImage text="First slide" />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item> */}
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CarouselHome;
