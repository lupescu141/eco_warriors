import React, { useState } from "react";
import "./LoginRegisterPopup.css";

interface PopupProps {
  type: "login" | "register";
  onClose: () => void;
  onSwitch: () => void;
}

const LoginRegisterPopup: React.FC<PopupProps> = ({
  type,
  onClose,
  onSwitch,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Regex patterns for validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[A-Za-z]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const validateField = (name: string, value: string) => {
    let error = "";

    if (value.length < 5) {
      error = "Must be at least 5 characters long";
    } else {
      switch (name) {
        case "email":
          if (!emailPattern.test(value)) error = "Invalid email format";
          break;
        case "username":
          if (!usernamePattern.test(value))
            error = "Username can only contain letters (A-Z, a-z)";
          break;
        case "password":
          if (!passwordPattern.test(value))
            error =
              "Password must have an uppercase letter, a number, and a special character";
          break;
        case "confirmPassword":
          if (value !== formData.password)
            error = "Passwords do not match";
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there are any validation errors
    const hasErrors =
      Object.values(errors).some((err) => err !== "") ||
      Object.values(formData).some((val) => val.length < 5);

    if (hasErrors) {
      alert("Please fix the errors before submitting");
      return;
    }

    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="popup-header">
          {type === "login" ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
          {type === "register" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </>
          )}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <button className="switch-btn" onClick={onSwitch}>
          {type === "login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
