import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function WelcomePage() {
    const navigate = useNavigate();
  const verifyEmail = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      alert("No token found");
      return;
    }
    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: token,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD05UV-fq-o76VjeAcMGXYaG9RJDvESYyo",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Verification email sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/loginpage");
  }
  return (
    <div className="container text-center d-flex flex-column align-items-center">
      <div>Welcome to Tracker App</div>
      <div className="mt-4 mb-4">
        <button onClick={verifyEmail} className="btn btn-primary">
          Verify Your Email
        </button>
      </div>
      <div className="mb-4">
        Your Profile is Incomplete
        <Link to="/profilepage" className="ms-2">
          Complete Now
        </Link>
      </div>
      <Link to="/loginpage">Login Page</Link>
      <button onClick={logoutUser} className="btn btn-danger">
          Logout
        </button>
    </div>

  );
}

export default WelcomePage;
