import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup, Image } from "react-bootstrap"; // Import Image component
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [errorMsg, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errors, setErrors] = useState({});

  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const validate = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    setPasswordType(temp ? "text" : "password");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      login(dispatch, email, password).then((data) => {
        if (data.type === authConstants.USER_LOGIN_SUCCESS) {
          data.payload.roles.map((r) => {
            if (r["roleName"] === "ADMIN") {
              return navigate("/adminProfile");
            } else {
              return navigate("/profile");
            }
          });
        } else {
          setMessage("Invalid credentials");
        }
      });
    }
  };

  useEffect(() => {
    if (token && user) {
      user.roles.map((r) => {
        if (r["roleName"] === "ADMIN") return navigate("/adminProfile");
        else return navigate("/profile");
      });
    }
  }, [token, user, navigate]);

  return (
    <div className="login-page-container">
      <div className="background-image-container">
        <Image
          src="/images/background.jpeg"
          alt="Background"
          className="background-image"
        />
      </div>
      <FormContainer className="login-form-container">
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Button
                onClick={showPasswordHandler}
                variant=""
                style={{ border: "1px solid black" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>

          <Button
            variant=""
            className="my-3"
            type="submit"
            style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
          >
            Login
          </Button>

          {errorMsg && <div className="text-danger">{errorMsg}</div>}
        </Form>

        {loginReducer.loading ? (
          <Loader />
        ) : (
          <>
            <Row className="py-3">
              <Col>
                <Link to="/recovery" style={{ color: "rgb(68 177 49)" }}>
                  Forgot Password?
                </Link>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                New Customer?{" "}
                <Link to="/register" style={{ color: "rgb(68 177 49)" }}>
                  Register
                </Link>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default LoginPage;
