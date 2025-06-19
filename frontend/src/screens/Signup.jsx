import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();

  // Step 1: Create state for form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  // Step 2: State for error messages
  const [errorMessages, setErrorMessages] = useState([]);

  // Step 3: Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 4: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]); // Clear previous errors before submitting

    try {
      const response = await axios.post('http://localhost:3000/api/createuser', formData,
        {withCredentials:true}
      );
      console.log("User created:", response.data);
       const {accessToken, email} = response.data
       
        // Save to localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('UserEmail', email);

    // Navigate to homepage
    navigate('/');
      // You can show success message or redirect here
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Handle validation errors from backend
        const validationErrors = err.response.data.errors || [];
        setErrorMessages(validationErrors);
      
         // Clear errors after 5 seconds
         setTimeout(() => {
            setErrorMessages([]);
          }, 3000); // 5000 milliseconds = 5 seconds
    } else {
        // Handle other types of errors (network issues, etc.)
        console.error("Unexpected error:", err);
        alert('An unexpected error occurred. Please try again later.');
      }
    }

    // Clear the form data after submitting
    setFormData({
      name: '',
      email: '',
      password: '',
      location: '',
    });
  };

  return (
    <>
    <h3 className="text-center mt-5">Sign Up here</h3>
    <div className="container mt-4">
      {/* Display validation errors */}
      {errorMessages.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errorMessages.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <Link to="/login" className="m-3 btn btn-danger">
          Already a user!
        </Link>
      </form>
    </div>
    </>
  );
}
