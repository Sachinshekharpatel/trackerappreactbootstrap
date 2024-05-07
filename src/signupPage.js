import React, { useState } from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log(auth);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo";
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      
    })
      .then((res) => {
        return res.json();
  
      })
      .then((data) => {
        console.log(data); // this console. send data of the user to console who are newly signed up the page
        navigate("/loginpage");
      })
      .catch((err) => {
        alert(err.error.message);
        console.log(err.error.message);
      });


  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3
                id="heading"
              
                className="card-title text-center mb-4"
              >
                Sign Up
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                 
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                   
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  
                  value="SignUp"
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Sign Up
                </button>
              </form>
              <div className="mt-3 text-center">
                <small>
                  Already have an account? <Link to="/loginpage">Login Page</Link>
                </small>
              </div>
              <div className="mt-3 text-center">
                  <small className="text-muted">
                     Developed by : Sachin shekhar patel <Link to="https://github.com/Sachinshekharpatel/trackerappreactbootstrap"> GitHub</Link>
                  </small>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
