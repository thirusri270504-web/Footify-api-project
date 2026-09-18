import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodData from "../data/foodData.json";

// Only relevant extras for each category
const EXTRAS_BY_CATEGORY = {
  Biryani: ["Extra Egg", "Extra Chicken", "Extra Mutton", "Extra Paneer", "Extra Gravy", "Extra Rice"],
  Rice: ["Extra Egg", "Extra Chicken", "Extra Paneer", "Extra Gravy", "Extra Rice"],
  Dosa: ["Extra Egg", "Extra Cheese", "Extra Paneer", "Extra Chicken", "Extra Chutney", "Extra Sambar"],
  "Idli & Vada": ["Extra Sambar", "Extra Chutney", "Extra Egg"],
  Chicken: ["Extra Chicken", "Extra Egg", "Extra Gravy", "Extra Chicken 65"],
  Mutton: ["Extra Mutton", "Extra Gravy", "Extra Egg"],
  Seafood: ["Extra Gravy", "Extra Egg"],
  Vegetarian: ["Extra Paneer", "Extra Cheese", "Extra Gravy"],
  "Street Food": ["Extra Cheese", "Extra Chutney", "Extra Paneer"],
  Desserts: ["Extra Cheese"],
};

function FoodDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const food = foodData.foods.find((item) => item.id === Number(id));

  const [spice, setSpice] = useState("Medium");
  const [removed, setRemoved] = useState([]);
  const [extras, setExtras] = useState([]);

  // Filter extras by food category
  const availableExtras = useMemo(() => {
    if (!food) return [];
    const allowed = EXTRAS_BY_CATEGORY[food.category] || [];
    return foodData.customization.extraItems.filter((item) =>
      allowed.includes(item.name)
    );
  }, [food]);

  const handleRemove = (item) => {
    if (removed.includes(item)) {
      setRemoved(removed.filter((value) => value !== item));
    } else {
      setRemoved([...removed, item]);
    }
  };

  const handleExtra = (item) => {
    if (extras.some((e) => e.name === item.name)) {
      setExtras(extras.filter((value) => value.name !== item.name));
    } else {
      setExtras([...extras, item]);
    }
  };

  const extraTotal = extras.reduce((total, item) => total + item.price, 0);
  const finalPrice = food ? food.price + extraTotal : 0;

  const handleAddToCart = () => {
    const cartItem = {
      ...food,
      selectedSpice: spice,
      removedIngredients: removed,
      selectedExtras: extras,
      finalPrice: finalPrice,
    };

    addToCart(cartItem);
    navigate("/cart");
  };

  if (!food) {
    return <h2>Food not found</h2>;
  }

  return (
    <div className="details-page">
      {/* LEFT — Large Image */}
      <div className="details-image">
        <img src={food.image} alt={food.name} />
      </div>

      {/* RIGHT — Scrollable Customization */}
      <div className="details-content">
        <h1>{food.name}</h1>
        <p>{food.description}</p>
        <h2>₹{food.price}</h2>
        <p>⭐ {food.rating}</p>

        {/* SPICE */}
        <div className="custom-section">
          <h3>🌶️ Spice Level</h3>
          {foodData.customization.spiceLevels.map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="spice"
                value={level}
                checked={spice === level}
                onChange={(e) => setSpice(e.target.value)}
              />
              {level}
            </label>
          ))}
        </div>

        {/* REMOVE */}
        <div className="custom-section">
          <h3>❌ Remove Ingredients</h3>
          {foodData.customization.removeIngredients.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={removed.includes(item)}
                onChange={() => handleRemove(item)}
              />
              No {item}
            </label>
          ))}
        </div>

        {/* EXTRAS — only relevant ones */}
        <div className="custom-section">
          <h3>➕ Add Extra</h3>
          {availableExtras.length === 0 ? (
            <p style={{ color: "#888", fontSize: "14px" }}>
              No extra items for this dish.
            </p>
          ) : (
            availableExtras.map((item) => (
              <label key={item.name}>
                <input
                  type="checkbox"
                  checked={extras.some((e) => e.name === item.name)}
                  onChange={() => handleExtra(item)}
                />
                {item.name} +₹{item.price}
              </label>
            ))
          )}
        </div>

        <div className="final-price">Total: ₹{finalPrice}</div>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add Customized Food 🛒
        </button>
      </div>
    </div>
  );
}

export default FoodDetails;