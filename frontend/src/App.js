import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");

  const handleLoginClick = () => {
    setShowLoginCard(true);
  };

  const handleLogin = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setShowLoginCard(false);
  };

  return (
    <Router>
      <Navbar onLoginClick={handleLoginClick} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Navigate to="/log" />} />

        <Route
          path="/log"
          element={<Login showLoginCard={showLoginCard} onLogin={handleLogin} />}
        />

        <Route
          path="/main"
          element={token ? <Dashboard token={token} onUnauthorized={handleLogout} /> : <Navigate to="/log" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
