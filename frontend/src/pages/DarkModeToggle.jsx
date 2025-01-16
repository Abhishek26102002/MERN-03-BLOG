import React, { useEffect, useState } from "react";
import "./DarkModeToggle.css"; // For additional styles, if needed

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", !isDarkMode ? "enabled" : "disabled");
  };

  // Initialize dark mode based on saved preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "enabled";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  return (
    <button
      className={`btn`}
      style={{ width: "45px", height: "45px",borderRadius:"30px" }}
      onClick={handleToggle}
    >
      <img
        width="25"
        height="25"
        src={
          isDarkMode
            ? "https://img.icons8.com/ultraviolet/40/sun--v1.png"
            : "https://img.icons8.com/glyph-neue/64/fog-night--v1.png"
        }
        alt=""
      />
    </button>
  );
};

export default DarkModeToggle;
