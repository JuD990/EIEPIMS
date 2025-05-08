import React, { useState, useEffect } from 'react';
import GraduatingRemarks from './GraduatingRemarks';
import NonGraduatingRemarks from './NonGraduatingRemarks';

const RemarksDropdown = ({ setRemarks, yearLevel }) => {
    // Set default selectedOption based on yearLevel
    const [selectedOption, setSelectedOption] = useState(
        yearLevel === '4th Year' ? 'graduating' : 'nonGraduating'
    );

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setRemarks({});
    };

    const handleGraduatingDataChange = (data) => {
        setRemarks(data);
    };

    const handleNonGraduatingDataChange = (data) => {
        setRemarks(data);
    };

    useEffect(() => {
        // Update selectedOption if yearLevel changes
        setSelectedOption(yearLevel === '4th Year' ? 'graduating' : 'nonGraduating');
    }, [yearLevel]); // Re-run when yearLevel changes

    return (
        <div style={{ textAlign: 'left', marginTop: '-40px' }}>
        <select onChange={handleChange} value={selectedOption} style={{ width: '200px', backgroundColor: "#FBF7F7" }}>
        <option value="graduating">Graduating</option>
        <option value="nonGraduating">Non-Graduating</option>
        </select>

        {selectedOption === 'graduating' && (
            <GraduatingRemarks onDataChange={handleGraduatingDataChange} />
        )}
        {selectedOption === 'nonGraduating' && (
            <NonGraduatingRemarks onDataChange={handleNonGraduatingDataChange} />
        )}
        </div>
    );
};

export default RemarksDropdown;
