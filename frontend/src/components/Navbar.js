import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ onLoginClick, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/main";
  const isLoginPage = location.pathname === "/log";

  const handleLogout = () => {
    onLogout();
    navigate("/log");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
      <Link to="/log" className="navbar-brand fw-bold fs-4">
        📚 Student Database System
      </Link>

      <div className="d-flex gap-3 align-items-center">
        {isDashboard ? (
          <>
            <Link to="/main" className="nav-link text-white fw-semibold">
              📌 Dashboard
            </Link>

            <button className="btn btn-outline-light fw-semibold" onClick={handleLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          isLoginPage && (
            <button
              className="btn btn-success fw-semibold"
              onClick={onLoginClick}
            >
              🔐 Login
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
