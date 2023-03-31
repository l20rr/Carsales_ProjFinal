import React, { useRef } from "react";

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/user/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    

    if (username && email && password) {
        const response = await fetch("/api/user/", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // console.log("success");
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
}



function LoginForm() {
  const loginFormRef = useRef(null);

  const loginFormHandler = (event) => {
    event.preventDefault();
    // handle login form submission
  };

  return (
    <form className="Auth-form" ref={loginFormRef} onSubmit={loginFormHandler}>
      // form elements
    </form>
  );
}

function SignupForm() {
  const signupFormRef = useRef(null);

  const signupFormHandler = (event) => {
    event.preventDefault();
    // handle signup form submission
  };

  return (
    <form className="signup-form" ref={signupFormRef} onSubmit={signupFormHandler}>
      // form elements
    </form>
  );
}