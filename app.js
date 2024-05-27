import React, { useState, useEffect } from "react";
import "./App.css";
import "@theme-toggles/react/css/Lightbulb.css";
import { Lightbulb } from "@theme-toggles/react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      isDarkMode ? "#333" : "#f7f7f7"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#fff" : "#000"
    );
    document.documentElement.style.setProperty(
      "--button-bg-color",
      isDarkMode ? "#555" : "#ddd"
    );
    document.documentElement.style.setProperty(
      "--button-hover-bg-color",
      isDarkMode ? "#444" : "#ccc"
    );
  }, [isDarkMode]);

  return (
    <div className="App">
      <header className="App-header">
        <Lightbulb
          duration={750}
          toggled={isDarkMode}
          toggle={() => setIsDarkMode(!isDarkMode)}
        />
        <canvas id="gameCanvas" width="800" height="400"></canvas>
      </header>
    </div>
  );
}

export default App;
