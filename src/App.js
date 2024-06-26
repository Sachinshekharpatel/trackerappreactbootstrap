import React from "react";
import "./App.css";
import SignUpPage from "./signupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./loginpage";
import WelcomePage from "./welcomePage";
import Profilepage from "./profilepage";
import ForgotPasswordPage from "./forgotpasswordpage";
//deployed link https://sachinsteps.netlify.app/ 
function App() {
  return (
    <>
     
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
    </>
  );
}

export default App;
