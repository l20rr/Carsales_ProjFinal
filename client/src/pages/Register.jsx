import React, { useState } from "react"

const Register = () => {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Entrar</h3>
            <div className="text-center">
              Ainda não estás registado?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Regista-te
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                id="email-signin"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password-signin"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            <p className="text-center mt-2">
            Esqueceste-te da <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Criar Conta</h3>
          <div className="text-center">
            Já estás registado?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Entrar
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Nome Completo</label>
            <input
              id= "username-signup"
              type="text"
              className="form-control mt-1"
              placeholder="Alberto Matias"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              id="email-signup"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password-signup"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Registar
            </button>
          </div>
          <p className="text-center mt-2">
            Esqueceste-te da <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register;