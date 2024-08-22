import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
 <Spinner
  animation="border"
  role="status"
  style={{
    width: "50px",
    height: "50px",
    margin: "auto",
    display: "block",
    color: "#f39c12",
  }}
>
  <span className="visually-hidden">Loading...</span>
</Spinner>

  <p style={{ marginTop: "10px", color: "rgb(68 177 49)" }}>Loading...</p>
</div>


  );
};

export default Loader;
