import React, { useState, useEffect } from "react";
import "./Header.css";
import LoginModal from "../LoginModal/LoginModal";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser.email);
    }
  }, [darkMode]);

  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem("user", JSON.stringify({ email }));
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="logo-white.png" alt="logo" />
        <h1 className="logo">To-Do List</h1>
      </div>

        
      <div className="header-buttons">
        <span className="user-email">{user}</span>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
        
        {user ? (
          <>
            <button className="auth-button" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <button className="auth-button" onClick={() => setIsModalOpen(true)}>Войти</button>
        )}
      </div>

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />}
    </header>
  );
};

export default Header;
