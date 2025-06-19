import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();

  // Step 1: Create state for form values
  const [LoginformData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // Step 2: State for error messages
  const [errorMessages, setErrorMessages] = useState([]);

  // Step 3: Handle input changes
  const handleChange = (e) => {
    setLoginFormData({ ...LoginformData, [e.target.name]: e.target.value });
  };

  // Step 4: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]); // Clear previous errors before submitting

    try {
      const response = await axios.post(
        "http://localhost:3000/api/loginuser",
        LoginformData,
        { withCredentials : true }
      );
      console.log("User exist:", response.data);
      const {accessToken,email} = response.data

      localStorage.setItem('UserEmail', email)
      localStorage.setItem("accessToken",accessToken)
      // You can show success message or redirect here
      console.log("Navigating to home");
      
      navigate("/");
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 400) {
          // Handle validation errors from backend
          const validationErrors = err.response.data.errors || [];
          setErrorMessages(validationErrors);
        } else if (status === 404) {
          // Handle authentication errors from backend
          setErrorMessages([{ msg: "User not exist" }]);
        }  else if (status === 401) {
          // Handle authentication errors from backend
          setErrorMessages([{ msg: "User credentials not valid" }]);
        } 

        // Clear errors after 5 seconds
        setTimeout(() => {
          setErrorMessages([]);
        }, 5000);
      } else {
        // Handle other types of errors (network issues, etc.)
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again later.");
      }
    }

    // Clear the form data after submitting
    setLoginFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <h3 className="text-center mt-5">Login here</h3>
      <div className="container mt-4">
        {/* Display validation errors */}
        {errorMessages.length > 0 && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <strong className="me-auto">Error!</strong>
            </div>
            <ul className="list-unstyled mb-0">
              {errorMessages.map((error, index) => (
                <li key={index} className="d-flex align-items-center gap-2">
                  <i className="bi bi-dash-circle fs-6 text-danger"></i>
                  {error.msg}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={LoginformData.email}
              onChange={handleChange}
              required
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={LoginformData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}
