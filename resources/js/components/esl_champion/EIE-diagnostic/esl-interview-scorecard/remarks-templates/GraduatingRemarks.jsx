import React, { useState, useEffect } from "react";

const GraduatingRemarks = ({ onDataChange }) => {
    const initialRemarks = {
        "PGF Specific Remarks": "",
        "School Year Highlight": "",
        "School Year Lowlight": "",
        "Reason for Enrolling in UNC for College": "",
        "After Graduation Plans": "",
        "Use English in all transactions with employees of different offices or units in the University.": { rating: "", explanation: "" },
        "Use English in all Employee-Student conversations.": { rating: "", explanation: "" },
        "Use English in the opening and closing of all Student conversations with campus visitors, supported by the use of native languages such as Bikol or Filipino to facilitate clear and comfortable transactions.": { rating: "", explanation: "" },
        "Use English during classes except in Mother Tongue or Filipino courses.": { rating: "", explanation: "" },
        "Use English during conduct of University activities held outside of the classroom such as programs, games, academic and non-academic student activities, and others.": { rating: "", explanation: "" },
        "Use English during conduct of meetings, conferences, seminars, and workshops held in the University.": { rating: "", explanation: "" },
        "Use English when writing and cascading communications and other relevant information through emails, letters and memoranda.": { rating: "", explanation: "" },
        "Use English during conduct of consultation sessions between students and faculty members.": { rating: "", explanation: "" },
        "Use English during informal conversations along corridors, hallways and other places in the University.": { rating: "", explanation: "" },
        "Use English when representing UNC in external functions such as meetings, etc.": { rating: "", explanation: "" },
        "Assist student towards full communication by using the native language in guiding and coaching.": { rating: "", explanation: "" },
        "Use the native language to clarify the understanding of the student.": { rating: "", explanation: "" },
        "In 11 and 12, help student restate her/his context and articulation in English.": { rating: "", explanation: "" },
        "English Immersive Program as part of instructional or facilitating objectives.": { rating: "", explanation: "" },
        "Help students whenever there is a need for them to correct and enhance their pronunciation, grammar, and fluency in the use of the English language.": { rating: "", explanation: "" },
    };

    const [remarks2, setRemarks2] = useState(initialRemarks);

    const handleChange = (e, key) => {
        const updated = typeof remarks2[key] === "object"
        ? { ...remarks2, [key]: { ...remarks2[key], explanation: e.target.value } }
        : { ...remarks2, [key]: e.target.value };
        setRemarks2(updated);
    };

    const handleDropdownChange = (e, key) => {
        const updated = {
            ...remarks2,
            [key]: { ...remarks2[key], rating: e.target.value }
        };
        setRemarks2(updated);
    };

    // Notify parent on remarks change
    useEffect(() => {
        if (onDataChange) {
            onDataChange(remarks2);
        }
    }, [remarks2, onDataChange]);

    return (
        <div>
        <h2 className="text-xl font-bold mb-4">Graduating Student Remarks</h2>
        {Object.entries(remarks2).map(([key, value], index) => {
            const isObject = typeof value === "object";
            return (
                <div key={key} className="mb-4">
                <label className="block font-semibold">
                {`${index + 1}. ${key}`}
                </label>
                {isObject ? (
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <select
                    value={value.rating}
                    onChange={(e) => handleDropdownChange(e, key)}
                    className="p-2 border border-gray-300 rounded w-48"
                    >
                    <option value="">Rate (1–10)</option>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                        {i + 1}
                        </option>
                    ))}
                    </select>
                    <textarea
                    value={value.explanation}
                    onChange={(e) => handleChange(e, key)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    rows={2}
                    />
                    </div>
                ) : (
                    <textarea
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    rows={2}
                    />
                )}
                </div>
            );
        })}
        </div>
    );
};

export default GraduatingRemarks;
