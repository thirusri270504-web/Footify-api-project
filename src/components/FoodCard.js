import React from "react";
import { Link } from "react-router-dom";

function FoodCard({ food }) {

  return (

    <div className="food-card">

      <img
        src={food.image}
        alt={food.name}
      />

      <div className="food-content">

        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-info">

          <span>⭐ {food.rating}</span>

          <span>₹{food.price}</span>

        </div>

        <Link
          className="view-btn"
          to={`/food/${food.id}`}
        >
          Customize
        </Link>

      </div>

    </div>

  );
}

export default FoodCard;