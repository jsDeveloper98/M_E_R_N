import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";

const AuthForm = ({ register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, clearError, request } = useHttp();
  const { login } = useContext(AuthContext);

  const signUp = async () => {
    await request(`/api/auth/signup`, "POST", {
      email,
      password,
    });
  };

  const signIn = async () => {
    const data = await request(`/api/auth/signin`, "POST", {
      email,
      password,
    });

    if (data && data.token) {
      login(data.token, data.userId);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => clearError(), 2000);
    }
  }, [error, clearError]);

  const getProperties = () => {
    return {
      method: register ? signUp : signIn,
      title: register ? "Sign Up" : "Login",
    };
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-header-text">{getProperties().title}</div>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <div
              className={`auth-form-btn ${loading ? "-disabled" : ""}`}
              onClick={getProperties().method}
            >
              {getProperties().title}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
