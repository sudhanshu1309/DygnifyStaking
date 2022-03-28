import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./borrow.css";

const Borrow = () => {
  return (
    <>
      <section className="box">
        <aside className="left">
          <h1>
            <Link to="/">DYGNIFY</Link>
          </h1>
          <Link to="/">Pool</Link>
          <Link to="/borrow">Borrow</Link>
        </aside>
        <aside className="right">
          <h1 style={{ textAlign: "center" }}>Borrow </h1>
          <h1 style={{ margin: "10px" }}>Nothing Here!</h1>
          <Link to="/">
            <Button variant="outlined">Home</Button>
          </Link>
        </aside>
      </section>
    </>
  );
};

export default Borrow;
