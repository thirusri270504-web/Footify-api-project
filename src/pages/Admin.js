import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ currentUser }) {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    // Only admin can access
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("foodify_orders")) || [];
    setAllOrders(savedOrders);
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return (
    <div className="page">
      <h1>Admin Panel 🛠️</h1>
      <p>All Users Orders & Feedback</p>

      {allOrders.length === 0 ? (
        <div className="empty-cart">
          <h2>No orders yet.</h2>
          <p>Orders from users will appear here.</p>
        </div>
      ) : (
        allOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2>Order #{order.id}</h2>
            <p><strong>User Email:</strong> {order.userEmail || "Unknown"}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <div style={{ margin: "12px 0" }}>
              <strong>Food Items:</strong>
              {order.items.map((item, index) => (
                <p key={index}>
                  🍴 {item.name} — ₹{item.finalPrice}
                </p>
              ))}
            </div>

            {/* Feedback Section */}
            {order.feedback ? (
              <div
                style={{
                  background: "#f0fdf4",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <p><strong>Rating:</strong> {"⭐".repeat(Number(order.feedback.rating))}</p>
                <p><strong>Ordering Experience:</strong> {order.feedback.comfort}</p>
                <p><strong>Customization:</strong> {order.feedback.customization}</p>
                {order.feedback.suggestion && (
                  <p><strong>Suggestion:</strong> {order.feedback.suggestion}</p>
                )}
              </div>
            ) : (
              <p style={{ color: "#e85d04" }}>Feedback not given yet</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;