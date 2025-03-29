import React from "react";
import "./EslTableComponent.css";

const TableComponent = () => {
    const months = ["January", "February", "March", "April", "May"];

    return (
        <div className="dashboard-college-poc-container">
        <table className="dashboard-college-poc-table">
        <thead>
        <tr>
        <th rowSpan="2">Year Level</th>
        <th rowSpan="2">Course</th>
        <th rowSpan="2">Expected Submissions</th>
        <th rowSpan="2">Target</th>
        <th rowSpan="2">Implementing Subjects</th>
        {months.map((month) => (
            <th key={month} colSpan="4" style={{ textAlign: "center" }}>{month}</th>
        ))}
        </tr>
        <tr className="dashboard-college-poc-header-colored">
        {months.map(() => (
            <React.Fragment key={Math.random()}>
            <th>Submitted</th>
            <th>Completion Rate</th>
            <th>PGF Average</th>
            <th>SPARK Champion</th>
            </React.Fragment>
        ))}
        </tr>
        </thead>
        <tbody>
        {/* Area for computing year total and grand total */}
        </tbody>
        </table>
        </div>
    );
};

export default TableComponent;
