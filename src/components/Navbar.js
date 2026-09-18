import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ cartCount, currentUser, setCurrentUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? { color: "#e85d04" } : {};

  const handleLogout = () => {
    localStorage.removeItem("foodify_currentUser");
    setCurrentUser(null);
    setShowMenu(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
  <Link
    to={currentUser?.role === "admin" ? "/admin" : "/home"}
    style={{ color: "inherit", display: "flex", alignItems: "center" }}
  >
    <img
      src="/logo_navbar.png"
      alt="Foodify"
      style={{
        height: "52px",
        width: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  </Link>
</div>

      <div className="nav-links">
        {currentUser?.role === "admin" ? (
          <>
            <Link to="/admin" style={isActive("/admin")}>
              Admin Panel
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" style={isActive("/home")}>
              Home
            </Link>
            <Link to="/foods" style={isActive("/foods")}>
              Foods
            </Link>
            <Link to="/orders" style={isActive("/orders")}>
              Orders
            </Link>
            <Link to="/feedback" style={isActive("/feedback")}>
              Feedback
            </Link>
            <Link to="/cart" style={isActive("/cart")}>
              🛒 Cart ({cartCount})
            </Link>
          </>
        )}

        {currentUser && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: "none",
                border: "1px solid #e85d04",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                color: "#e85d04",
                fontWeight: "bold",
              }}
            >
              {currentUser.name} ▼
            </button>

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "40px",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  minWidth: "160px",
                  zIndex: 100,
                }}
              >
                <p
                  style={{
                    padding: "10px 15px",
                    margin: 0,
                    borderBottom: "1px solid #eee",
                    fontSize: "13px",
                  }}
                >
                  {currentUser.name}
                </p>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#d00000",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;