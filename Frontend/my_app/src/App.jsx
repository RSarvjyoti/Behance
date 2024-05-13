import AllProduct from "./components/AllProduct";
import Login from "./components/Login";
import Register from "./components/Signup";

import { Home } from "./components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Admin from "./components/Admin";
import ProductDescriptionPage from "./components/ProductDescriptionPage";

const productId = localStorage.getItem("productId");

console.log("getItem", productId);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        ProductDescriptionPage
        <Route
          path="/prodesc"
          element={<ProductDescriptionPage productId={productId} />}
        />
      </Routes>
    </>
  );
}

export default App;
