import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button, InputGroup, Row, Col, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as authConstants from "../constants/authConstants";
import { Link } from "react-router-dom";
import "../styles/RegisterPage.css"; // Import the CSS file

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [errorMsg, setMessage] = useState(""); // Added state for error message
  const [successMsg, setSuccessMessage] = useState(""); // Added state for success message

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    setPasswordType(temp ? "text" : "password");
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    setConfirmPasswordType(temp ? "text" : "password");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const user = {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
    };
    register(dispatch, user).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2500); // Redirect after 2 seconds
      } else if (data.type === authConstants.USER_REGISTER_FAILURE) {
        setMessage("User already exists. Please try with a different email.");
      }
    });
  };

  return (
    <div className="register-page-container">
      <div className="background-image-container">
        <Image
          src="/images/background.jpeg"
          alt="Background"
          className="background-image"
        />
      </div>
      <FormContainer className="register-form-container">
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Button
                onClick={showPasswordHandler}
                variant=""
                style={{ border: "1px solid black" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="my-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={confirmPasswordType}
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
              <Button
                onClick={showConfirmPasswordHandler}
                variant=""
                style={{ border: "1px solid black" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="my-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {errorMsg && <div className="text-danger my-3">{errorMsg}</div>} {/* Display error message */}
          {successMsg && <div className="text-success my-3">{successMsg}</div>} {/* Display success message */}

          <Button variant="" className="my-3" type="submit" style={{backgroundColor:"rgb(68 177 49)", color:"white"}}>
            Register
          </Button>
        </Form>

        {registerReducer.loading ? (
          <Loader />
        ) : (
          <Row className="py-3">
            <Col>
              Have an Account? <Link to="/" style={{color:"rgb(68 177 49)"}}>Login</Link>
            </Col>
          </Row>
        )}
      </FormContainer>
    </div>
  );
};

export default RegisterPage;
