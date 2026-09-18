import React, { useEffect, useState } from "react";

import foodData from "../data/foodData.json";

import FoodCard from "../components/FoodCard";

function Foods() {

  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {

    setFoods(foodData.foods);

  }, []);

  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesSearch && matchesCategory;

  });

  return (

    <div className="page">

      <h1>Explore Foods 🍽️</h1>

      <p>
        Find your favorite food and customize it.
      </p>


      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* CATEGORY FILTER */}

      <div className="filters">

        <button
          onClick={() => setCategory("All")}
        >
          All
        </button>

        {foodData.categories.map((item) => (

          <button
            key={item.id}
            onClick={() => setCategory(item.name)}
          >
            {item.name}
          </button>

        ))}

      </div>


      {/* FOOD LIST */}

      <div className="food-grid">

        {filteredFoods.length > 0 ? (

          filteredFoods.map((food) => (

            <FoodCard
              key={food.id}
              food={food}
            />

          ))

        ) : (

          <h2>No food found 😔</h2>

        )}

      </div>

    </div>

  );
}

export default Foods;