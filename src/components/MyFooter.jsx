import { Container } from "react-bootstrap";

const MyFooter = (props) => {
  return (
    <footer className="footer mt-3 py-3 bg-body-secondary ">
      <Container fluid className="text-center">
        <span className="text-muted">© 2024 Copyright: {props.name}</span>
      </Container>
    </footer>
  );
};

export default MyFooter;
