import React from "react";

export default function Button({ text, handleClick }) {
  const buttonStyle = {
    backgroundColor: "#ff9900", // Set a complementary color for the button
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}
