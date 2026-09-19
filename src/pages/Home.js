import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import foodData from "../data/foodData.json";

function Home() {
  const [apiMeals, setApiMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError("");

        const categories = [
          "Chicken",
          "Seafood",
          "Vegetarian",
          "Dessert",
          "Pasta",
          "Breakfast",
        ];

        const allMeals = [];

        for (const category of categories) {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/filter.php?c=${category}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch meals");
          }

          const data = await response.json();

          if (data.meals) {
            const limitedMeals = data.meals
              .slice(0, 6)
              .map((meal) => ({
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                category: category,
                price: Math.floor(Math.random() * 150) + 120,
                rating: (Math.random() * 1 + 4).toFixed(1),
                description: `Delicious ${meal.strMeal} prepared with authentic spices.`,
              }));

            allMeals.push(...limitedMeals);
          }
        }

        setApiMeals(allMeals);
      } catch (err) {
        setError("Failed to load meals from API");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      {/* ===================== HERO ===================== */}

      <section className="hero">
        <div>
          <p>WELCOME TO FOODIFY</p>

          <h1>
            Your Food.
            <br />
            Your Choice.
            <br />
            Your Way.
          </h1>

          <p>
            Customize your favorite food exactly the way you want.
          </p>

          <Link to="/foods">
            Explore Foods
          </Link>
        </div>
      </section>

      {/* ===================== SIGNATURE CATEGORIES ===================== */}

      <section className="section">
        <h2>Our Signature Categories</h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#666",
          }}
        >
          Explore our handpicked collection of delicious food categories.
        </p>

        <div className="category-grid">
          {foodData.categories.map((category) => (
            <div
              className="category-card"
              key={category.id}
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== POPULAR LOCAL DISHES ===================== */}

      <section
        className="section"
        style={{
          background: "#fff8f0",
        }}
      >
        <div className="section-heading">
          <div>
            <h2>Popular Local Dishes</h2>

            <p
              style={{
                color: "#666",
                marginTop: "5px",
              }}
            >
              Discover some of our most loved dishes.
            </p>
          </div>

          <Link to="/foods">
            View All
          </Link>
        </div>

        <div className="food-grid">
          {foodData.foods
            .slice(0, 8)
            .map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}
        </div>
      </section>

      {/* ===================== GLOBAL FLAVOURS ===================== */}

      <section className="section">
        <h2>Explore Global Flavours</h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#666",
          }}
        >
          Discover international dishes powered by TheMealDB API.
        </p>

        {loading && (
          <p>
            Loading delicious meals...
          </p>
        )}

        {error && (
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}

        {!loading && !error && apiMeals.length === 0 && (
          <p>
            No meals available at the moment.
          </p>
        )}

        <div className="food-grid">
          {apiMeals.map((meal) => (
            <div
              className="food-card"
              key={meal.id}
            >
              <img
                src={meal.image}
                alt={meal.name}
              />

              <div className="food-content">
                <h3>{meal.name}</h3>

                <p>
                  {meal.description}
                </p>

                <div className="food-info">
                  <span>
                    ⭐ {meal.rating}
                  </span>

                  <span>
                    ₹{meal.price}
                  </span>
                </div>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    padding: "4px 10px",
                    background: "#fff0e1",
                    color: "#e85d04",
                    borderRadius: "20px",
                    fontSize: "13px",
                  }}
                >
                  {meal.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SPECIAL OFFERS ===================== */}

      <section className="offers">
        <h2>Special Offers</h2>

        <div className="offer-grid">
          {foodData.offers.map((offer) => (
            <div
              className="offer-card"
              key={offer.id}
            >
              <h2>
                {offer.title}
              </h2>

              <p>
                {offer.description}
              </p>

              <strong>
                CODE: {offer.code}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;