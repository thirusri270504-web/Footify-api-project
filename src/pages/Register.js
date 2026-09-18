import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("foodify_users")) || [];

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("Email already registered! Please login.");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user", // normal user
    };

    users.push(newUser);
    localStorage.setItem("foodify_users", JSON.stringify(users));

    alert("Account created successfully! Please login.");
    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleRegister}>
        <h1>🍴 Foodify</h1>
        <h2>Create Account</h2>
        <p>Register to order your favorite food</p>

        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#e85d04" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;