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
    if (!lastOrder) {
      navigate("/orders");
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) {
    return null;
  }

  const foodNames = lastOrder.items
    .map((item) => item.name)
    .join(", ");

  const totalAmount = lastOrder.items.reduce(
    (sum, item) => sum + Number(item.finalPrice || 0),
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

    // Save feedback
    const feedbackData = {
      rating,
      comfort,
      customization,
      suggestion: suggestion || "No suggestion",
      date: new Date().toLocaleDateString(),
    };

    const updatedOrders = orders.map((order) =>
      order.id === lastOrder.id
        ? {
            ...order,
            feedback: feedbackData,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "foodify_orders",
      JSON.stringify(updatedOrders)
    );

    // EmailJS data
    const templateParams = {
      user_name:
        lastOrder.userEmail?.split("@")[0] || "Customer",
      user_email: lastOrder.userEmail,
      order_id: lastOrder.id,
      food_items: foodNames,
      total: totalAmount,
      rating,
      comfort,
      customization,
      suggestion: suggestion || "No suggestion",
    };

    // EmailJS configuration
    const SERVICE_ID = "service_mnw0u8l";
    const USER_TEMPLATE_ID = "template_xmjsah6";
    const ADMIN_TEMPLATE_ID = "template_hxw7abj";
    const PUBLIC_KEY = "qiMhOY9JjpLLoO8sf";

    try {
      // Send email to customer
      await emailjs.send(
        SERVICE_ID,
        USER_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // Small delay before admin email
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      // Send email to admin
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // Both emails successful
      alert(
        "✅ Feedback submitted successfully!\n\n" +
        "Customer confirmation email sent.\n" +
        "Admin notification email sent."
      );

      setSubmitted(true);

      setTimeout(() => {
        navigate("/orders");
      }, 2500);
    } catch (error) {
      // Email failed
      if (error?.text) {
        alert(`❌ Email sending failed.\n\n${error.text}`);
      } else {
        alert(
          "❌ Feedback was saved, but email sending failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="page"
        style={{
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <h1>
          Thank you for your feedback! 🎉
        </h1>

        <p>
          Your order confirmation has been sent to:
        </p>

        <strong>
          {lastOrder.userEmail}
        </strong>

        <p style={{ marginTop: "20px" }}>
          Order details have also been sent to the admin.
        </p>

        <p>
          Redirecting to your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>Order Feedback 📝</h1>

      <p>Please rate your recent order</p>

      <form
        className="feedback-form"
        onSubmit={handleSubmit}
      >

        {/* Order ID */}

        <div className="form-group">
          <label>Order ID</label>

          <input
            type="text"
            value={lastOrder.id}
            disabled
          />
        </div>

        {/* Customer Email */}

        <div className="form-group">
          <label>Customer Email</label>

          <input
            type="email"
            value={lastOrder.userEmail}
            disabled
          />
        </div>

        {/* Food Items */}

        <div className="form-group">
          <label>Food Items</label>

          <input
            type="text"
            value={foodNames}
            disabled
          />
        </div>

        {/* Total Amount */}

        <div className="form-group">
          <label>Total Amount</label>

          <input
            type="text"
            value={`₹${totalAmount}`}
            disabled
          />
        </div>

        {/* Rating */}

        <div className="form-group">
          <label>Overall Rating</label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >
            <option value="5">
              ⭐⭐⭐⭐⭐ Excellent
            </option>

            <option value="4">
              ⭐⭐⭐⭐ Good
            </option>

            <option value="3">
              ⭐⭐⭐ Average
            </option>

            <option value="2">
              ⭐⭐ Poor
            </option>

            <option value="1">
              ⭐ Very Bad
            </option>
          </select>
        </div>

        {/* Ordering Experience */}

        <div className="form-group">
          <label>
            Was the ordering process comfortable?
          </label>

          <select
            value={comfort}
            onChange={(e) =>
              setComfort(e.target.value)
            }
          >
            <option value="Yes">
              Yes, very comfortable
            </option>

            <option value="Okay">
              It was okay
            </option>

            <option value="No">
              No, it was difficult
            </option>
          </select>
        </div>

        {/* Customization */}

        <div className="form-group">
          <label>
            How was the customization process?
          </label>

          <select
            value={customization}
            onChange={(e) =>
              setCustomization(e.target.value)
            }
          >
            <option value="Easy">
              Very Easy
            </option>

            <option value="Okay">
              Okay
            </option>

            <option value="Difficult">
              Difficult
            </option>
          </select>
        </div>

        {/* Suggestion */}

        <div className="form-group">
          <label>
            Any suggestions for us?
          </label>

          <textarea
            rows="4"
            placeholder="Write your suggestions here..."
            value={suggestion}
            onChange={(e) =>
              setSuggestion(e.target.value)
            }
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading
            ? "Sending Emails..."
            : "Submit Feedback"}
        </button>

      </form>
    </div>
  );
}

export default OrderFeedback;