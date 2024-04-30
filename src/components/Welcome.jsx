import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Welcome = (props) => {
  const [show, setShow] = useState(true); // E' una destrutturazione della variabile show, che permette, grazie all'uso di
  // useState di assegnarle un valore iniziale uguale a true, che indica che la finestra di benvenuto dovrebbe essere visualizzata.
  // Inoltre nella destrutturazione dichiariamo anche una funzione setShow, che cambia il valore di show a false, per nascondere
  //la finestra di benvenuto

  return (
    <>
      <Alert show={show} variant="success" className="mt-3">
        <Alert.Heading>Welcome to {props.brand}</Alert.Heading>
        <p>
          Here with us you can find any book you are looking for, with a library
          from all over the world.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default Welcome;
