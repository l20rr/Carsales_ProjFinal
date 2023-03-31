import React from "react"

import "../styles/login.css";
import "../login.js";

const Login = () => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Entrar</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="email-login"
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password-login"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Esqueceste-te da <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;

