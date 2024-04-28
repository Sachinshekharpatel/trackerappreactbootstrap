import { useState ,useEffect} from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./authreducerredux";
const LoginPage = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  useEffect(() => {
    console.log(loginStatus);//
    
    if(loginStatus){
      navigate("/welcomepage");
    }
  },[loginStatus])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo";
    // Handle login logic here
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          const data_1 = response.json();
          let errorMessage = "Authentication failed!";
          if (data_1 && data_1.error && data_1.error.message) {
            errorMessage = data_1.error.message;
          }
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        dispatch(authActions.login());
        localStorage.setItem("token", data.idToken);
        if (loginStatus) {
          console.log(data);
          navigate("/welcomepage");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h3 id="heading" className="card-title text-center mb-4">
                  Login
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
              
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
                <div className="mt-3 text-center d-flex justify-content-between">
                  <small className="text-muted ">
                    Forgot Your Password?{" "}
                    <Link to="/forgotpasswordpage">Forgot Password</Link>
                  </small>
                  <small className="text-muted ml-3">
                    Dont have an account? <Link to="/">Sign Up</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
