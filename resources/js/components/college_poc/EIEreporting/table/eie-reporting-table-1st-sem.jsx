import React, { useState } from 'react';
import "./TableComponent.css";

const TableComponent = () => {
    const [target, setTarget] = useState(100);

    const data = [
        {
            yearLevel: "1st Year",
            rows: [
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
            ],
        },
        {
            yearLevel: "2nd Year",
            rows: [
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
            ],
        },
        {
            yearLevel: "3rd Year",
            rows: [
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
            ],
        },
        {
            yearLevel: "4th Year",
            rows: [
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
                {
                    program: "",
                    expected: "",
                    target: `${target}%`,
                    implementingSubject: "",
                    faculty: "",
                },
            ],
        },
    ];

    return (
        <div className="eie-reporting-college-poc-container">
        <table className="eie-reporting-college-poc-table">
        {/* Top Header Row */}
        <thead>
        <tr className="eie-reporting-college-poc-header-colored">
        <th colSpan="6" className="eie-reporting-college-poc-table-header-cell">
        </th>
        <th colSpan="5" className="eie-reporting-college-poc-table-header-cell" style={{ textAlign: "center" }}>
            August
        </th>
        <th colSpan="5" className="eie-reporting-college-poc-table-header-cell" style={{ textAlign: "center" }}>
            September
        </th>
        <th colSpan="5" className="eie-reporting-college-poc-table-header-cell" style={{ textAlign: "center" }}>
            October
        </th>
        <th colSpan="5" className="eie-reporting-college-poc-table-header-cell" style={{ textAlign: "center" }}>
            November
        </th>
        <th colSpan="5" className="eie-reporting-college-poc-table-header-cell" style={{ textAlign: "center" }}>
            December
        </th>
        </tr>
        <tr className="eie-reporting-college-poc-header-plain">
        <th className="eie-reporting-college-poc-table-header-cell">Year Level</th>
        <th className="eie-reporting-college-poc-table-header-cell">Program</th>
        <th className="eie-reporting-college-poc-table-header-cell">Expected</th>
        <th className="eie-reporting-college-poc-table-header-cell">Target</th>
        <th className="eie-reporting-college-poc-table-header-cell">Implementing Subject</th>
        <th className="eie-reporting-college-poc-table-header-cell">Faculty</th>

        {/* August */}
        <th className="eie-reporting-college-poc-table-header-cell">Submitted/Participated</th>
        <th className="eie-reporting-college-poc-table-header-cell">% Rate</th>
        <th className="eie-reporting-college-poc-table-header-cell">PGF Average</th>
        <th className="eie-reporting-college-poc-table-header-cell">Highest PGF</th>
        <th className="eie-reporting-college-poc-table-header-cell">Winner’s PGF</th>

        {/* September */}
        <th className="eie-reporting-college-poc-table-header-cell">Submitted/Participated</th>
        <th className="eie-reporting-college-poc-table-header-cell">% Rate</th>
        <th className="eie-reporting-college-poc-table-header-cell">PGF Average</th>
        <th className="eie-reporting-college-poc-table-header-cell">Highest PGF</th>
        <th className="eie-reporting-college-poc-table-header-cell">Winner’s PGF</th>

        {/* October */}
        <th className="eie-reporting-college-poc-table-header-cell">Submitted/Participated</th>
        <th className="eie-reporting-college-poc-table-header-cell">% Rate</th>
        <th className="eie-reporting-college-poc-table-header-cell">PGF Average</th>
        <th className="eie-reporting-college-poc-table-header-cell">Highest PGF</th>
        <th className="eie-reporting-college-poc-table-header-cell">Winner’s PGF</th>

        {/* November */}
        <th className="eie-reporting-college-poc-table-header-cell">Submitted/Participated</th>
        <th className="eie-reporting-college-poc-table-header-cell">% Rate</th>
        <th className="eie-reporting-college-poc-table-header-cell">PGF Average</th>
        <th className="eie-reporting-college-poc-table-header-cell">Highest PGF</th>
        <th className="eie-reporting-college-poc-table-header-cell">Winner’s PGF</th>

        {/* December */}
        <th className="eie-reporting-college-poc-table-header-cell">Submitted/Participated</th>
        <th className="eie-reporting-college-poc-table-header-cell">% Rate</th>
        <th className="eie-reporting-college-poc-table-header-cell">PGF Average</th>
        <th className="eie-reporting-college-poc-table-header-cell">Highest PGF</th>
        <th className="eie-reporting-college-poc-table-header-cell">Winner’s PGF</th>
        </tr>
        </thead>

        {/* Table Body */}
        <tbody>
        {data.map((year, yearIndex) => (
            <React.Fragment key={yearIndex}>
            {/* Year Level Row */}
            <tr className="eie-reporting-college-poc-table-body-cell">
            <td className="eie-reporting-college-poc-table-body-cell">
            <div style={{ textAlign: "left" }}>
                <strong>{year.yearLevel}</strong>
            </div>
            </td>
            </tr>
            {/* Year Level Data Rows */}
            {year.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell">{row.program}</td>
                <td className="eie-reporting-college-poc-table-body-cell">{row.expected}</td>
                <td className="eie-reporting-college-poc-table-body-cell">{row.target}</td>
                <td className="eie-reporting-college-poc-table-body-cell">{row.implementingSubject}</td>
                <td className="eie-reporting-college-poc-table-body-cell">{row.faculty}</td>

                {/* August */}
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>

                {/* September */}
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>

                {/* October */}
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>

                {/* November */}
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>

                {/* December */}
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                <td className="eie-reporting-college-poc-table-body-cell"></td>
                </tr>
            ))}
            </React.Fragment>
        ))}
        </tbody>
        </table>
        </div>
    );
};

export default TableComponent;
