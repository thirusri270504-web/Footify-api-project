import React, { useState, useEffect } from "react";

function Feedback() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [success, setSuccess] = useState(false);

  // Load existing feedbacks
  useEffect(() => {
    const saved = localStorage.getItem("foodify_feedbacks");
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Please fill your name and message");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name,
      rating,
      message,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("foodify_feedbacks", JSON.stringify(updated));

    // Reset form
    setName("");
    setRating("5");
    setMessage("");
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page">
      <h1>Customer Feedback 💬</h1>
      <p>We would love to hear your thoughts about Foodify!</p>

      {/* Success Message */}
      {success && (
        <div className="toast" style={{ position: "relative", top: 0, right: 0, margin: "20px 0" }}>
          Thank you for your feedback! 🎉
        </div>
      )}

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Bad</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Message</label>
          <textarea
            rows="4"
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>

      {/* Show previous feedbacks */}
      <div className="feedback-list">
        <h2>Recent Feedbacks</h2>

        {feedbacks.length === 0 ? (
          <p>No feedbacks yet. Be the first one!</p>
        ) : (
          feedbacks.map((item) => (
            <div key={item.id} className="feedback-card">
              <div className="feedback-header">
                <strong>{item.name}</strong>
                <span>{"⭐".repeat(Number(item.rating))}</span>
              </div>
              <p>{item.message}</p>
              <small>{item.date}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedback;