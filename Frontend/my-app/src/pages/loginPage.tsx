import loginImage from "../images/login-image.webp";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import authService from "../services/auth/auth.service";

const LoginPage: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {
      emailAddress: "",
      password: "",
    };

    if (!emailAddress) {
      errors.emailAddress = "This fiels is required!";
    }

    if (!password) {
      errors.password = "This field is required!";
    }

    return errors;
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm();

    if (!errors.emailAddress && !errors.password) {
      setMessage("");
      setLoading(true);

      authService.userLogin(emailAddress, password).then(
        () => {
          navigate(`/`);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="d-flex w-[45vw] items-center justify-center">
        <img
          src={loginImage}
          alt="login-image"
          className="col-md-6 img-fluid"
        />
        <div className="d-flex flex-column bg-light p-4 rounded justify-content-center align-items-center">
          <h1 className="text-primary">My Todo App</h1>
          <h4 className="text-info">Welcome to My Todo List</h4>

          <form className="m-auto" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="my-1">
                Email Addrerss
              </label>
              <input
                name="emailAddress"
                type="text"
                id="email"
                value={emailAddress}
                autoComplete="off"
                placeholder="Enter your Email Address"
                className={`form-control ${
                  errors.emailAddress ? "is-invalid" : ""
                } w-100`}
                required
                onChange={e => setEmailAddress(e.target.value)}
              />
              {errors.emailAddress && (
                <div className="alert alert-danger">{errors.emailAddress}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="my-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Enter your Password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                } w-100`}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <Button type="submit" className="mt-4 w-90 align-items-center btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">{message}</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
