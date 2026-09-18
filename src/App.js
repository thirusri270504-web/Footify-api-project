import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Foods from "./pages/Foods";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Feedback from "./pages/Feedback";
import OrderFeedback from "./pages/OrderFeedback";
import Admin from "./pages/Admin";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("foodify_currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("foodify_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("foodify_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("foodify_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("foodify_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert("Added to cart successfully! 🛒");
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    alert("Item removed from cart");
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleDateString(),
      status: "Order Confirmed",
      feedback: null,
      userEmail: currentUser?.email || "guest",
    };

    setOrders([newOrder, ...orders]);
    setLastOrder(newOrder);
    setCart([]);
    alert("Order placed successfully! 🎉");

    setTimeout(() => navigate("/order-feedback"), 400);
  };

  const hideLayout =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && (
        <Navbar
          cartCount={cart.length}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/food/:id" element={<FoodDetails addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
        <Route
          path="/orders"
          element={<Orders orders={orders} currentUser={currentUser} />}
        />
        <Route path="/feedback" element={<Feedback />} />
        <Route
          path="/order-feedback"
          element={
            <OrderFeedback
              lastOrder={lastOrder}
              setOrders={setOrders}
              orders={orders}
            />
          }
        />
        <Route path="/admin" element={<Admin currentUser={currentUser} />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;