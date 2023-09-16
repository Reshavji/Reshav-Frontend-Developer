import React, { useRef, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { Dialog } from '@material-ui/core';
import "./Signup.css";
import Signup from "./Signup";

function Login({ handleCloseLoginModal }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store login error message
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const containerRef = useRef();

  const handleLogin = () => {
    setError("");
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User logged in successfully!");
        setLoggedIn(true); // Set login status to true
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again."); // Display login error
        console.error("Error logging in:", error);
      });
  };

  // Close the dialog box when the user is successfully logged in
  useEffect(() => {
    if (loggedIn) {
      handleCloseLoginModal();
    }
  }, [loggedIn, handleCloseLoginModal]);

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Log In</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <div className="popup-btn">
          <button className="submit-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
        <span className="signup-link">New to Xpert?  </span>
        <span className="link-form" onClick={handleLoginButtonClick}>Sign Up</span>
        <div ref={containerRef} className="login__container">
         
        </div>
      </div>
      <Dialog open={showLoginModal} onClose={handleCloseLoginModal}>
       <Signup handleCloseLoginModal={handleCloseLoginModal}  />
      </Dialog>
    </div>
  );
}

export default Login;