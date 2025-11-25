import React from "react";
import TestRedux from "./Test.jsx";
import "./styles/App.css";
import AppRouter from "./AppRouter.jsx";

function App() {
  return (
    <div className="page-container">
      <AppRouter />
      {/* <TestRedux /> */}
    </div>
  );
}

export default App;
