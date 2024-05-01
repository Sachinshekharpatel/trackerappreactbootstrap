import React from "react";
import "./App.css";
import SignUpPage from "./signupPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./loginpage";
import WelcomePage from "./welcomePage";
import Profilepage from "./profilepage";
import {Fragment} from "react";
import ForgotPasswordPage from "./forgotpasswordpage";
function App() {
  return (
    <Fragment>
      <h1 className="text-center">Learn React with Tracker App</h1>
      <Router>
        <div>
          <Routes>
            <Route path="/forgotpasswordpage" element={<ForgotPasswordPage />} />
            <Route path="/" element={<SignUpPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/profilepage" element={<Profilepage />} />
            <Route path="/welcomepage" element={<WelcomePage />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
