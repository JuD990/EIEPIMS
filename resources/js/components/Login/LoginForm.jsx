import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/LoginForm.css";
import uncLogo from "@assets/unc-logo.png";
import systemLogo from "@assets/system-logo.png";
import userIcon from "@assets/user.png";
import eyeIcon from "@assets/eye-icon.png";
import eyeOffIcon from "@assets/eye-off-icon.png";
import dropdownLogo from "@assets/dropdown-logo-login.png";
import loginBGimage from "@assets/login-bg-image.png";
import apiService from "../../../services/apiServices";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch CSRF Token
  const getCsrfToken = async () => {
    try {
      await apiService.get('/sanctum/csrf-cookie');
    } catch (err) {
      console.error("CSRF token fetch error: ", err);
      setError("Failed to fetch CSRF token. Please try again.");
    }
  };

// Handle form submission
const handleLogin = async (event) => {
  event.preventDefault();

  // Basic frontend validation to check if any field is empty
  if (!email || !password || !userType) {
    setError("Please enter all the credentials.");
    return;
  }

  // Map user types to their respective database tables
  const userTypeToTableMap = {
    'Student': 'students',
    'College POC': 'college_pocs',
    'Lead EIE POC': 'lead_pocs',
    'Head EIE POC': 'eie_heads',
    'ESL Prime': 'esl_prime',
    'ESL Champion': 'esl_champion',
  };

  const table = userTypeToTableMap[userType];

  try {
    // Fetch CSRF Token before logging in
    await getCsrfToken();

    const response = await apiService.post(`/login`, {
      email: `${email}@unc.edu.ph`, // Append domain to email
      password: password,
      user_type: table, // Include the user type in the request
    });

    // Handle successful login
    if (response.status === 200) {
      console.log("Login Successful: ", response.data);
      const { token } = response.data;

      // Store token
      localStorage.setItem("authToken", token);

      // Navigate based on user type
      switch (userType) {
        case "Student":
          navigate("/student-dashboard");
          break;
        case "College POC":
          navigate("/college-poc-dashboard");
          break;
        case "Lead EIE POC":
          navigate("/lead-eie-poc-dashboard");
          break;
        case "Head EIE POC":
          navigate("/head-eie-poc-dashboard");
          break;
        case "ESL Prime":
          navigate("/esl-prime-dashboard");
          break;
        case "ESL Champion":
          navigate("/esl-champion-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  } catch (error) {
    console.error("Login failed: ", error);
    // Check for specific error response status
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError("Invalid credentials, please try again.");
          break;
        case 405:
          setError("Method not allowed. Please check your request method.");
          break;
        case 500:
          setError("Internal server error. Please try again later.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
      }
    } else if (error.request) {
      setError("No response from server. Please try again later.");
    } else {
      setError("Error: " + error.message);
    }
  }
};


  return (
    <div
    className="login-container"
    style={{
      backgroundImage: `url(${loginBGimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
    }}
    >
      <div className="logos">
        <img className="unc-logo" src={uncLogo} alt="UNC Logo" />
        <img className="system-logo" src={systemLogo} alt="System Logo" />
      </div>
      <h1 className="main-title">
      <span className="eie" title="English Immersive Environment">EIE</span> Program Implementation Management System
      </h1>
      <h2 className="subtitle">Please enter your credentials</h2>
      <form className="login-form" onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group dropdown-container">
          <label className="form-label">Login As:</label>
          <select
            className="dropdown"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="College POC">College POC</option>
            <option value="Lead EIE POC">Lead EIE POC</option>
            <option value="Head EIE POC">Head EIE POC</option>
            <option value="ESL Prime">ESL Prime</option>
            <option value="ESL Champion">ESL Champion</option>
          </select>
          <img className="dropdown-logo" src={dropdownLogo} alt="Dropdown Logo" />
        </div>

        <div className="form-group email-input-container">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="email-domain">
            <span>@unc.edu.ph</span>
            <img className="user-icon" src={userIcon} alt="User Icon" />
          </div>
        </div>

        <div className="form-group password-input-container">
          <label className="form-label">Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="toggle-password-icon"
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt="Toggle Password Visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <div className="forgot-password-container">
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
