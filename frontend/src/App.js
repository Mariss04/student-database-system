import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleLoginClick = () => {
    setShowLoginCard(true);
  };

  return (
    <Router>
      <Navbar onLoginClick={handleLoginClick} />

      <Routes>
        <Route path="/" element={<Navigate to="/log" />} />

        <Route
          path="/log"
          element={<Login showLoginCard={showLoginCard} />}
        />

        <Route path="/main" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
