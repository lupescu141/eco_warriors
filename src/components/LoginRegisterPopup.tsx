import React from "react";
import "./LoginRegisterPopup.css";

interface PopupProps {
  type: "login" | "register";
  onClose: () => void;
  onSwitch: () => void;
}

const LoginRegisterPopup: React.FC<PopupProps> = ({ type, onClose, onSwitch }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{type === "login" ? "Login" : "Register"}</h2>
        <form>
          {type === "register" && <input type="email" placeholder="Email" required />}
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          {type === "register" && <input type="password" placeholder="Confirm Password" required />}
          <button type="submit" className="submit-btn" onClick={onClose}>Submit</button>
        </form>
        <button className="switch-btn" onClick={onSwitch}>
          {type === "login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
