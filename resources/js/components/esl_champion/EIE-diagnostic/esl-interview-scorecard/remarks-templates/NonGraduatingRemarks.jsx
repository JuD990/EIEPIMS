import React, { useState, useEffect } from "react";

const NonGraduatingRemarks = ({ onDataChange }) => {
    const [remarks, setRemarks] = useState({
        "PGF Specific Remarks": "",
        "School Year Highlight": "",
        "School Year Lowlight": "",
        "SPARK Highlight": "",
        "SPARK Lowlight": "",
        "Usage in School/Online (When in School)": "",
        "Usage Offline (Home or Outside)": "",
        "Support Needed": ""
    });

    const handleChange = (e, key) => {
        const updated = { ...remarks, [key]: e.target.value };
        setRemarks(updated);
    };

    // Inform parent whenever remarks change
    useEffect(() => {
        if (onDataChange) {
            onDataChange(remarks);
        }
    }, [remarks, onDataChange]);

    return (
        <div>
        <h2 className="text-xl font-bold mb-4">Non-Graduating Student Remarks</h2>
        {Object.entries(remarks).map(([key, value], index) => (
            <div key={key} className="mb-4">
            <label className="block font-semibold">{`${index + 1}. ${key}`}</label>
            <textarea
            value={value}
            onChange={(e) => handleChange(e, key)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={2}
            />
            </div>
        ))}
        </div>
    );
};

export default NonGraduatingRemarks;
