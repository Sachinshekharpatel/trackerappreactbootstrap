import React from "react";
import "./App.css";
import SignUpPage from "./signupPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./loginpage";
import WelcomePage from "./welcomePage";
function App() {
  return (
    <>
      <h1 className="text-center">Tracker App</h1>
      <Router>
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/welcomepage">Welcome Page</Link>
            </li>
          </ul>
        </nav>
          <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/welcomepage" element={<WelcomePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
