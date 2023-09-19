import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id, thumbnail }) {
  const cardStyle = {
    textDecoration: "none", // Remove underline from Link
    color: "black", // Set text color to black
  };

  const containerStyle = {
    backgroundColor: "#fff", // Set background color for the card container
    border: "1px solid #ddd", // Add a border to the card container
    borderRadius: "5px", // Add some rounded corners
    padding: "10px", // Add some padding
    textAlign: "center", // Center-align the content
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    transition: "transform 0.2s", // Add a smooth hover effect
    ":hover": {
      transform: "scale(1.05)", // Scale up the card on hover
    },
  };

  const imageStyle = {
    maxWidth: "100%", // Ensure the image fits within the container
    maxHeight: "200px", // Limit the image height
    marginBottom: "10px", // Add some space below the image
  };

  const nameStyle = {
    fontSize: "1.2rem", // Increase the font size
  };

  return (
    <Link to={`/${id}`} style={cardStyle} target="_blank">
      <div className="card" style={containerStyle}>
        <img src={thumbnail} alt="thumbnail" style={imageStyle} />
        <h1 className="card-name" style={nameStyle}>
          {name}
        </h1>
      </div>
    </Link>
  );
}
