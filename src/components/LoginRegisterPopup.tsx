import React, { useEffect, useState } from "react";
import "./LoginRegisterPopup.css";
import { useForm } from "../hooks/formHooks";
import { RegisterCredentials } from "../types/LocalTypes";
import { useUser } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

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
  const { handleLogin } = useUserContext();
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const { postRegister, getEmailAvailable, getUsernameAvailable } = useUser();

  // not needed Formdata is gotten from inputs
  /*   const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  }); */

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Regex patterns for validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[A-Za-z]+$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  // validation needs changes to work better with the curernt implementation
  const validateField = (name: string, value: string) => {
    let error = "";

    if (value.length < 3) {
      error = "Must be at least 3 characters long";
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
          if (value !== inputs.password) error = "Passwords do not match";
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const initValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  // This post the registere form data
  // form data is created by useForm as inputs
  const doRegister = async () => {
    try {
      const inputRegister = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      };
      const registerResult = await postRegister(
        inputRegister as RegisterCredentials
      );
      console.log("doLogin result", registerResult);
      const inputLogin = {
        username: inputs.username,
        password: inputs.password,
      };
      handleLogin(inputLogin);
      onClose();
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const doLogin = async () => {
    const inputLogin = {
      username: inputs.username,
      password: inputs.password,
    };
    handleLogin(inputLogin);
  };

  const pointer = type === "register" ? doRegister : doLogin;
  const { handleSubmit, handleInputChange, inputs } = useForm(
    pointer,
    initValues
  );

  // the useEffect functions need to be implemented better and reassesed for practicality
  useEffect(() => {
    const main = async () => {
      if (inputs.username.length < 3) return;
      const tulos = await getUsernameAvailable(inputs.username);
      if (!tulos) return;
      setUsernameAvailable(tulos.available as boolean);
    };
    if (inputs.username.length != 0) validateField("username", inputs.username);
    main();
  }, [inputs.username]);

  useEffect(() => {
    const main = async () => {
      if (inputs.email.length < 5) return;
      const tulos = await getEmailAvailable(inputs.email);
      if (!tulos) return;
      setEmailAvailable(tulos.available as boolean);
    };
    validateField("email", inputs.email);
    main();
  }, [inputs.email]);

  useEffect(() => {
    validateField("password", inputs.password);
  }, [inputs.password]);

  useEffect(() => {
    validateField("confirmPassword", inputs.confirmPassword);
  }, [inputs.confirmPassword]);

  // Register works
  // Recomend making different components for forms to enhance readability and implementation
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
                /* value={formData.email} */
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
              {!emailAvailable && <p className="error">Email already in use</p>}
            </>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            /* value={formData.username} */
            onChange={handleInputChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
          {!usernameAvailable && (
            <p className="error">Username not available</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            /* value={formData.password} */
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {type === "register" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                /* value={formData.confirmPassword} */
                onChange={handleInputChange}
                required
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
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
