import { Spinner } from "react-bootstrap";

const MyLoading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default MyLoading;
