import React from "react";
import "./styles/App.css";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="page-container">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
