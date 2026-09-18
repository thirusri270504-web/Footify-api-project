import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Admin login
    if (email === "admin@foodify.com" && password === "admin123") {
      const adminUser = {
        name: "Admin",
        email: "admin@foodify.com",
        role: "admin",
      };
      localStorage.setItem("foodify_currentUser", JSON.stringify(adminUser));
      setCurrentUser(adminUser);
      navigate("/admin");
      return;
    }

    // Normal user login
    const users = JSON.parse(localStorage.getItem("foodify_users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("foodify_currentUser", JSON.stringify(user));
      setCurrentUser(user);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>🍴 Foodify</h1>
        <h2>Welcome Back!</h2>
        <p>Login to order your favorite food</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#e85d04" }}>
            Register
          </Link>
        </p>

        <p style={{ marginTop: "10px", textAlign: "center", fontSize: "13px", color: "#666" }}>
          Admin Login: admin@foodify.com / admin123
        </p>
      </form>
    </div>
  );
}

export default Login;