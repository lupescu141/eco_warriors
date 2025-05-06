import React, { useEffect, useState } from "react";
import "./LoginRegisterPopup.css";
import { useForm } from "../hooks/formHooks";
import { RegisterCredentials } from "ecwtypes/LocalTypes";
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
  /*   
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true); 
  */
  const { postRegister, getEmailAvailable, getUsernameAvailable } = useUser();

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
      handleLogin(inputLogin, onClose);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const doLogin = async () => {
    const inputLogin = {
      username: inputs.username,
      password: inputs.password,
    };
    handleLogin(inputLogin, onClose);
  };

  // a cursed way to swithc callback function pointer
  const pointer = type === "register" ? doRegister : doLogin;
  const { handleSubmit, handleInputChange, inputs } = useForm(
    pointer,
    initValues
  );

  //
  // checks username regex and availability
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let error = "";
      if (inputs.username.length == 0) {
        error = "";
      } else if (inputs.username.length < 3) {
        error = "Must be at least 3 characters long";
      } else if (usernamePattern.test(inputs.username)) {
        const tulos = await getUsernameAvailable(inputs.username);
        /* setUsernameAvailable(tulos.available as boolean); */
        if (!tulos.available) error = "Username not available";
      } else {
        error = "Username can only contain letters (A-Z, a-z)";
      }
      setErrors((prevErrors) => ({ ...prevErrors, ["username"]: error }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputs.username]);

  //
  // Checks email regex and availability
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let error = "";
      if (inputs.email.length == 0) {
        error = "";
      } else if (inputs.email.length < 3) {
        error = "Must be at least 3 characters long";
      } else if (emailPattern.test(inputs.email)) {
        const tulos = await getEmailAvailable(inputs.email);
        /* setEmailAvailable(tulos.available as boolean); */
        if (!tulos.available) error = "Email not available";
      } else {
        error = "Invalid email format";
      }
      setErrors((prevErrors) => ({ ...prevErrors, ["email"]: error }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputs.email]);

  //
  // Checks password regex
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let error = "";
      if (inputs.password.length == 0) {
        error = "";
      } else if (inputs.password.length < 3) {
        error = "Must be at least 3 characters long";
      } else if (!passwordPattern.test(inputs.password))
        error =
          "Password must have an uppercase letter, a number, and a special character";
      setErrors((prevErrors) => ({ ...prevErrors, ["password"]: error }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputs.password]);

  //
  // Checks confirmPassword
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let error = "";
      if (inputs.confirmPassword.length == 0) {
        error = "";
      } else if (inputs.confirmPassword !== inputs.password)
        error = "Passwords do not match";
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["confirmPassword"]: error,
      }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputs.confirmPassword]);

  //
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
                onChange={handleInputChange}
                required
              />
              {<p className="error">{errors.email}</p>}
            </>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            required
          />
          {<p className="error">{errors.username}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          {<p className="error">{errors.password}</p>}

          {type === "register" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
              />
              {<p className="error">{errors.confirmPassword}</p>}
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
