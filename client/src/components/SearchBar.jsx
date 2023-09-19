import React, { useRef } from "react";
import Button from "./Button";

export default function SearchBar({ handleClick, setHeroes, setError }) {
  let input = useRef();

  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "maroon", // Set the background color to maroon
    padding: "10px",
    borderRadius: "5px",
  };

  const inputStyle = {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#ff9900", // Set a complementary color for the button
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
  };

  return (
    <form style={searchBarStyle}>
      <input
        type="text"
        placeholder="Search hero..."
        ref={input}
        style={inputStyle}
      />
      <Button
        text={"Search"}
        handleClick={(e) => {
          handleClick(e, input.current.value)
            .then((data) => setHeroes(data.data.results))
            .catch((err) => setError(err));
        }}
        style={buttonStyle}
      />
    </form>
  );
}
