import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:1000/api";

function Login({ showLoginCard, onLogin }) {
  const [email, setEmail] = useState("mari@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (showLoginCard) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [showLoginCard]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Login API is not returning JSON. Please check that the backend is running on port 1000.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLogin(data.token);
      navigate("/main");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
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

            <button className="btn btn-success w-100 fw-bold" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
