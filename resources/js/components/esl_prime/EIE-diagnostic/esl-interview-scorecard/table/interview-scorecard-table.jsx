import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import "./interview-scorecard-table.css";

const ElevatedCard = () => {
    const ratingOptions = ["1", "2", "3", "4", "5"];

    const categories = [
        { category: "Pronunciation", descriptors: ["Consistency", "Clarity", "Articulation", "Intonation & Stress"] },
        { category: "Grammar", descriptors: ["Accuracy", "Clarity of Thought", "Syntax"] },
        { category: "Fluency", descriptors: ["Quality of Response", "Detail of Response"] }
    ];

    const [ratings, setRatings] = useState({});

    // Handle rating change
    const handleRatingChange = (descriptor, value) => {
        setRatings(prev => ({
            ...prev,
            [descriptor]: value
        }));
    };

    return (
        <div className="esl-scorecard-table-container">
        <table className="esl-scorecard-table">
        <thead>
        <tr>
        <th className="vertical-header"></th>
        {/* Values displayed horizontally */}
        <th className="horizontal-values">
            PGF
        </th>
        <th>Descriptor</th>
        <th>Rating</th>
        <th>Average Rating per PGF</th>
        <th>Average Rating</th>
        <th>Previous Average Rating per PGF</th>
        <th>Previous Average Rating</th>
        </tr>
        </thead>
        <tbody>
        {categories.map((category, index) => (
            <React.Fragment key={index}>
            {/* PGF Header Row */}
            <tr>
            <td className="vertical-text" rowSpan={category.descriptors.length + 1}>
            {category.category}
            </td>
            </tr>

            {/* Rows for descriptors and ratings */}
            {category.descriptors.map((descriptor, i) => (
                <tr key={i}>
                <td>{descriptor}</td>
                <td> - </td>
                <td>
                <select
                value={ratings[descriptor] || ""}
                onChange={(e) => handleRatingChange(descriptor, e.target.value)}>
                <option value="">Select</option>
                {ratingOptions.map((rating) => (
                    <option key={rating} value={rating}>
                    {rating}
                    </option>
                ))}
                </select>
                </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                </tr>
            ))}
            </React.Fragment>
        ))}
        </tbody>
        </table>
        </div>
    );
};

export default ElevatedCard;
