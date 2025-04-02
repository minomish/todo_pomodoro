import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });

  const handleLogin = () => {
    const emailEmpty = !email.trim();
    const passwordEmpty = !password.trim();

    if (emailEmpty || passwordEmpty) {
      setError({ email: emailEmpty, password: passwordEmpty });
    } else {
      onLogin(email);
      setError({ email: false, password: false });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        <input
          type="email"
          placeholder="Email"
          className={`modal-input ${error.email ? "error" : ""}`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError({ ...error, email: false });
          }}
        />
        <input
          type="password"
          placeholder="Пароль"
          className={`modal-input ${error.password ? "error" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError({ ...error, password: false });
          }}
        />
        <button className="modal-button" onClick={handleLogin}>
          Войти
        </button>
        <button className="modal-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
