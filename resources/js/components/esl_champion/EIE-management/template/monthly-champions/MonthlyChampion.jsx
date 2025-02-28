import React from "react";
import { useTable } from "react-table";
import "./MonthlyChampion.css";
import Template from "@assets/eie-monthly-champ.png";

const MonthlyChampion = () => {
    return (
        <div className="monthly-champion-container">
        {/* Card with specific width, height, and black border */}
        <div className="monthly-champion-card">
        {/* Using the Template image inside the card */}
        <img
        src={Template}  // Using the imported Template image
        alt="Monthly Champion"
        className="monthly-champion-image"
        />
        </div>
        </div>
    );
};

export default MonthlyChampion;
