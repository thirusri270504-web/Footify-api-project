import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function OrderFeedback({ lastOrder, setOrders, orders }) {
  const navigate = useNavigate();

  const [rating, setRating] = useState("5");
  const [comfort, setComfort] = useState("Yes");
  const [customization, setCustomization] = useState("Easy");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lastOrder) navigate("/orders");
  }, [lastOrder, navigate]);

  if (!lastOrder) return null;

  const foodNames = lastOrder.items.map((i) => i.name).join(", ");
  const totalAmount = lastOrder.items.reduce(
    (sum, i) => sum + Number(i.finalPrice || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!lastOrder.userEmail) {
      alert("Customer email is missing.");
      return;
    }

    setLoading(true);

    const feedbackData = {
      rating,
      comfort,
      customization,
      suggestion: suggestion || "No suggestion",
      date: new Date().toLocaleDateString(),
    };

    const updatedOrders = orders.map((order) =>
      order.id === lastOrder.id ? { ...order, feedback: feedbackData } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("foodify_orders", JSON.stringify(updatedOrders));

    const templateParams = {
      user_name: lastOrder.userEmail?.split("@")[0] || "Customer",
      user_email: lastOrder.userEmail,
      order_id: lastOrder.id,
      food_items: foodNames,
      total: totalAmount,
      rating,
      comfort,
      customization,
      suggestion: suggestion || "No suggestion",
    };

    const SERVICE_ID = "service_9r7dw8n";
    const USER_TEMPLATE_ID = "template_pxvk1or";
    const ADMIN_TEMPLATE_ID = "template_0wre3mk";
    const PUBLIC_KEY = "w49uQJUhvnf1AvhmV";

    try {
      await emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSubmitted(true);
      setTimeout(() => navigate("/orders"), 2500);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Feedback saved, but emails failed to send. Check the console.");
      setSubmitted(true);
      setTimeout(() => navigate("/orders"), 2500);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page" style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>Thank you for your feedback! 🎉</h1>
        <p>Your order confirmation has been sent to:</p>
        <strong>{lastOrder.userEmail}</strong>
        <p style={{ marginTop: "20px" }}>
          Order details have also been sent to the admin.
        </p>
        <p>Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Order Feedback 📝</h1>
      <p>Please rate your recent order</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Order ID</label>
          <input type="text" value={lastOrder.id} disabled />
        </div>

        <div className="form-group">
          <label>Customer Email</label>
          <input type="email" value={lastOrder.userEmail} disabled />
        </div>

        <div className="form-group">
          <label>Food Items</label>
          <input type="text" value={foodNames} disabled />
        </div>

        <div className="form-group">
          <label>Total Amount</label>
          <input type="text" value={`₹${totalAmount}`} disabled />
        </div>

        <div className="form-group">
          <label>Overall Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Bad</option>
          </select>
        </div>

        <div className="form-group">
          <label>Was the ordering process comfortable?</label>
          <select value={comfort} onChange={(e) => setComfort(e.target.value)}>
            <option value="Yes">Yes, very comfortable</option>
            <option value="Okay">It was okay</option>
            <option value="No">No, it was difficult</option>
          </select>
        </div>

        <div className="form-group">
          <label>How was the customization process?</label>
          <select
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
          >
            <option value="Easy">Very Easy</option>
            <option value="Okay">Okay</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>

        <div className="form-group">
          <label>Any suggestions for us?</label>
          <textarea
            rows="4"
            placeholder="Write your suggestions here..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending Emails..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default OrderFeedback;