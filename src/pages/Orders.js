import React from "react";

function Orders({ orders, currentUser }) {
  // Filter only current user's orders
  const userOrders = orders.filter(
    (order) => order.userEmail === currentUser?.email
  );

  return (
    <div className="page">
      <h1>My Orders 📦</h1>

      {userOrders.length === 0 ? (
        <div className="empty-cart">
          <h2>No orders yet.</h2>
          <p>Your completed orders will appear here.</p>
        </div>
      ) : (
        userOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Date: {order.date}</p>
            <p>Status: {order.status}</p>

            <div style={{ margin: "15px 0" }}>
              {order.items.map((item, index) => (
                <p key={index}>
                  🍴 {item.name} — ₹{item.finalPrice}
                </p>
              ))}
            </div>

            {order.feedback ? (
              <div
                style={{
                  background: "#f0fdf4",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "15px",
                }}
              >
                <p><strong>Your Rating:</strong> {"⭐".repeat(Number(order.feedback.rating))}</p>
                <p><strong>Ordering Experience:</strong> {order.feedback.comfort}</p>
                <p><strong>Customization:</strong> {order.feedback.customization}</p>
                {order.feedback.suggestion && (
                  <p><strong>Suggestion:</strong> {order.feedback.suggestion}</p>
                )}
              </div>
            ) : (
              <p style={{ color: "#e85d04", marginTop: "10px" }}>
                Feedback not given yet
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;