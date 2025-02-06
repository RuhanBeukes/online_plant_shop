import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.css";

// Sample plant data
const plants = [
  { id: 1, name: "Aloe Vera", category: "Medicinal", price: 10, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQGwavcWJHawDcjP_w6f5JYZ8vzZo2q0kgqRFWPkILUvvLQ-r3M3ZPtaVYQu5UnQrv37EsYnVTE8cTShILvj5qX9Q" },
  { id: 2, name: "Lavender", category: "Aromatic", price: 15, img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTbMKdFqOHvsbS75_2cuDLFvzauMbSdp1mHjSiaB_VUskl9LU8DCW8KLG9Fs5o_ifZTnBW7Xi6u0FzBrOGnDFuJsuMyi90Wf52j8KSfCdQ" },
  { id: 3, name: "Basil", category: "Medicinal", price: 8, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3y47pGz04dcVlaYPsO8ARIHqg6nLKRBoqiV0Uf9wGySa-3-2D6dHATDjePcwp9nFwOJEI2UZb6zIoOeLy61pXDWEOgbtbwkiEtuVwCI" },
  { id: 4, name: "Rosemary", category: "Aromatic", price: 12, img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ25PM25ADmTrcEGhFZDf1QFqHdSW-canGhB2ffbjQCVTffNYz_xM6Brxwiy2gonAV42cdmnvRGX0DvCrmbSIcu_w" },
  { id: 5, name: "Snake Plant", category: "Air Purifying", price: 18, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6mZmrTGOb8VJeBRCRuRksVF2R4y8oz5RRREh0VV9rdXkwv_hZBPTtHjbXNjz59qxgWaheTewuXNVSUJ4TpkfsRQ" },
  { id: 6, name: "Fern", category: "Air Purifying", price: 14, img: "https://cdn.britannica.com/21/6821-050-AE82E5BF/Bracken.jpg" }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...plant, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <header className="navbar">
        <Link to="/">Paradise Nursery</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/cart">
            <FaShoppingCart /> ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

function Landing() {
  return (
    <div className="landing">
      <h1>Paradise Nursery 🌿</h1>
      <p>Your one-stop shop for beautiful houseplants!</p>
      <Link to="/products" className="btn">Get Started</Link>
    </div>
  );
}

function ProductList({ addToCart }) {
  return (
    <div className="products">
      <h2>Our Plants</h2>
      <div className="product-grid">
        {plants.map((plant) => (
          <div key={plant.id} className="product-card">
            <img src={plant.img} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>${plant.price}</p>
            <button onClick={() => addToCart(plant)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price} x {item.quantity} = ${item.price * item.quantity}</p>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button className="btn">Checkout</button>
        </div>
      )}
    </div>
  );
}

export default App;
