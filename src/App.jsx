import { useState } from "react";
import "./App.css";
import "./components/HomeComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <>
      <div className="" >
        <h1 className="text-3xl pl-8 font-bold font-mono">Expense Tracker</h1>
        <HomeComponent />
      </div>
    </>
  );
}

export default App;
