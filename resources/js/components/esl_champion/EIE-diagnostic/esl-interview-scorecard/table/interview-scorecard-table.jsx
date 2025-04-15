import React, { useState, useEffect } from "react";
import "./interview-scorecard-table.css";

const Table = ({
    options,
    onOverallAverageChange,
    onClear,
    ratings,
    setRatings,
    dropdownValues,
    setDropdownValues,
    onCategoryAveragesChange,
    remarks,
    setRemarks
}) => {

    const categories = [
        { category: "Pronunciation", descriptors: ["Consistency", "Clarity", "Articulation", "Intonation & Stress"] },
        { category: "Grammar", descriptors: ["Accuracy", "Clarity of Thought", "Syntax"] },
        { category: "Fluency", descriptors: ["Quality of Response", "Detail of Response"] }
    ];

    const descriptorToOptionKey = {
        "Consistency": "consistency",
        "Clarity": "clarity",
        "Articulation": "articulation",
        "Intonation & Stress": "intonationStress",
        "Accuracy": "accuracy",
        "Clarity of Thought": "clarityOfThought",
        "Syntax": "syntax",
        "Quality of Response": "qualityOfResponse",
        "Detail of Response": "detailOfResponse"
    };

    const handleDescriptorChange = (descriptor, selectedDescriptor) => {
        const optionKey = descriptorToOptionKey[descriptor];
        const selectedOption = options[optionKey]?.find(option => option.descriptor === selectedDescriptor);

        setRatings(prev => ({
            ...prev,
            [descriptor]: {
                rating: selectedOption ? selectedOption.rating : "",
                descriptor: selectedDescriptor
            }
        }));
    };

    const handleRemarksChange = (label, value) => {
        setRemarks(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const calculateCategoryAverage = (category) => {
        const ratingsForCategory = category.descriptors.map(descriptor => {
            const rating = ratings[descriptor]?.rating;
            return rating ? parseFloat(rating) : 0;
        });

        const validRatings = ratingsForCategory.filter(rating => rating !== 0);
        const average = validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length;

        return isNaN(average) ? 0 : average.toFixed(2);
    };

    const calculateOverallAverage = () => {
        const allCategoryAverages = categories.map(category => calculateCategoryAverage(category));
        const validCategoryAverages = allCategoryAverages.filter(avg => avg !== "0.00");
        const overallAverage = validCategoryAverages.reduce((sum, avg) => sum + parseFloat(avg), 0) / validCategoryAverages.length;

        return isNaN(overallAverage) ? 0 : overallAverage.toFixed(2);
    };

    const collectAllInputs = () => {
        const categoryAverages = {};
        categories.forEach(category => {
            categoryAverages[category.category] = calculateCategoryAverage(category);
        });

        return {
            ratings,
            remarks,
            categoryAverages,
            overallAverage: calculateOverallAverage()
        };
    };

    // Handle clearing local states and invoking parent's onClear function
    const handleClearLocal = () => {
        // Clear all states
        setRatings({});
        setDropdownValues({
            consistency: "",
            clarity: "",
            articulation: "",
            intonationAndStress: "",
            accuracy: "",
            clarityOfThought: "",
            syntax: "",
            qualityOfResponse: "",
            detailOfResponse: "",
        });
        setRemarks({
            "PGF Specific Remarks": "",
            "School Year Highlight": "",
            "School Year Lowlight": "",
            "SPARK Highlight": "",
            "SPARK Lowlight": "",
            "Usage in School/Online (When in School)": "",
                   "Usage Offline (Home or Outside)": "",
                   "Support Needed": ""
        });

        // Call the parent's onClear function if it exists
        if (onClear) {
            onClear();
        }
    };

    useEffect(() => {
        const categoryAverages = {};
        categories.forEach(category => {
            categoryAverages[category.category] = calculateCategoryAverage(category);
        });

        const overallAverage = calculateOverallAverage();

        onCategoryAveragesChange(categoryAverages);
        if (onOverallAverageChange) {
            onOverallAverageChange(overallAverage);
        }
    }, [ratings]);

    return (
        <div className="esl-scorecard-table-container">
        <table className="esl-scorecard-table">
        <thead style={{ textAlign: 'center' }}>
        <tr>
        <th className="vertical-header"></th>
        <th className="horizontal-values">PGF</th>
        <th>Descriptor</th>
        <th>Rating</th>
        <th>Average Rating per PGF</th>
        <th>Average Rating</th>
        <th>Previous Average Rating per PGF</th>
        <th>Previous Average Rating</th>
        </tr>
        </thead>
        <tbody>
        {categories.map((category, index) => {
            const categoryAverage = calculateCategoryAverage(category);
            return (
                <React.Fragment key={index}>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td
                className="vertical-text"
                rowSpan={category.descriptors.length + 1}
                style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                {category.category}
                </td>
                </tr>
                {category.descriptors.map((descriptor, i) => {
                    const selectedDescriptor = ratings[descriptor]?.descriptor;
                    const optionKey = descriptorToOptionKey[descriptor];
                    return (
                        <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {descriptor}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <div className="esl-table-dropdown-wrapper">
                        <select
                        className="esl-table-dropdown"
                        value={selectedDescriptor || ""}
                        onChange={(e) => handleDescriptorChange(descriptor, e.target.value)}
                        >
                        <option value="">Select</option>
                        {options[optionKey]?.map((option) => (
                            <option key={option.id} value={option.descriptor}>
                            {option.descriptor}
                            </option>
                        ))}
                        </select>
                        </div>
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {ratings[descriptor]?.rating || "N/A"}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {categoryAverage}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {calculateOverallAverage()}
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}> - </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}> - </td>
                        </tr>
                    );
                })}
                </React.Fragment>
            );
        })}
        </tbody>
        <tbody>
        {Object.keys(remarks).map((label, index) => (
            <tr key={`remarks-${index}`}>
            <td colSpan={2}>{label}</td>
            <td>
            <textarea
            rows={4}
            style={{
                width: "120%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                resize: "vertical",
                whiteSpace: "nowrap",
                fontFamily: 'Poppins'
            }}
            placeholder={`Enter ${label.toLowerCase()}...`}
            aria-label={label}
            value={remarks[label]}
            onChange={(e) => handleRemarksChange(label, e.target.value)}
            />
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
};

export default Table;
