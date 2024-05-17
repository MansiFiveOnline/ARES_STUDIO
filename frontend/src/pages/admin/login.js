import React, { useState } from "react";
import "../../style/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,

          // const response = await fetch("/api/auth/login", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ email, password }),
          // });
          // method: "POST",
          // baseUrl: "http://localhost:8000/api/",
          // url: "auth/login",
          // email,
          // password,
        }
      );
      // const data = await response.json();
      // Handle response data, e.g., store tokens in local storage

      console.log(response.data);
      // Redirect to home page after successful login
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
      // console.log(data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-content">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="form-white-bg">
              <form onSubmit={handleLogin}>
                <div className="row">
                  <div className="col-md-12 text-center mb-4">
                    <h3>ARES Studio</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <label>Email Id</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <button type="submit">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
