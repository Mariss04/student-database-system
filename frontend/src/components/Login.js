import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ showLoginCard }) {
  const [email, setEmail] = useState("mari@gmail.com");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (showLoginCard) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [showLoginCard]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    navigate("/main");
  };

  return (
    <div className="login-page">
      {/* BACKGROUND CONTENT */}
      <div className={showLoginCard ? "login-bg blur-bg" : "login-bg"}>
        <h1 className="fw-bold text-dark mb-3">Welcome Admin 👋</h1>
        <p className="text-muted fs-5">
          Click the <b>Login</b> Add the Students Database to continue.
        </p>
      </div>

      {/* LOGIN CARD */}
      {showLoginCard && (
        <div ref={cardRef} className="login-box login-animate shadow-lg">
          <h2 className="text-center fw-bold mb-4">Admin Login</h2>

          <form onSubmit={handleLogin}>
            <label className="fw-semibold">Email</label>
            <input
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-success w-100 fw-bold">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
